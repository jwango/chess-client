import { useEffect } from "react";
import { useAuth } from "./lib/useAuth.hook";
import { Page } from "@shared";

export const LogoutPage = () => {
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Page>
    {isLoggedIn && <p>Logging you out...</p>}
    {!isLoggedIn && <>
      <p>You are logged out.</p>
      <a href="/login">Click me to login</a>
    </>}
  </Page>
};

export default LogoutPage;