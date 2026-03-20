export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  data: LoginResponse | null;
}