import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';

type ProfileUpdateData = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;

export function useUpdateProfile() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (userId: string, updates: ProfileUpdateData): Promise<Profile | null> => {
    try {
      setUpdating(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      return data;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateProfile,
    updating,
    error,
  };
}
