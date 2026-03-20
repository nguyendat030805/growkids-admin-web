export interface ContentMix {
  type: string;
  count: number;
}

export interface TopContent {
  title: string;
  views: number;
}

export interface AIActivity {
  name: string;
  Vision: number; 
  Chat: number;   
}

export interface DashboardData {
  contentMix: ContentMix[];
  topContent: TopContent[];
  aiTrends: AIActivity[];
  summary: {
    totalUsers: number;
    totalChildren: number;
    totalSongs: number;
    totalStories: number;
    activeAIVisionUsers: number; 
    activeAIChatUsers: number;   
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}