import { getEnv } from "@shared";

interface LoginOptions {
  clientId: string;
  domain: string;
  redirectUri: string;
}

export function buildCognitoLoginUrl(): URL {
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  return buildLoginUrl({
    clientId: COGNITO_CLIENT_ID,
    domain: COGNITO_DOMAIN,
    redirectUri: COGNITO_REDIRECT_URI
  });
}

export function buildLoginUrl(options: LoginOptions): URL {
  var loginUrl = new URL("login", options.domain);
  loginUrl.searchParams.append("client_id", options.clientId);
  loginUrl.searchParams.append("response_type", "code");
  loginUrl.searchParams.append("redirect_uri", options.redirectUri);
  return loginUrl;
}
