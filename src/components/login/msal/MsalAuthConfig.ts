import type { Configuration } from "@azure/msal-browser";
import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

declare global {
  interface Window { __msalInstance?: PublicClientApplication }
}

const tenantId = import.meta.env.VITE_TENANT_ID ?? "common";
const clientId = import.meta.env.VITE_CLIENT_ID ?? "";
const redirectUri = import.meta.env.VITE_REDIRECT_URI ?? window.location.origin;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii?: boolean) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error(message);
        else if (level === LogLevel.Warning) console.warn(message);
        else if (level === LogLevel.Info) console.info(message);
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

// Always reuse the instance if it exists (prevents duplicate warning)
export const msalInstance =
  window.__msalInstance ?? new PublicClientApplication(msalConfig);

if (!window.__msalInstance) window.__msalInstance = msalInstance;