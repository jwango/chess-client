import { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useState } from 'react';
import { CognitoTokenResponseBody } from './auth.api';
import { useNavigate } from 'react-router';

interface AuthContextState {
  isLoggedIn: boolean;
  tokenData: CognitoTokenResponseBody;
  login: () => void;
}

export type AuthContextValue = AuthContextState & {
  setAuthState: Dispatch<SetStateAction<AuthContextState>>
};

const DEFAULT_STATE: AuthContextState = {
  isLoggedIn: false,
  tokenData: null,
  login: () => {},
};

export const AuthContext = createContext<AuthContextValue>({
  ...DEFAULT_STATE,
  setAuthState: null,
});

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [state, setState] = useState<AuthContextState>(DEFAULT_STATE);
  const navigate = useNavigate();

  function login(): void {
    navigate("/login");
  }

  const contextValue: AuthContextValue = {
    ...state,
    login: useCallback(login, [navigate]),
    setAuthState: setState
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
