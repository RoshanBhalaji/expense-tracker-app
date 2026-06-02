export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  gender: string | null;
  date_of_birth: string | null;
  role: "USER" | "ADMIN";
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterResponse {
  message: string;
  requires_confirmation: boolean;
  tokens: TokenResponse | null;
  user: User | null;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  date_of_birth?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiError {
  detail: string;
}
