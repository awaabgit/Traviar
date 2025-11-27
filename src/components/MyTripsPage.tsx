import { useState } from 'react';
import { Plus, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useUserTrips } from '../hooks/useUserTrips';
import { TripFilterBar } from './TripFilterBar';
import { TripSortDropdown } from './TripSortDropdown';
import { MyTripCard } from './MyTripCard';
import { EmptyTripsState } from './EmptyTripsState';
import { RenameModal, DeleteModal, Toast } from './TripActionModals';
import { CreateTripModal } from './createTrip/CreateTripModal';

interface MyTripsPageProps {
  onSelectTrip: (tripId: string) => void;
}

export function MyTripsPage({ onSelectTrip }: MyTripsPageProps) {
  const {
    trips,
    groupedTrips,
    loading,
    filter,
    setFilter,
    sort,
    setSort,
    deleteTrip,
    duplicateTrip,
    renameTrip,
  } = useUserTrips();

  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createTripModalOpen, setCreateTripModalOpen] = useState(false);
  const [createTripFlow, setCreateTripFlow] = useState<'manual' | 'ai'>('manual');
  const [selectedTrip, setSelectedTrip] = useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    upcoming: true,
    inProgress: true,
    past: true,
    drafts: true,
    shared: true,
  });

  const handleRename = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      setSelectedTrip({ id: trip.id, name: trip.trip_name });
      setRenameModalOpen(true);
    }
  };

  const handleConfirmRename = async (newName: string) => {
    if (selectedTrip) {
      const result = await renameTrip(selectedTrip.id, newName);
      if (result.success) {
        setToast({ message: 'Trip renamed successfully', type: 'success' });
      } else {
        setToast({ message: result.error || 'Failed to rename trip', type: 'error' });
      }
    }
  };

  const handleDuplicate = async (tripId: string) => {
    const result = await duplicateTrip(tripId);
    if (result.success) {
      setToast({ message: 'Trip duplicated successfully', type: 'success' });
    } else {
      setToast({ message: result.error || 'Failed to duplicate trip', type: 'error' });
    }
  };

  const handleDelete = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      setSelectedTrip({ id: trip.id, name: trip.trip_name });
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedTrip) {
      const result = await deleteTrip(selectedTrip.id);
      if (result.success) {
        setToast({ message: 'Trip deleted successfully', type: 'success' });
      } else {
        setToast({ message: result.error || 'Failed to delete trip', type: 'error' });
      }
    }
  };

  const handleTripClick = (tripId: string) => {
    onSelectTrip(tripId);
  };

  const handleCreateTrip = () => {
    setCreateTripFlow('manual');
    setCreateTripModalOpen(true);
  };

  const handlePlanWithAI = () => {
    setCreateTripFlow('ai');
    setCreateTripModalOpen(true);
  };

  const handleTripCreated = async (tripId: string) => {
    setCreateTripModalOpen(false);
    onSelectTrip(tripId);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderTripSection = (
    title: string,
    trips: typeof groupedTrips.upcoming,
    sectionKey: keyof typeof expandedSections
  ) => {
    if (trips.length === 0) return null;

    return (
      <div className="mb-8">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
              {trips.length}
            </span>
          </div>
          {expandedSections[sectionKey] ? (
            <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
          )}
        </button>

        {expandedSections[sectionKey] && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {trips.map(trip => (
              <MyTripCard
                key={trip.id}
                trip={trip}
                onRename={handleRename}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onClick={handleTripClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Trips</h1>
            <p className="text-gray-600">Plan, organize, and revisit your adventures.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePlanWithAI}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-coral-500
                       hover:bg-coral-600 text-white font-medium transition-all duration-200
                       hover:shadow-soft-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="hidden sm:inline">Plan with AI</span>
            </button>
            <button
              onClick={handleCreateTrip}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black
                       hover:bg-gray-800 text-white font-medium transition-all duration-200
                       hover:shadow-soft-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Trip</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8
                      sticky top-0 bg-[#FAFAFA] py-4 z-10">
          <TripFilterBar activeFilter={filter} onFilterChange={setFilter} />
          <TripSortDropdown activeSort={sort} onSortChange={setSort} />
        </div>

        {trips.length === 0 ? (
          <EmptyTripsState
            filterType={filter}
            onCreateTrip={handleCreateTrip}
            onPlanWithAI={handlePlanWithAI}
          />
        ) : (
          <div>
            {filter === 'all' ? (
              <>
                {renderTripSection('Upcoming Trips', groupedTrips.upcoming, 'upcoming')}
                {renderTripSection('In Progress', groupedTrips.inProgress, 'inProgress')}
                {renderTripSection('Drafts', groupedTrips.drafts, 'drafts')}
                {renderTripSection('Past Trips', groupedTrips.past, 'past')}
                {renderTripSection('Shared With Me', groupedTrips.shared, 'shared')}
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map(trip => (
                  <MyTripCard
                    key={trip.id}
                    trip={trip}
                    onRename={handleRename}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    onClick={handleTripClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <RenameModal
        isOpen={renameModalOpen}
        currentName={selectedTrip?.name || ''}
        onClose={() => setRenameModalOpen(false)}
        onConfirm={handleConfirmRename}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        tripName={selectedTrip?.name || ''}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <CreateTripModal
        isOpen={createTripModalOpen}
        onClose={() => setCreateTripModalOpen(false)}
        flowType={createTripFlow}
        onSuccess={handleTripCreated}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
