import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./AuthConfig";
import type { JSX } from "react";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { instance, accounts, inProgress } = useMsal();

  useEffect(() => {
    if (inProgress === "none" && accounts.length === 0) {
      instance.loginRedirect(loginRequest);
    }
  }, [accounts, instance, inProgress]);

  if (accounts.length === 0) {
    return <div>Redirecting to login...</div>;
  }

  return children;
}