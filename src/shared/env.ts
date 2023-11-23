interface EnvConfig {
  COGNITO_CLIENT_ID: string;
  COGNITO_DOMAIN: string;
  COGNITO_REDIRECT_URI: string;
}

export function getEnv(): EnvConfig {
  return {
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
    COGNITO_REDIRECT_URI: process.env.COGNITO_REDIRECT_URI
  };
}
