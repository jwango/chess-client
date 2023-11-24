import { useEffect } from "react";
import { useAuth } from "./lib/useAuth.hook";

export const LogoutPage = () => {
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <div className="gutters">
    {isLoggedIn && <p>Logging you out...</p>}
    {!isLoggedIn && <>
      <p>You are logged out.</p>
      <a href="/login">Click me to login</a>
    </>}
  </div>
};

export default LogoutPage;