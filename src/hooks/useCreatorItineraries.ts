import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MarketplaceItinerary } from '../types';

export function useCreatorItineraries(creatorId: string | undefined) {
  const [itineraries, setItineraries] = useState<MarketplaceItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!creatorId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('marketplace_itineraries')
          .select('*')
          .eq('creator_id', creatorId)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setItineraries(data || []);
      } catch (err: any) {
        console.error('Error fetching creator itineraries:', err);
        setError(err.message || 'Failed to load itineraries');
        setItineraries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [creatorId]);

  return {
    itineraries,
    loading,
    error,
  };
}
