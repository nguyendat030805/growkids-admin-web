import type { ApiResponse } from '../types/SystemDashBoardType';
import api from '../../../core/services/ApiService';

export const getDashboardStats = async (): Promise<ApiResponse> => {
  const response = await api.get(`/admin/statistics/dashboard`);
  return response.data;
};