import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface UserTrip {
  id: string;
  user_id: string;
  trip_name: string;
  destination: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  is_active: boolean;
  hero_image_url?: string;
  trip_status: 'draft' | 'upcoming' | 'in_progress' | 'past' | 'booked';
  travelers_count: number;
  is_shared: boolean;
  locations: string[];
  thumbnail_url?: string;
  budget_level?: 'budget' | 'moderate' | 'premium' | 'luxury';
  categories?: string[];
  created_at: string;
  updated_at: string;
}

export type TripFilter = 'all' | 'upcoming' | 'past' | 'booked' | 'drafts' | 'shared';
export type TripSort = 'recent' | 'upcoming' | 'alphabetical';

export function useUserTrips() {
  const [trips, setTrips] = useState<UserTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TripFilter>('all');
  const [sort, setSort] = useState<TripSort>('recent');

  useEffect(() => {
    fetchTrips();

    const channel = supabase
      .channel('user_trips_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_trips'
      }, () => {
        fetchTrips();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setTrips([]);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('user_trips')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (fetchError) throw fetchError;

      const tripsWithStatus = (data || []).map(trip => ({
        ...trip,
        trip_status: calculateTripStatus(trip.start_date, trip.end_date, trip.trip_status)
      }));

      setTrips(tripsWithStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTripStatus = (
    startDate: string,
    endDate: string,
    currentStatus: string
  ): UserTrip['trip_status'] => {
    if (currentStatus === 'draft' || currentStatus === 'booked') {
      return currentStatus as UserTrip['trip_status'];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) return 'upcoming';
    if (today > end) return 'past';
    return 'in_progress';
  };

  const filteredTrips = trips.filter(trip => {
    switch (filter) {
      case 'upcoming':
        return trip.trip_status === 'upcoming';
      case 'past':
        return trip.trip_status === 'past';
      case 'booked':
        return trip.trip_status === 'booked';
      case 'drafts':
        return trip.trip_status === 'draft';
      case 'shared':
        return trip.is_shared;
      default:
        return true;
    }
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sort) {
      case 'upcoming':
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      case 'alphabetical':
        return a.trip_name.localeCompare(b.trip_name);
      case 'recent':
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  const groupedTrips = {
    upcoming: sortedTrips.filter(t => t.trip_status === 'upcoming'),
    inProgress: sortedTrips.filter(t => t.trip_status === 'in_progress'),
    past: sortedTrips.filter(t => t.trip_status === 'past'),
    drafts: sortedTrips.filter(t => t.trip_status === 'draft'),
    shared: sortedTrips.filter(t => t.is_shared),
  };

  const deleteTrip = async (tripId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('user_trips')
        .delete()
        .eq('id', tripId);

      if (deleteError) throw deleteError;

      setTrips(trips.filter(t => t.id !== tripId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting trip:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete trip' };
    }
  };

  const duplicateTrip = async (tripId: string) => {
    try {
      const tripToDuplicate = trips.find(t => t.id === tripId);
      if (!tripToDuplicate) throw new Error('Trip not found');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error: insertError } = await supabase
        .from('user_trips')
        .insert({
          user_id: user.id,
          trip_name: `${tripToDuplicate.trip_name} (Copy)`,
          destination: tripToDuplicate.destination,
          start_date: tripToDuplicate.start_date,
          end_date: tripToDuplicate.end_date,
          hero_image_url: tripToDuplicate.hero_image_url,
          trip_status: 'draft',
          travelers_count: tripToDuplicate.travelers_count,
          is_shared: false,
          locations: tripToDuplicate.locations,
          thumbnail_url: tripToDuplicate.thumbnail_url,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      await fetchTrips();
      return { success: true, newTrip: data };
    } catch (err) {
      console.error('Error duplicating trip:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to duplicate trip' };
    }
  };

  const renameTrip = async (tripId: string, newName: string) => {
    try {
      const { error: updateError } = await supabase
        .from('user_trips')
        .update({ trip_name: newName, updated_at: new Date().toISOString() })
        .eq('id', tripId);

      if (updateError) throw updateError;

      setTrips(trips.map(t => t.id === tripId ? { ...t, trip_name: newName } : t));
      return { success: true };
    } catch (err) {
      console.error('Error renaming trip:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to rename trip' };
    }
  };

  return {
    trips: sortedTrips,
    groupedTrips,
    loading,
    error,
    filter,
    setFilter,
    sort,
    setSort,
    deleteTrip,
    duplicateTrip,
    renameTrip,
    refetch: fetchTrips,
  };
}
