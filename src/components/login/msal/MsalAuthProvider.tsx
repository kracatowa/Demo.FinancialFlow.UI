import React, { useEffect, useState } from "react";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { msalInstance, loginRequest } from "./MsalAuthConfig";
import { type AuthAdapter, AuthProvider } from "../AuthContext";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { instance, accounts } = useMsal();

  const adapter: AuthAdapter = {
    getAccessToken: async (scopes = loginRequest.scopes) => {
      if (!accounts || accounts.length === 0) throw new Error("no account");
      try {
        const resp = await instance.acquireTokenSilent({ account: accounts[0], scopes });
        return resp.accessToken;
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          await instance.acquireTokenRedirect({ scopes, account: accounts[0] });
          throw new Error("interactive required");
        }
        throw err;
      }
    },
    login: async () => instance.loginRedirect(loginRequest),
    logout: async () => instance.logoutRedirect(),
    isAuthenticated: () => !!(accounts && accounts.length > 0),
    getAccount: () => {
      return (accounts && accounts.length > 0)
      ? {
          id: accounts[0].homeAccountId,
          name: accounts[0].name ?? "",
          email: accounts[0].username ?? ""
        }
    : null;
    }
  };

  return <AuthProvider value={adapter}>{children}</AuthProvider>;
}

export default function MsalAuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function init() {
      if (msalInstance.initialize) {
        await msalInstance.initialize();
      }
      if (mounted) setReady(true);
    }
    init();
    return () => { mounted = false; };
  }, []);

  if (!ready) return null;

  return (
    <MsalProvider instance={msalInstance}>
      <InnerProvider>{children}</InnerProvider>
    </MsalProvider>
  );
}