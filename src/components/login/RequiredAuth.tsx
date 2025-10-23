import { useEffect } from "react";
import type { JSX } from "react";
import { useAuth } from "./AuthContext";
import RedirectionPage from "../../pages/RedirectionPage";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      auth.login();
    }
  }, [auth]);

  if (!auth.isAuthenticated()) {
    return <RedirectionPage />;
  }

  return children;
}