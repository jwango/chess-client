import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserInfo, useAuthApi } from "./api/auth.api";
import { useAuth } from "./lib/useAuth.hook";

export const LoginPage = () => {
  const [ searchParams ] = useSearchParams();
  const { exchangeCodeForToken, getUserInfo } = useAuthApi();
  const { tokenData, loginSilently, setAuthState, setIdentities } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const [errorMessage, setErrorMessage] = useState<string>();

  // Load shared state
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // Either grab a code or exchange the code for a token
  useEffect(() => {
    if (!getHasCode(code)) {
      loginSilently();
    } else {
      exchangeCodeForToken(code, state)
        .then((tokenPayload) => {
          setAuthState(prev => { 
            return {...prev, isLoggedIn: true, tokenData: tokenPayload }
          });
        })
        .catch(() => setErrorMessage("Error logging in. Please ask your admin for help."));
    }
  }, [code, state]);

  // Once we have a valid token and are logged in, then grab the user info
  useEffect(() => {
    if (getHasCode(code) && tokenData && !userInfo) {
      getUserInfo()
        .then(res => {
          setUserInfo(res);
          setIdentities(res.identities);
        });
    }
  }, [userInfo, tokenData, code]);

  // State just for rendering
  const hasCode = getHasCode(code);

  // Render
  return <div className="gutters">
    {errorMessage && <p>{errorMessage}</p>}
    {!hasCode  && <p>Redirecting you to SSO login...</p>}
    {(hasCode && !tokenData) && <p>Exchanging your code {code} for a token...</p>}
    {tokenData && <pre className="whitespace-normal break-words">{tokenData.id_token}</pre>}
    {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
  </div>;
};

function getHasCode(code: string): boolean {
  return code && code !== "";
}
