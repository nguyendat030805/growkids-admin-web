import api from './../../../core/services/ApiService'; 
import type { 
  FetchYoutubeParams, 
  MiniSongResponse 
} from '../types/AdminMiniSongType';

const ADMIN_PATH = '/admin/mini-songs';


export const adminMiniSongService = {

  getAllSongs: async (): Promise<MiniSongResponse> => {
    const response = await api.get(`${ADMIN_PATH}/list-minisongs`);
    return response.data; 
  },

  fetchPreview: async (data: FetchYoutubeParams): Promise<MiniSongResponse> => {
    const response = await api.post(`${ADMIN_PATH}/fetch-youtube`, data);
    return response.data;
  },

  saveSong: async (data: any): Promise<MiniSongResponse> => {
    const response = await api.post(`${ADMIN_PATH}`, data);
    return response.data;
  },

  deleteSong: async (id: string): Promise<void> => {
    await api.delete(`${ADMIN_PATH}/${id}`);
  }
};