import { getEnv } from "@shared";

interface LoginOptions {
  clientId: string;
  domain: string;
  redirectUri: string;
}

type IdentityProvider = 'Facebook' | 'Google' | 'LoginWithAmazon' | 'SignInWithApple' | 'COGNITO' | string;

export function buildCognitoLoginUrl(): URL {
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  return buildLoginUrl({
    clientId: COGNITO_CLIENT_ID,
    domain: COGNITO_DOMAIN,
    redirectUri: COGNITO_REDIRECT_URI
  });
}

export function buildCognitoAuthorizeUrl(idp: IdentityProvider): URL {
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  var authorizeUrl = new URL("oauth2/authorize", COGNITO_DOMAIN);
  authorizeUrl.searchParams.append("client_id", COGNITO_CLIENT_ID);
  authorizeUrl.searchParams.append("response_type", "code");
  authorizeUrl.searchParams.append("redirect_uri", COGNITO_REDIRECT_URI);
  authorizeUrl.searchParams.append("identity_provider", idp);
  return authorizeUrl;
}

export function buildLoginUrl(options: LoginOptions): URL {
  var loginUrl = new URL("login", options.domain);
  loginUrl.searchParams.append("client_id", options.clientId);
  loginUrl.searchParams.append("response_type", "code");
  loginUrl.searchParams.append("redirect_uri", options.redirectUri);
  return loginUrl;
}
