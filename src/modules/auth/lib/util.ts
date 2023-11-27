import { getEnv } from "@shared";

interface LoginOptions {
  clientId: string;
  domain: string;
  redirectUri: string;
  state?: string;
  codeChallenge?: string;
}

interface AuthorizeOptions {
  idp: IdentityProvider;
  state?: string;
  codeChallenge?: string;
}

type IdentityProvider = 'Facebook' | 'Google' | 'LoginWithAmazon' | 'SignInWithApple' | 'COGNITO' | string;

export function buildCognitoLoginUrl(state: string, codeChallenge: string): URL {
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  return buildLoginUrl({
    clientId: COGNITO_CLIENT_ID,
    domain: COGNITO_DOMAIN,
    redirectUri: COGNITO_REDIRECT_URI,
    state,
    codeChallenge
  });
}

export function buildCognitoAuthorizeUrl(options: AuthorizeOptions): URL {
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  var authorizeUrl = new URL("oauth2/authorize", COGNITO_DOMAIN);
  authorizeUrl.searchParams.append("client_id", COGNITO_CLIENT_ID);
  authorizeUrl.searchParams.append("response_type", "code");
  authorizeUrl.searchParams.append("redirect_uri", COGNITO_REDIRECT_URI);
  authorizeUrl.searchParams.append("identity_provider", options.idp);
  if (options.state) {
    authorizeUrl.searchParams.append("state", options.state);
  }
  if (options.codeChallenge) {
    authorizeUrl.searchParams.append("code_challenge", options.codeChallenge);
    authorizeUrl.searchParams.append("code_challenge_method", "S256");
  }
  return authorizeUrl;
}

export function buildLoginUrl(options: LoginOptions): URL {
  var loginUrl = new URL("login", options.domain);
  loginUrl.searchParams.append("client_id", options.clientId);
  loginUrl.searchParams.append("response_type", "code");
  loginUrl.searchParams.append("redirect_uri", options.redirectUri);
  if (options.state) {
    loginUrl.searchParams.append("state", options.state);
  }
  if (options.codeChallenge) {
    loginUrl.searchParams.append("code_challenge", options.codeChallenge);
    loginUrl.searchParams.append("code_challenge_method", "S256");
  }
  return loginUrl;
}

export async function sha256 (str: string): Promise<ArrayBuffer> {
	return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
};

export async function generateNonce(): Promise<string>{
	const hash = await sha256(crypto.getRandomValues(new Uint32Array(4)).toString());
	// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
	const hashArray = Array.from(new Uint8Array(hash));
	return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

export function base64URLEncode(str: ArrayBuffer): string {
	return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "")
};


export function getCodeVerifier(state: string): string {
  const codeVerifier = sessionStorage.getItem(`codeVerifier-${state}`);
  sessionStorage.removeItem(`codeVerifier-${state}`);
  return codeVerifier;
}

export function setCodeVerifier(state: string, codeVerifier: string): void {
  sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
}

const RETURN_TO_DELIMITER = ";returnTo=";

export async function buildState(returnTo: string): Promise<string> {
  const randomState = await generateNonce();
  const returnQueryParam = `${RETURN_TO_DELIMITER}${returnTo || '/'}`;
  return `${randomState}${returnQueryParam}`;
}

export function getReturnToFromState(state: string): string {
  const parts = state.split(RETURN_TO_DELIMITER);
  return parts[1];
}
