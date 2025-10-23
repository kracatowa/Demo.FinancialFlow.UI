import { createContext, useContext } from "react";

export type AuthAdapter = {
  getAccessToken: (scopes?: string[]) => Promise<string>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  getAccount?: () => any | null;
};

const NoopAdapter: AuthAdapter = {
  getAccessToken: async () => "",
  login: async () => {},
  logout: async () => {},
  isAuthenticated: () => false,
  getAccount: () => null
};

const AuthContext = createContext<AuthAdapter>(NoopAdapter);

export const AuthProvider = AuthContext.Provider;

export function useAuth() {
  return useContext(AuthContext);
}