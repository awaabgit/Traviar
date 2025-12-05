import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TravelVideo } from '../types';

export function useCreatorVideos(creatorUserId: string | undefined) {
  const [videos, setVideos] = useState<TravelVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    if (!creatorUserId) {
      console.log('⚠️ useCreatorVideos: No creatorUserId provided');
      setLoading(false);
      return;
    }

    console.log('🔄 useCreatorVideos: Fetching videos for creator:', creatorUserId);

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('travel_videos')
        .select('*')
        .eq('creator_user_id', creatorUserId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      console.log('✅ useCreatorVideos: Fetched videos:', data);
      console.log('✅ useCreatorVideos: Video count:', data?.length || 0);

      // Log thumbnail info for each video
      data?.forEach((video: TravelVideo, index: number) => {
        console.log(`📸 Video ${index + 1}:`, {
          id: video.id,
          title: video.title,
          thumbnail_url: video.thumbnail_url,
          video_url: video.video_url,
          source_platform: video.source_platform,
        });
      });

      setVideos(data || []);
    } catch (err: any) {
      console.error('❌ Error fetching creator videos:', err);
      setError(err.message || 'Failed to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [creatorUserId]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos,
  };
}
