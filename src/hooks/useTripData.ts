import { useEffect, useState } from 'react';
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
  trip_status?: 'draft' | 'upcoming' | 'in_progress' | 'past' | 'booked';
  travelers_count?: number;
  budget_tier?: string;
  categories?: string[];
  locations?: string[];
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TripDay {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  title?: string;
  notes?: string;
  created_at: string;
  activities: DayActivity[];
}

export interface DayActivity {
  id: string;
  day_id: string;
  category: 'accommodation' | 'restaurant' | 'attraction' | 'activity' | 'transport' | 'other';
  title: string;
  description?: string;
  location_name?: string;
  location_lat?: number;
  location_lng?: number;
  start_time?: string;
  duration_minutes?: number;
  cost: number;
  booking_url?: string;
  sort_order: number;
  created_at: string;
}

export function useTripData(userId?: string, tripId?: string) {
  const [activeTrip, setActiveTrip] = useState<UserTrip | null>(null);
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tripId) {
      fetchSpecificTrip(tripId);
    } else if (userId) {
      fetchActiveTrip();
    } else {
      setLoading(false);
    }
  }, [userId, tripId]);

  const fetchSpecificTrip = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data: trip, error: tripError } = await supabase
        .from('user_trips')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (tripError) throw tripError;

      setActiveTrip(trip);

      if (trip) {
        await fetchDaysWithActivities(trip.id);
      } else {
        setTripDays([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trip data');
      console.error('Error fetching trip data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveTrip = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: trip, error: tripError } = await supabase
        .from('user_trips')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (tripError) throw tripError;

      setActiveTrip(trip);

      if (trip) {
        await fetchDaysWithActivities(trip.id);
      } else {
        setTripDays([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trip data');
      console.error('Error fetching trip data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDaysWithActivities = async (tripIdToFetch: string) => {
    const { data: days, error: daysError } = await supabase
      .from('trip_days')
      .select('*')
      .eq('trip_id', tripIdToFetch)
      .order('day_number', { ascending: true });

    if (daysError) throw daysError;

    const daysWithActivities = await Promise.all(
      (days || []).map(async (day) => {
        const { data: activities, error: activitiesError } = await supabase
          .from('day_activities')
          .select('*')
          .eq('day_id', day.id)
          .order('sort_order', { ascending: true });

        if (activitiesError) {
          console.error('Error fetching activities:', activitiesError);
          return { ...day, activities: [] };
        }

        return { ...day, activities: activities || [] };
      })
    );

    setTripDays(daysWithActivities as TripDay[]);
  };

  const createTrip = async (tripData: {
    trip_name: string;
    destination: string;
    start_date: string;
    end_date: string;
  }) => {
    if (!userId) throw new Error('User ID is required');

    try {
      await supabase
        .from('user_trips')
        .update({ is_active: false })
        .eq('user_id', userId)
        .eq('is_active', true);

      const { data: trip, error: tripError } = await supabase
        .from('user_trips')
        .insert({
          user_id: userId,
          trip_name: tripData.trip_name,
          destination: tripData.destination,
          start_date: tripData.start_date,
          end_date: tripData.end_date,
          is_active: true,
        })
        .select()
        .single();

      if (tripError) throw tripError;

      const startDate = new Date(tripData.start_date);
      const endDate = new Date(tripData.end_date);
      const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const daysToInsert = [];
      for (let i = 0; i < daysCount; i++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);
        daysToInsert.push({
          trip_id: trip.id,
          day_number: i + 1,
          date: dayDate.toISOString().split('T')[0],
        });
      }

      const { error: daysError } = await supabase
        .from('trip_days')
        .insert(daysToInsert);

      if (daysError) throw daysError;

      await fetchActiveTrip();
      return trip;
    } catch (err) {
      console.error('Error creating trip:', err);
      throw err;
    }
  };

  const updateTrip = async (tripId: string, updates: Partial<UserTrip>) => {
    try {
      const { error } = await supabase
        .from('user_trips')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', tripId);

      if (error) throw error;
      await fetchActiveTrip();
    } catch (err) {
      console.error('Error updating trip:', err);
      throw err;
    }
  };

  const deleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from('user_trips')
        .delete()
        .eq('id', tripId);

      if (error) throw error;
      await fetchActiveTrip();
    } catch (err) {
      console.error('Error deleting trip:', err);
      throw err;
    }
  };

  const addActivity = async (dayId: string, activity: Omit<DayActivity, 'id' | 'day_id' | 'created_at' | 'sort_order'>) => {
    try {
      const day = tripDays.find(d => d.id === dayId);
      if (!day) throw new Error('Day not found');

      const maxSortOrder = day.activities.reduce((max, a) => Math.max(max, a.sort_order), -1);

      const { data, error: insertError } = await supabase
        .from('day_activities')
        .insert({
          day_id: dayId,
          ...activity,
          sort_order: maxSortOrder + 1,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      if (activeTrip) {
        await fetchDaysWithActivities(activeTrip.id);
      }
      return { success: true, activity: data };
    } catch (err) {
      console.error('Error adding activity:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add activity' };
    }
  };

  const deleteActivity = async (activityId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('day_activities')
        .delete()
        .eq('id', activityId);

      if (deleteError) throw deleteError;

      if (activeTrip) {
        await fetchDaysWithActivities(activeTrip.id);
      }
      return { success: true };
    } catch (err) {
      console.error('Error deleting activity:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete activity' };
    }
  };

  const updateActivity = async (activityId: string, updates: Partial<DayActivity>) => {
    try {
      const { error: updateError } = await supabase
        .from('day_activities')
        .update(updates)
        .eq('id', activityId);

      if (updateError) throw updateError;

      if (activeTrip) {
        await fetchDaysWithActivities(activeTrip.id);
      }
      return { success: true };
    } catch (err) {
      console.error('Error updating activity:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update activity' };
    }
  };

  const moveActivity = async (activityId: string, targetDayId: string) => {
    try {
      const targetDay = tripDays.find(d => d.id === targetDayId);
      if (!targetDay) throw new Error('Target day not found');

      const maxSortOrder = targetDay.activities.reduce((max, a) => Math.max(max, a.sort_order), -1);

      const { error: moveError } = await supabase
        .from('day_activities')
        .update({
          day_id: targetDayId,
          sort_order: maxSortOrder + 1,
        })
        .eq('id', activityId);

      if (moveError) throw moveError;

      if (activeTrip) {
        await fetchDaysWithActivities(activeTrip.id);
      }
      return { success: true };
    } catch (err) {
      console.error('Error moving activity:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to move activity' };
    }
  };

  const updateTripName = async (tripIdToUpdate: string, newName: string) => {
    try {
      const { error: updateError } = await supabase
        .from('user_trips')
        .update({ trip_name: newName, updated_at: new Date().toISOString() })
        .eq('id', tripIdToUpdate);

      if (updateError) throw updateError;

      if (tripId) {
        await fetchSpecificTrip(tripId);
      } else {
        await fetchActiveTrip();
      }
      return { success: true };
    } catch (err) {
      console.error('Error updating trip name:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update trip name' };
    }
  };

  return {
    activeTrip,
    tripDays,
    loading,
    error,
    createTrip,
    updateTrip,
    deleteTrip,
    addActivity,
    deleteActivity,
    updateActivity,
    moveActivity,
    updateTripName,
    refreshTrip: tripId ? () => fetchSpecificTrip(tripId) : fetchActiveTrip,
  };
}
