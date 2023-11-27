import { Dispatch, PropsWithChildren, SetStateAction, createContext, useCallback, useContext, useState } from 'react';
import { CognitoTokenResponseBody, UserInfo } from './auth.api';

interface AuthContextState {
  isLoggedIn: boolean;
  tokenData: CognitoTokenResponseBody;
  userInfo: UserInfo;
}

export type AuthContextValue = AuthContextState & {
  setAuthState: Dispatch<SetStateAction<AuthContextState>>
};

const DEFAULT_STATE: AuthContextState = {
  isLoggedIn: false,
  tokenData: null,
  userInfo: null,
};

export const AuthContext = createContext<AuthContextValue>({
  ...DEFAULT_STATE,
  setAuthState: null,
});

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [state, setState] = useState<AuthContextState>(DEFAULT_STATE);

  const contextValue: AuthContextValue = {
    ...state,
    setAuthState: setState
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
