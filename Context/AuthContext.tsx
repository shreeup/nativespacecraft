import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

type AuthAction =
  | { type: 'RESTORE_TOKEN'; token: string | null }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

type AuthContextType = {
  state: AuthState;
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...state, isSignout: false, userToken: action.token };
    case 'SIGN_OUT':
      return { ...state, isSignout: true, userToken: null };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken ?? null });
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      state,
      signIn: async (data: any) => {
        // Save token to SecureStore if needed
        //await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async () => {
        //await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data: any) => {
        // await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
