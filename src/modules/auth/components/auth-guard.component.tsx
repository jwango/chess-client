import { PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "../lib/useAuth.hook";

export const AuthGuard = ({ children }: PropsWithChildren<{}>) => {
  const { isLoggedIn, login } = useAuth();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit(true);
    } else if (!isLoggedIn) {
      login();
    }
  }, [init, isLoggedIn, login]);

  return <>
    {isLoggedIn && children}
    {!isLoggedIn && <div>Redirecting to login...</div>}
  </>
};

export default AuthGuard;