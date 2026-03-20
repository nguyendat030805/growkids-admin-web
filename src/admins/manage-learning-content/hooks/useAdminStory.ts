import { useState, useCallback } from 'react';
import { AdminStoryService } from '../services/AdminStoryService';
import type { Story } from '../types/AdminStoryType';
import toast from 'react-hot-toast';

export const useAdminStory = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadStories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AdminStoryService.getAllStories();
      if (res.success) {
        setStories(res.data || []);
      }
    } catch (error: any) {
      console.error("Error loading stories:", error);
      toast.error("Unable to load the list of stories");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      setDeletingId(id);
      await AdminStoryService.deleteStory(id);
      setStories(prev => prev.filter(story => story.story_id !== id));
      toast.success("The story has been successfully deleted.");
      
    } catch (error: any) {
      console.error("Story deletion error:", error);
      toast.error(error.response?.data?.message || "Error when deleting a story");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    stories,
    loading,
    deletingId,
    loadStories,
    deleteStory,
    setStories
  };
};