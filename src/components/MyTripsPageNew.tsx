import { useState, useEffect } from 'react';
import { useUserTrips } from '../hooks/useUserTrips';
import { MyTripsHeader } from './myTrips/MyTripsHeader';
import { TripCardGrid } from './myTrips/TripCardGrid';
import { PastTripsCarousel } from './myTrips/PastTripsCarousel';
import { CreateTripModal } from './createTrip/CreateTripModal';

interface MyTripsPageNewProps {
  onSelectTrip: (tripId: string) => void;
}

type TabType = 'upcoming' | 'in_progress' | 'past' | 'saved';

export function MyTripsPageNew({ onSelectTrip }: MyTripsPageNewProps) {
  const { trips, groupedTrips, loading } = useUserTrips();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [createTripModalOpen, setCreateTripModalOpen] = useState(false);
  const [createTripFlow, setCreateTripFlow] = useState<'manual' | 'ai'>('manual');

  const upcomingTrips = groupedTrips.upcoming;
  const inProgressTrips = groupedTrips.inProgress; // Now includes both in_progress and draft trips
  const pastTrips = groupedTrips.past;

  // Debug: Log what's being rendered
  console.log('MyTripsPageNew RENDER:', {
    activeTab,
    totalTrips: trips.length,
    grouped: {
      upcoming: upcomingTrips.length,
      inProgress: inProgressTrips.length,
      past: pastTrips.length,
    },
    loading
  });

  // Auto-select the first tab that has trips when data loads
  useEffect(() => {
    if (!loading && trips.length > 0) {
      // Check tabs in priority order and select the first one with trips
      if (groupedTrips.inProgress.length > 0) {
        setActiveTab('in_progress');
      } else if (groupedTrips.upcoming.length > 0) {
        setActiveTab('upcoming');
      } else if (groupedTrips.past.length > 0) {
        setActiveTab('past');
      }
    }
  }, [loading, trips.length, groupedTrips.inProgress.length, groupedTrips.upcoming.length, groupedTrips.past.length]);

  const handleCreateTrip = () => {
    setCreateTripFlow('manual');
    setCreateTripModalOpen(true);
  };

  const handleTripCreated = (tripId: string) => {
    setCreateTripModalOpen(false);
    onSelectTrip(tripId);
  };

  const handleImproveWithAI = (tripId: string) => {
    console.log('Improve trip with AI:', tripId);
  };

  const getTripsForTab = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingTrips;
      case 'in_progress':
        return inProgressTrips;
      case 'past':
        return pastTrips;
      case 'saved':
        return trips.filter(t => t.is_shared);
      default:
        return [];
    }
  };

  const tripsToShow = getTripsForTab();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center animate-scale-in">
          <div className="relative inline-block mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 animate-ping-slow"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse-soft">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MyTripsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateTrip={handleCreateTrip}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        {activeTab === 'upcoming' && upcomingTrips.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Trips</h2>
            <TripCardGrid
              trips={upcomingTrips}
              onSelectTrip={onSelectTrip}
              onImproveWithAI={handleImproveWithAI}
            />
          </div>
        )}

        {activeTab === 'in_progress' && inProgressTrips.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">In Progress</h2>
            <TripCardGrid
              trips={inProgressTrips}
              onSelectTrip={onSelectTrip}
              onImproveWithAI={handleImproveWithAI}
            />
          </div>
        )}

        {activeTab === 'past' && pastTrips.length > 0 && (
          <div className="mb-12">
            <PastTripsCarousel
              trips={pastTrips}
              onSelectTrip={onSelectTrip}
            />
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Trips</h2>
            <TripCardGrid
              trips={tripsToShow}
              onSelectTrip={onSelectTrip}
            />
          </div>
        )}

        {tripsToShow.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-4">
              <svg className="w-20 h-20 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-500 mb-6">Start planning your next adventure</p>
            <button
              onClick={handleCreateTrip}
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold
                       rounded-xl transition-all duration-200"
            >
              Create Your First Trip
            </button>
          </div>
        )}
      </div>

      <CreateTripModal
        isOpen={createTripModalOpen}
        onClose={() => setCreateTripModalOpen(false)}
        flowType={createTripFlow}
        onSuccess={handleTripCreated}
      />
    </div>
  );
}
