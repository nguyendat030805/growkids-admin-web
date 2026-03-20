export interface Story{
    story_id: number;
    topic_id: number;
    title: string;
    age_min: number | null;
    age_max: number | null;
    duration_seconds: number;
    cover_image_url: string | null;
    is_active: boolean;
    created_at: string;
    story_segments?: StorySegment[];
    _count?: {
        story_segments: number;
    };
}

export interface StorySegment{
    segment_id: number;
    story_id: number;
    segment_order: number;
    content_text: string | null;
    audio_url: string | null;
    interaction_type: string | null;
    created_at: string;
}

export interface StoryRespone{
    success: boolean;
    message: string;
    data: Story[];
}