import { useContext } from "react";
import { AuthContext } from "./auth.provider";
import { CognitoTokenResponseBody, UserIdentity, useAuthApi } from "./auth.api";
import { base64URLEncode, buildCognitoAuthorizeUrl, buildCognitoLoginUrl, buildState, generateNonce, setCodeVerifier, sha256 } from "./util";

const IDENTITY_LIST_STORAGE_KEY = "cognito.userInfo.identities";

export interface AuthLoginOptions {
  returnTo?: string;
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const authApi = useAuthApi();

  function getIdentities(): UserIdentity[] {
    return JSON.parse(localStorage.getItem(IDENTITY_LIST_STORAGE_KEY));
  }

  function setIdentities(identities: UserIdentity[]): void {
    localStorage.setItem(IDENTITY_LIST_STORAGE_KEY, JSON.stringify(identities));
  }

  async function loginSilently(options: AuthLoginOptions): Promise<CognitoTokenResponseBody> {
    const state = await buildState(options?.returnTo);
	  const codeVerifier = await generateNonce();
	  setCodeVerifier(state, codeVerifier);
	  const codeChallenge = base64URLEncode(await sha256(codeVerifier));

    // If no known identities in local storage, we redirect to the hosted UI for login
    var idps = getIdentities();
    if (!idps || idps.length === 0) {
      const loginUrl = buildCognitoLoginUrl(state, codeChallenge);
      window.location.replace(loginUrl);
      return;
    }

    // Else take the the first of known identites and use that as the idp for authorize url
    const authorizeUrl = buildCognitoAuthorizeUrl({
      idp: idps[0].providerType,
      state: state,
      codeChallenge: codeChallenge
    });
    window.location.replace(authorizeUrl);
  }

  function logout(): Promise<void> {
    setIdentities(null);
    return authApi.revokeToken()
      .then(() => {
        authContext.setAuthState(prev => ({
          ...prev,
          isLoggedIn: false,
          tokenData: null
        }));
      });
  }
  
  return {
    ...authContext,
    getIdentities,
    setIdentities,
    loginSilently,
    logout
  };
}
