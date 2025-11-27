import { useState, useEffect } from 'react';
import { useTripData } from '../hooks/useTripData';
import { TripSheetHeader } from './tripDashboard/TripSheetHeader';
import { TripTabs } from './tripDashboard/TripTabs';
import { OverviewTab } from './tripDashboard/tabs/OverviewTab';
import { PlanTab } from './tripDashboard/tabs/PlanTab';
import { ExplorerTab } from './tripDashboard/tabs/ExplorerTab';
import { BookingsTab } from './tripDashboard/BookingsTab';
import { EssentialsTab } from './tripDashboard/tabs/EssentialsTab';
import { SharedTab } from './tripDashboard/tabs/SharedTab';
import { AddPlaceModal } from './tripDashboard/itinerary/AddPlaceModal';
import { PlaceDetailDrawer } from './placeDetail/PlaceDetailDrawer';
import { Sidebar } from './Sidebar';
import { ViewMode } from '../types';
import { DayActivity } from '../hooks/useTripData';

interface TripDashboardProps {
  tripId: string;
  onBack: () => void;
  onViewModeChange?: (mode: ViewMode) => void;
}

export type TripTab = 'plan' | 'explorer' | 'overview' | 'bookings' | 'essentials' | 'shared';

export function TripDashboard({ tripId, onBack, onViewModeChange }: TripDashboardProps) {
  const [activeTab, setActiveTab] = useState<TripTab>('plan');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [selectedActivityId, setSelectedActivityId] = useState<string | undefined>();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [addPlaceModalOpen, setAddPlaceModalOpen] = useState(false);
  const [targetDayId, setTargetDayId] = useState<string | null>(null);
  const [placeDetailOpen, setPlaceDetailOpen] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const {
    activeTrip: trip,
    tripDays: days,
    loading,
    error,
    addActivity,
    deleteActivity,
    updateActivity,
    moveActivity,
    updateTripName,
  } = useTripData(undefined, tripId);

  const [expandedDays, setExpandedDays] = useState<Set<string>>(
    new Set(days.map(d => d.id))
  );

  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === 'itinerary') {
      onBack();
    } else if (onViewModeChange) {
      onBack();
      onViewModeChange(mode);
    }
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

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

  const handleActivityClick = (activityId: string, dayNumber: number) => {
    setSelectedActivityId(activityId);
    setSelectedDayNumber(dayNumber);

    const activityElement = document.getElementById(`activity-${activityId}`);
    if (activityElement) {
      activityElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setSelectedPlaceId(activityId);
    setPlaceDetailOpen(true);
  };

  const handlePlaceClick = (placeId: string) => {
    setSelectedPlaceId(placeId);
    setPlaceDetailOpen(true);
  };

  const handleAddPlaceToDay = (placeId: string, dayId: string, time: string) => {
    console.log('Add place to day:', { placeId, dayId, time });
  };

  useEffect(() => {
    if (days.length > 0) {
      setExpandedDays(new Set(days.map(d => d.id)));
    }
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFA]">
        <div className="text-center animate-scale-in">
          <div className="relative inline-block mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent"></div>
            <div className="absolute inset-0 rounded-full border-4 border-coral-200 animate-ping-slow"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse-soft">Loading your trip...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFA]">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">
            {error || 'Trip not found'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-medium
                     transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            Back to Trips
          </button>
        </div>
      </div>
    );
  }

  const selectedDay = days.find(d => d.day_number === selectedDayNumber) || days[0];

  return (
    <div className="h-screen flex bg-white">
      <Sidebar
        viewMode="itinerary"
        onViewModeChange={handleViewModeChange}
        onChatToggle={handleChatToggle}
        tripId={tripId}
        days={days}
        selectedDayNumber={selectedDayNumber}
        onSelectDay={setSelectedDayNumber}
        selectedActivityId={selectedActivityId}
        onActivityClick={handleActivityClick}
        activeTab={activeTab}
      />

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {activeTab !== 'overview' && (
              <TripSheetHeader
                trip={trip}
                onBack={onBack}
                onUpdateName={updateTripName}
              />
            )}

            <div className={activeTab === 'overview' ? '' : 'mt-8'}>
              <TripTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <div className="mt-8">
                {activeTab === 'overview' && (
                  <OverviewTab trip={trip} onEditTrip={onBack} />
                )}
                {activeTab === 'plan' && (
                  <PlanTab
                    days={days}
                    selectedDayNumber={selectedDayNumber}
                    onSelectDay={setSelectedDayNumber}
                    selectedActivityId={selectedActivityId}
                    onActivityClick={handleActivityClick}
                    expandedDays={expandedDays}
                    onToggleDay={toggleDay}
                    onAddPlace={handleOpenAddPlace}
                    onDeleteActivity={deleteActivity}
                    onMoveActivity={moveActivity}
                    onActivitySelect={setSelectedActivityId}
                  />
                )}
                {activeTab === 'explorer' && (
                  <ExplorerTab tripId={tripId} onPlaceClick={handlePlaceClick} />
                )}
                {activeTab === 'bookings' && <BookingsTab />}
                {activeTab === 'essentials' && <EssentialsTab tripId={tripId} />}
                {activeTab === 'shared' && <SharedTab tripId={tripId} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {addPlaceModalOpen && targetDayId && (
        <AddPlaceModal
          dayId={targetDayId}
          days={days}
          onClose={() => setAddPlaceModalOpen(false)}
          onAddActivity={addActivity}
        />
      )}

      <PlaceDetailDrawer
        placeId={selectedPlaceId}
        isOpen={placeDetailOpen}
        onClose={() => setPlaceDetailOpen(false)}
        onAddToDay={handleAddPlaceToDay}
        tripId={tripId}
      />
    </div>
  );
}
