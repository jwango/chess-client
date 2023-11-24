import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserInfo, useAuthApi } from "./api/auth.api";
import { useAuth } from "./lib/auth.provider";
import { buildCognitoLoginUrl } from "./lib/util";

export const LoginPage = () => {
  const [ searchParams ] = useSearchParams();
  const { exchangeCodeForToken, getUserInfo } = useAuthApi();
  const { tokenData, setAuthState} = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo>(null);

  // Load shared state
  const loginUrl = buildCognitoLoginUrl();
  const code = searchParams.get("code");

  function startLogin() {
    window.location.replace(loginUrl);
  }

  useEffect(() => {
    if (!getHasCode(code)) {
      startLogin();
    } else {
      exchangeCodeForToken(code)
        .then((tokenPayload) => {
          setAuthState(prev => { 
            return {...prev, isLoggedIn: true, tokenData: tokenPayload }
          });
        })
        .catch(() => startLogin());
    }
  }, [code]);

  useEffect(() => {
    if (getHasCode(code) && tokenData && !userInfo) {
      getUserInfo()
        .then(setUserInfo);
    }
  }, [userInfo, tokenData, code]);

  // State just for rendering
  const hasCode = getHasCode(code);

  // Render
  return <div className="gutters">
    {!hasCode  && <p>Redirecting you to {loginUrl.toString()}...</p>}
    {(hasCode && !tokenData) && <p>Exchanging your code {code} for a token...</p>}
    {tokenData && <pre className="whitespace-normal break-words">{tokenData.id_token}</pre>}
    {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
  </div>;
};

function getHasCode(code: string): boolean {
  return code && code !== "";
}
