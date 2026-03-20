export interface LyricItem {
  line_order: number;
  lyric_text: string;
  start_time: number;
  phonetic?: string;
}

export interface MiniSong {
  mini_song_id: string;
  title: string;
  thumbnail: string;
  duration: number;
  category: string;
  video_url: string;
  song_lyrics: LyricItem[];
  created_at: string;
  lyrics?: LyricItem[];
}

export interface FetchYoutubeParams {
  video_url: string;
  category?: string;
  manual_text?: string;
}

export interface MiniSongResponse {
  success: boolean;
  message: string;
  data: MiniSong[];
}