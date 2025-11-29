import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MarketplaceCollection } from '../types';

export function useCreatorCollections(creatorUserId: string | undefined) {
  const [collections, setCollections] = useState<MarketplaceCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = async () => {
    if (!creatorUserId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Note: This assumes marketplace_collections has a creator_id or user_id field
      // If not, the schema needs to be updated to include this
      const { data, error: fetchError } = await supabase
        .from('marketplace_collections')
        .select('*')
        .eq('creator_id', creatorUserId)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setCollections(data || []);
    } catch (err: any) {
      console.error('Error fetching creator collections:', err);
      setError(err.message || 'Failed to load collections');
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [creatorUserId]);

  return {
    collections,
    loading,
    error,
    refetch: fetchCollections,
  };
}
