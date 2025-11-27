import { useState } from 'react';
import { ChevronLeft, Users, Calendar, DollarSign, MapPin, Pencil, UserPlus, MoreVertical } from 'lucide-react';
import { UserTrip } from '../../hooks/useTripData';
import { getHeroImageForDestination } from '../../utils/heroImages';

interface TripSheetHeaderProps {
  trip: UserTrip;
  onBack: () => void;
  onUpdateName: (tripId: string, newName: string) => Promise<{ success: boolean; error?: string }>;
}

export function TripSheetHeader({ trip, onBack, onUpdateName }: TripSheetHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tripName, setTripName] = useState(trip.trip_name);

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });

    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()}–${end.getDate()}`;
    }
    return `${startMonth} ${start.getDate()} – ${endMonth} ${end.getDate()}`;
  };

  const getBudgetDisplay = (budget?: string) => {
    if (!budget) return '$$';
    const levels: Record<string, string> = {
      'budget': '$',
      'moderate': '$$',
      'upscale': '$$$',
      'luxury': '$$$$'
    };
    return levels[budget] || '$$';
  };

  const handleSaveName = async () => {
    if (tripName.trim() && tripName !== trip.trip_name) {
      await onUpdateName(trip.id, tripName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTripName(trip.trip_name);
    setIsEditingName(false);
  };

  const destinationText = trip.locations && trip.locations.length > 0
    ? trip.locations.slice(0, 3).join(' · ')
    : trip.destination;

  const heroImage = trip.hero_image_url || getHeroImageForDestination(trip.destination, trip.locations);

  return (
    <div className="bg-white rounded-2xl shadow-soft-lg overflow-hidden">
      <div className="relative h-64 w-full">
        <img
          src={heroImage}
          alt={trip.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-white/90 transition-colors bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">My trips</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md hover:bg-black/70 transition-colors text-sm font-medium text-white border border-white/20">
              <UserPlus className="w-4 h-4" />
              <span>Invite</span>
            </button>
            <button className="p-2 rounded-lg bg-black/60 backdrop-blur-md hover:bg-black/70 transition-colors text-white border border-white/20">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="space-y-3">
            {isEditingName ? (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  onBlur={handleSaveName}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="text-4xl font-bold text-white border-b-2 border-white outline-none bg-transparent flex-1"
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">{trip.trip_name}</h1>
                <Pencil className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </button>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                <MapPin className="w-3 h-3 text-white" />
                <span className="text-white font-medium text-xs">{destinationText}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                <Calendar className="w-3 h-3 text-white" />
                <span className="text-white font-medium text-xs">{formatDateRange(trip.start_date, trip.end_date)}</span>
              </div>

              {trip.travelers_count && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                  <Users className="w-3 h-3 text-white" />
                  <span className="text-white font-medium text-xs">{trip.travelers_count} {trip.travelers_count === 1 ? 'traveler' : 'travelers'}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                <DollarSign className="w-3 h-3 text-white" />
                <span className="text-white font-medium text-xs">{getBudgetDisplay(trip.budget_tier)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
