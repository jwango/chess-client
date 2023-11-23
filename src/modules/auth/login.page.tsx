import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { buildLoginUrl } from "@shared/lib";
import { getEnv } from "@shared";
import { authApi } from "./api/auth.api";

export const LoginPage = () => {
  const [ searchParams ] = useSearchParams();
  const [ token, setToken ] = useState<string>(null);

  // Load shared state
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  const loginUrl = buildLoginUrl({
    clientId: COGNITO_CLIENT_ID,
    domain: COGNITO_DOMAIN,
    redirectUri: COGNITO_REDIRECT_URI
  });
  const code = searchParams.get("code");

  function startLogin() {
    window.location.replace(loginUrl);
  }

  useEffect(() => {
    if (!getHasCode(code)) {
      startLogin();
    } else {
      authApi.exchangeCodeForToken(code)
        .then(({ id_token }) => {
          setToken(id_token);
        })
        .catch(() => startLogin());
    }
  }, [code]);

  // State just for rendering
  const hasCode = getHasCode(code);

  // Render
  return <div className="gutters">
    {!hasCode  && <p>Redirecting you to {loginUrl.toString()}...</p>}
    {(hasCode && !token) && <p>Exchanging your code {code} for a token...</p>}
    {token && <pre className="whitespace-normal break-words">{token}</pre>}
  </div>;
};

function getHasCode(code: string): boolean {
  return code && code !== "";
}
