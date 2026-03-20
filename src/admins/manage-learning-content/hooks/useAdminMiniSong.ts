import { useState } from 'react';
import { adminMiniSongService } from '../services/AdminMiniSongService';
import type { MiniSong, FetchYoutubeParams} from '../types/AdminMiniSongType';

export const useAdminMiniSong = () => {
  const [previewData, setPreviewData] = useState<MiniSong | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPreview = async (params: FetchYoutubeParams) => {
    setLoading(true);
    try {
      const response = await adminMiniSongService.fetchPreview(params);
      if (response.success) {
        const rawData = response.data as any; 
        const formattedData: MiniSong = {
          ...rawData,
          song_lyrics: rawData.lyrics || rawData.song_lyrics || []
        };
        setPreviewData(formattedData);
      }
    } catch (error) {
      console.error("Fetch preview error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSong = async () => {
    if (!previewData) return;
    try {
      setLoading(true);
      const savePayload = {
        title: previewData.title,
        video_url: previewData.video_url,
        thumbnail: previewData.thumbnail,
        duration: Number(previewData.duration), 
        category: previewData.category || "English for Kids", 
        lyrics: previewData.song_lyrics.map(item => ({
          line_order: item.line_order,
          lyric_text: item.lyric_text,
          start_time: Number(item.start_time),
          phonetic: item.phonetic || ""
        }))
      };

      const res = await adminMiniSongService.saveSong(savePayload);
      if(res.success) {
         alert('Save successful!');
         setPreviewData(null);
      } else {
         alert('Save failure:' + res.message);
      }
    } catch (error: any) {
      console.error("Save Error Detail:", error.response?.data);
      alert('The save failed! Please check again.');
    } finally {
      setLoading(false);
    }
  };

  return { previewData, loading, fetchPreview, saveSong, setPreviewData };
};