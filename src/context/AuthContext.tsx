import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthAPI } from "../api/auth.api";
import { TokenService } from "../services/token.service";
import { LoginPayload, RegisterPayload, User } from "../api/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "SET_USER"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { user: null, isAuthenticated: false, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await TokenService.getAccessToken();
        if (token) {
          const user = await AuthAPI.getMe();
          dispatch({ type: "SET_USER", payload: user });
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch {
        await TokenService.clearTokens();
        dispatch({ type: "LOGOUT" });
      }
    };
    bootstrap();
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const data = await AuthAPI.login(payload);
    await TokenService.setTokens(data.access_token, data.refresh_token);
    dispatch({ type: "SET_USER", payload: data.user });
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const data = await AuthAPI.register(payload);
    if (data.tokens && data.user) {
      await TokenService.setTokens(
        data.tokens.access_token,
        data.tokens.refresh_token
      );
      dispatch({ type: "SET_USER", payload: data.user });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthAPI.logout();
    } finally {
      await TokenService.clearTokens();
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
