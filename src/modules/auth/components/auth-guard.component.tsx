import { PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "../lib/useAuth.hook";
import { useLocation } from "react-router";
import { Page } from "@shared";

export const AuthGuard = ({ children }: PropsWithChildren<{}>) => {
  const { isLoggedIn, loginSilently } = useAuth();
  const [init, setInit] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!init) {
      setInit(true);
    } else if (!isLoggedIn) {
      loginSilently({ returnTo: pathname });
    }
  }, [init, isLoggedIn, loginSilently]);

  return <>
    {isLoggedIn && children}
    {!isLoggedIn && <Page>Redirecting to login...</Page>}
  </>
};

export default AuthGuard;