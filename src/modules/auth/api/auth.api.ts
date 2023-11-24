import { getEnv } from '@shared';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../lib/auth.provider';
import { getCodeVerifier } from '../lib/util';

interface AuthApi {
  exchangeCodeForToken(code: string, state: string): Promise<CognitoTokenResponseBody>;
  getUserInfo(): Promise<UserInfo>;
  revokeToken(): Promise<void>;
}

export interface UserInfo {
  sub: string;
  identities: UserIdentity[];
  name: string;
  picture: string;
}

export interface UserIdentity {
  userId: string;
  providerName: string;
  providerType: string;
  issuer: string;
  primary: boolean;
  dateCreated: number;
}

export interface CognitoTokenResponseBody {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export function useAuthApi(): AuthApi {
  const axiosInstance = axios.create();
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();
  const { isLoggedIn, tokenData } = useContext(AuthContext);

  async function exchangeCodeForToken(code: string, state: string): Promise<CognitoTokenResponseBody> {
    const codeVerifier = getCodeVerifier(state);
    if (!codeVerifier) {
      throw new TypeError("Invalid state");
    }
    console.log("got code verifier", codeVerifier);
    const tokenEndpoint = new URL('oauth2/token', COGNITO_DOMAIN);
    const requestBody = {
      grant_type: 'authorization_code',
      client_id: COGNITO_CLIENT_ID,
      code,
      redirect_uri: COGNITO_REDIRECT_URI,
      code_verifier: codeVerifier
    };
    const axiosResponse = await axiosInstance.post(
      tokenEndpoint.toString(),
      requestBody,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return axiosResponse.data;
  }

  async function getUserInfo(): Promise<UserInfo> {
    if (!isLoggedIn || !tokenData) {
      return null;
    }
    const userInfoEndpoint = new URL('oauth2/userInfo', COGNITO_DOMAIN);
    const axiosResponse = await axiosInstance.get(
      userInfoEndpoint.toString(),
      { headers: { 'Authorization': `Bearer ${tokenData.access_token}` }}
    );
    return parseUserInfo(axiosResponse.data);
  }

  async function revokeToken(): Promise<void> {
    if (!tokenData) {
      return;
    }
    const revokeEndpoint = new URL('oauth2/revoke', COGNITO_DOMAIN);
    const requestBody = {
      client_id: COGNITO_CLIENT_ID,
      token: tokenData.refresh_token
    };
    await axiosInstance.post(
      revokeEndpoint.toString(),
      requestBody,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return;
  }

  return {
    exchangeCodeForToken,
    getUserInfo,
    revokeToken
  };
}

function parseUserInfo(payload: any): UserInfo {
  if (payload == null || typeof payload !== 'object') {
    throw new TypeError('Unexpected user info payload format');
  }
  return {
    sub: payload.sub,
    identities: parseUserIdentities(payload.identities),
    name: payload.name,
    picture:payload.picture
  };
}

function parseUserIdentities(payload: any): UserIdentity[] {
  if (payload == null || typeof payload !== 'string') {
    throw new TypeError('Unexpected user identities payload format');
  }
  const identitiesJson = JSON.parse(payload);
  if (identitiesJson == null || !Array.isArray(identitiesJson)) {
    throw new TypeError('Unexpected user identities payload format');
  }
  return identitiesJson.map(parseUserIdentity);
}

function parseUserIdentity(payload: any): UserIdentity {
  if (payload == null || typeof payload != 'object') {
    throw new TypeError('Unexpected user identity payload format');
  }
  return {
    userId: payload.userId,
    providerName: payload.providerName,
    providerType: payload.providerType,
    issuer: payload.issuer,
    primary: payload.primary,
    dateCreated: payload.number
  };
}