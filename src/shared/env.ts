interface EnvConfig {
  COGNITO_CLIENT_ID: string;
  COGNITO_DOMAIN: string;
  COGNITO_REDIRECT_URI: string;
}

export function getEnv(): EnvConfig {
  return {
    COGNITO_CLIENT_ID: "3rsrgovgffhrtrcvstlc83pk5s",
    COGNITO_DOMAIN: "https://auth.chess.jwango.com",
    // COGNITO_REDIRECT_URI: "http://localhost:3000/login"
    COGNITO_REDIRECT_URI: "https://chess.jwango.com"
  };
}
