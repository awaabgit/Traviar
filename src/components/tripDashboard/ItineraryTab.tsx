import { useState } from 'react';
import { UserTrip, TripDay, DayActivity } from '../../hooks/useTripData';
import { ItineraryEmptyCTA } from './itinerary/ItineraryEmptyCTA';
import { DaySection } from './itinerary/DaySection';
import { AddPlaceModal } from './itinerary/AddPlaceModal';

interface ItineraryTabProps {
  trip: UserTrip;
  days: TripDay[];
  onAddActivity: (dayId: string, activity: Omit<DayActivity, 'id' | 'day_id' | 'created_at' | 'sort_order'>) => Promise<{ success: boolean; error?: string }>;
  onDeleteActivity: (activityId: string) => Promise<{ success: boolean; error?: string }>;
  onUpdateActivity: (activityId: string, updates: Partial<DayActivity>) => Promise<{ success: boolean; error?: string }>;
  onMoveActivity: (activityId: string, targetDayId: string) => Promise<{ success: boolean; error?: string }>;
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
}

export function ItineraryTab({
  trip,
  days,
  onAddActivity,
  onDeleteActivity,
  onUpdateActivity,
  onMoveActivity,
  selectedDayNumber,
  onSelectDay,
}: ItineraryTabProps) {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(
    new Set(days.map(d => d.id))
  );
  const [addPlaceModalOpen, setAddPlaceModalOpen] = useState(false);
  const [targetDayId, setTargetDayId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalActivities = days.reduce((sum, day) => sum + day.activities.length, 0);
  const showEmptyCTA = totalActivities === 0;

  const toggleDay = (dayId: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayId)) {
      newExpanded.delete(dayId);
    } else {
      newExpanded.add(dayId);
    }
    setExpandedDays(newExpanded);
  };

  const handleOpenAddPlace = (dayId: string) => {
    setTargetDayId(dayId);
    setAddPlaceModalOpen(true);
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);

    setTimeout(async () => {
      if (days.length >= 2) {
        const sampleActivities = [
          {
            category: 'attraction' as const,
            title: 'Eiffel Tower',
            description: 'Iconic iron lattice tower and symbol of Paris',
            location_name: 'Champ de Mars, Paris',
            location_lat: 48.8584,
            location_lng: 2.2945,
            duration_minutes: 120,
            cost: 25,
          },
          {
            category: 'restaurant' as const,
            title: 'Le Comptoir du Relais',
            description: 'Classic French bistro with seasonal menu',
            location_name: 'Saint-Germain-des-Prés, Paris',
            location_lat: 48.8534,
            location_lng: 2.3392,
            duration_minutes: 90,
            cost: 50,
          },
        ];

        await onAddActivity(days[0].id, sampleActivities[0]);
        await onAddActivity(days[0].id, sampleActivities[1]);

        if (days[1]) {
          await onAddActivity(days[1].id, {
            category: 'attraction',
            title: 'Louvre Museum',
            description: 'World\'s largest art museum',
            location_name: 'Rue de Rivoli, Paris',
            location_lat: 48.8606,
            location_lng: 2.3376,
            duration_minutes: 180,
            cost: 20,
          });
        }
      }

      setIsGenerating(false);
    }, 2000);
  };

  const handleAddManually = () => {
    if (days.length > 0) {
      const firstDay = days[0];
      setExpandedDays(new Set([firstDay.id]));
      handleOpenAddPlace(firstDay.id);
    }
  };

  return (
    <div>
      {showEmptyCTA && (
        <ItineraryEmptyCTA
          onGenerateWithAI={handleGenerateWithAI}
          onAddManually={handleAddManually}
          isGenerating={isGenerating}
        />
      )}

      <div className="space-y-4">
        {days.map((day) => (
          <DaySection
            key={day.id}
            day={day}
            isExpanded={expandedDays.has(day.id)}
            onToggle={() => toggleDay(day.id)}
            onAddPlace={() => handleOpenAddPlace(day.id)}
            onDeleteActivity={onDeleteActivity}
            onMoveActivity={onMoveActivity}
            days={days}
          />
        ))}
      </div>

      {addPlaceModalOpen && targetDayId && (
        <AddPlaceModal
          dayId={targetDayId}
          days={days}
          onClose={() => setAddPlaceModalOpen(false)}
          onAddActivity={onAddActivity}
        />
      )}
    </div>
  );
}
