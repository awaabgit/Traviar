import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { MarketplaceCollection } from '../types';

type CollectionCreateData = {
  title: string;
  description?: string;
  cover_image_url?: string;
  itinerary_ids?: string[];
  is_public?: boolean;
};

type CollectionUpdateData = Partial<CollectionCreateData>;

export function useManageCollections() {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCollection = async (
    userId: string,
    collectionData: CollectionCreateData
  ): Promise<MarketplaceCollection | null> => {
    try {
      setCreating(true);
      setError(null);

      // Get the highest sort_order for this user's collections
      const { data: existingCollections } = await supabase
        .from('marketplace_collections')
        .select('sort_order')
        .eq('creator_id', userId)
        .order('sort_order', { ascending: false })
        .limit(1);

      const nextSortOrder = existingCollections && existingCollections.length > 0
        ? existingCollections[0].sort_order + 1
        : 0;

      const { data, error: createError } = await supabase
        .from('marketplace_collections')
        .insert({
          creator_id: userId,
          title: collectionData.title,
          description: collectionData.description || '',
          cover_image_url: collectionData.cover_image_url || 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600',
          itinerary_ids: collectionData.itinerary_ids || [],
          sort_order: nextSortOrder,
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      return data;
    } catch (err: any) {
      console.error('Error creating collection:', err);
      setError(err.message || 'Failed to create collection');
      return null;
    } finally {
      setCreating(false);
    }
  };

  const updateCollection = async (
    collectionId: string,
    updates: CollectionUpdateData
  ): Promise<MarketplaceCollection | null> => {
    try {
      setUpdating(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from('marketplace_collections')
        .update(updates)
        .eq('id', collectionId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return data;
    } catch (err: any) {
      console.error('Error updating collection:', err);
      setError(err.message || 'Failed to update collection');
      return null;
    } finally {
      setUpdating(false);
    }
  };

  const deleteCollection = async (collectionId: string): Promise<boolean> => {
    try {
      setDeleting(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('marketplace_collections')
        .delete()
        .eq('id', collectionId);

      if (deleteError) {
        throw deleteError;
      }

      return true;
    } catch (err: any) {
      console.error('Error deleting collection:', err);
      setError(err.message || 'Failed to delete collection');
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    createCollection,
    updateCollection,
    deleteCollection,
    creating,
    updating,
    deleting,
    error,
  };
}
