import api from '../../../core/services/ApiService';
import type { LoginResponse } from '../types/Authtype';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/admin/login', { email, password });
    return response.data.data;
  },
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data.data;
  }
};