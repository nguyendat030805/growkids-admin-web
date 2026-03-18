import api from './../../../core/services/ApiService'; 
import type { UserResponse, UserQueryParams, User } from '../types/UserType';
const ADMIN_PATH = '/admin';

export const userService = {
  getUsers: async (params: UserQueryParams): Promise<UserResponse> => {
    const response = await api.get(ADMIN_PATH, { params });
    return response.data.data;
  },

  getUserDetail: async (id: string): Promise<User> => {
    const response = await api.get(`${ADMIN_PATH}/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, newStatus: string) => {
    const response = await api.patch(`/admin/${id}/status`, { 
      status: newStatus 
    });
    return response.data;
  }
};