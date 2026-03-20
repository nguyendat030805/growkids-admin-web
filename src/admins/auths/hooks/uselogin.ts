import { useState } from 'react';
import { authService } from '../services/AuthService';
import type { LoginResponse } from '../types/Authtype';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.login(email, password);
        localStorage.setItem('accessToken', data.accessToken);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};