import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { TravelVideo } from '../types';

export function useCreatorVideos(creatorUserId: string | undefined) {
  const [videos, setVideos] = useState<TravelVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    if (!creatorUserId) {
      setLoading(false);
      return;
    }

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

      setVideos(data || []);
    } catch (err: any) {
      console.error('Error fetching creator videos:', err);
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
