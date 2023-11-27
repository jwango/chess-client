import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthApi } from "./lib/auth.api";
import { useAuth } from "./lib/useAuth.hook";
import { getReturnToFromState } from "./lib/util";

export const LoginPage = () => {
  const [ searchParams ] = useSearchParams();
  const { exchangeCodeForToken, getUserInfo } = useAuthApi();
  const { tokenData, userInfo, loginSilently, setAuthState, setIdentities } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [ returnTo, setReturnTo ] = useState<string>("/");
  const navigate = useNavigate();

  // Load shared state
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // Either grab a code or exchange the code for a token
  useEffect(() => {
    if (!getHasCode(code)) {
      loginSilently({ returnTo: "/" });
    } else {
      exchangeCodeForToken(code, state)
        .then((tokenPayload) => {
          setAuthState(prev => { 
            return {...prev, isLoggedIn: true, tokenData: tokenPayload }
          });
          setReturnTo(getReturnToFromState(state));
        })
        .catch(() => setErrorMessage("Error logging in. Please ask your admin for help."));
    }
  }, [code, state]);

  // Once we have a valid token and are logged in, then grab the user info
  useEffect(() => {
    if (getHasCode(code) && tokenData && !userInfo) {
      getUserInfo()
        .then(res => {
          setIdentities(res.identities);
          setAuthState(prev => ({ ...prev, userInfo: res }));
          navigate(returnTo || "/");
        });
    }
  }, [userInfo, tokenData, code, returnTo]);

  // State just for rendering
  const hasCode = getHasCode(code);

  // Render
  return <div className="gutters">
    {errorMessage && <p>{errorMessage}</p>}
    {!hasCode  && <p>Redirecting you to SSO login...</p>}
    {(hasCode && !tokenData) && <p>Exchanging your code {code} for a token...</p>}
    {userInfo && <p>Welcome {userInfo.name}!</p>}
  </div>;
};

function getHasCode(code: string): boolean {
  return code && code !== "";
}
