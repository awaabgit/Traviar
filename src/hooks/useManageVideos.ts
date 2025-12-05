import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { TravelVideo } from '../types';

type VideoCreateData = {
  title: string;
  description?: string;
  thumbnail_url: string;
  video_url?: string;
  source_platform: 'traviar' | 'tiktok' | 'youtube';
  video_format?: 'short' | 'standard';
  external_video_id?: string;
  location_name?: string;
  location_country?: string;
  is_featured?: boolean;
  linked_itinerary_id?: string;
};

type VideoUpdateData = Partial<VideoCreateData>;

export function useManageVideos() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVideo = async (
    userId: string,
    username: string,
    avatarUrl: string,
    videoData: VideoCreateData
  ): Promise<TravelVideo | null> => {
    try {
      setCreating(true);
      setError(null);

      const { data, error: createError } = await supabase
        .from('travel_videos')
        .insert({
          creator_user_id: userId,
          creator_username: username,
          creator_avatar_url: avatarUrl,
          title: videoData.title,
          description: videoData.description || '',
          thumbnail_url: videoData.thumbnail_url,
          video_url: videoData.video_url,
          source_platform: videoData.source_platform,
          video_format: videoData.video_format || 'standard',
          external_video_id: videoData.external_video_id,
          location_name: videoData.location_name || '',
          location_country: videoData.location_country || '',
          view_count: 0,
          like_count: 0,
          comment_count: 0,
          share_count: 0,
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      return data;
    } catch (err: any) {
      console.error('Error creating video:', err);
      setError(err.message || 'Failed to create video');
      return null;
    } finally {
      setCreating(false);
    }
  };

  const updateVideo = async (
    videoId: string,
    updates: VideoUpdateData
  ): Promise<TravelVideo | null> => {
    try {
      setUpdating(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from('travel_videos')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', videoId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return data;
    } catch (err: any) {
      console.error('Error updating video:', err);
      setError(err.message || 'Failed to update video');
      return null;
    } finally {
      setUpdating(false);
    }
  };

  const deleteVideo = async (videoId: string): Promise<boolean> => {
    try {
      setDeleting(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('travel_videos')
        .delete()
        .eq('id', videoId);

      if (deleteError) {
        throw deleteError;
      }

      return true;
    } catch (err: any) {
      console.error('Error deleting video:', err);
      setError(err.message || 'Failed to delete video');
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    createVideo,
    updateVideo,
    deleteVideo,
    creating,
    updating,
    deleting,
    error,
  };
}
