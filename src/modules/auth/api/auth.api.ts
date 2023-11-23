import { getEnv } from '@shared';
import axios from 'axios';

interface AuthApi {
  exchangeCodeForToken(code: string): Promise<CognitoTokenResponseBody>;
}

interface CognitoTokenResponseBody {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export const authApi: AuthApi = (() => {
  const api = buildAuthApi();
  return api;
})();

export function buildAuthApi(): AuthApi {
  const axiosInstance = axios.create();
  const { COGNITO_CLIENT_ID, COGNITO_DOMAIN, COGNITO_REDIRECT_URI } = getEnv();

  async function exchangeCodeForToken(code: string): Promise<CognitoTokenResponseBody> {
    const tokenEndpoint = new URL('oauth2/token', COGNITO_DOMAIN);
    const requestBody = {
      grant_type: 'authorization_code',
      client_id: COGNITO_CLIENT_ID,
      code,
      redirect_uri: COGNITO_REDIRECT_URI
    };
    const axiosResponse = await axiosInstance.post(
      tokenEndpoint.toString(),
      requestBody,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return axiosResponse.data;
  }

  return {
    exchangeCodeForToken
  };
}
