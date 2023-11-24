import { useContext } from "react";
import { AuthContext } from "./auth.provider";
import { CognitoTokenResponseBody, UserIdentity } from "../api/auth.api";
import { buildCognitoAuthorizeUrl, buildCognitoLoginUrl } from "./util";

const IDENTITY_LIST_STORAGE_KEY = "cognito.userInfo.identities";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  function getIdentities(): UserIdentity[] {
    return JSON.parse(localStorage.getItem(IDENTITY_LIST_STORAGE_KEY));
  }

  function setIdentities(identities: UserIdentity[]): void {
    localStorage.setItem(IDENTITY_LIST_STORAGE_KEY, JSON.stringify(identities));
  }

  function loginSilently(): Promise<CognitoTokenResponseBody> {
    // If no known identities in local storage, we redirect to the hosted UI for login
    var idps = getIdentities();
    if (!idps || idps.length === 0) {
      const loginUrl = buildCognitoLoginUrl();
      window.location.replace(loginUrl);
      return;
    }

    // Else take the the first of known identites and use that as the idp for authorize url
    const authorizeUrl = buildCognitoAuthorizeUrl(idps[0].providerType);
    window.location.replace(authorizeUrl);
  }
  
  return {
    ...authContext,
    getIdentities,
    setIdentities,
    loginSilently
  };
}
