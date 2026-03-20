import api from "../../../core/services/ApiService";
import type { StoryRespone } from "../types/AdminStoryType";

export const AdminStoryService ={
    getAllStories: async (): Promise<StoryRespone> => {
        const respone = await api.get('/admin/stories/list-stories');
        return respone.data;
    },

    deleteStory: async (id: number): Promise<void> => {
        await api.delete(`/admin/stories/${id}`);
    }
}