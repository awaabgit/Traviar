import { useState } from 'react';
import { Layout } from './components/Layout';
import { ExploreView } from './components/ExploreView';
import { ItineraryView } from './components/ItineraryView';
import { MyTripsPageNew } from './components/MyTripsPageNew';
import { TripDashboard } from './components/TripDashboard';
import { MarketplacePage } from './components/marketplace/MarketplacePage';
import { ChatView } from './components/chatView/ChatView';
import { CollectionsPage } from './components/collections/CollectionsPage';
import { CreatorProfilePage } from './components/profile/CreatorProfilePage';
import { AccountDashboard } from './components/dashboard/AccountDashboard';
import { EditProfileStandalone } from './components/dashboard/EditProfileStandalone';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { AuthModalManager } from './components/auth/AuthModalManager';
import { ProtectedView } from './components/auth/ProtectedView';
import { ViewMode } from './types';

function AppContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('explore');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { loading } = useAuthContext();

  const handleSelectTrip = (tripId: string) => {
    setSelectedTripId(tripId);
  };

  const handleBackToTrips = () => {
    setSelectedTripId(null);
  };

  const handleRequireAuth = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    // If user closes modal without auth, redirect to explore
    setViewMode('explore');
  };

  // Protected view modes that require authentication
  const protectedViews: ViewMode[] = ['itinerary', 'collections', 'profile', 'dashboard', 'edit-profile'];
  const isProtectedView = protectedViews.includes(viewMode);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFA] animate-fade-in">
        <div className="text-center animate-scale-in">
          <div className="relative inline-block mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent"></div>
            <div className="absolute inset-0 rounded-full border-4 border-coral-200 animate-ping-slow"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse-soft">Loading Traviar...</p>
        </div>
      </div>
    );
  }

  if (selectedTripId) {
    return (
      <>
        <ProtectedView
          onRequireAuth={handleRequireAuth}
          emptyStateTitle="Trip Details"
          emptyStateMessage="Please login or signup to view trip details"
        >
          <div className="animate-fade-in">
            <TripDashboard tripId={selectedTripId} onBack={handleBackToTrips} onViewModeChange={setViewMode} />
          </div>
        </ProtectedView>
        <AuthModalManager isOpen={showAuthModal} onClose={handleCloseAuthModal} />
      </>
    );
  }

  if (viewMode === 'chat') {
    return (
      <Layout viewMode={viewMode} onViewModeChange={setViewMode}>
        <div className="h-full animate-fade-in" key="chat">
          <ChatView />
        </div>
      </Layout>
    );
  }

  if (viewMode === 'profile') {
    return (
      <>
        <ProtectedView
          onRequireAuth={handleRequireAuth}
          emptyStateTitle="Profile"
          emptyStateMessage="Please login or signup to view and edit your profile"
        >
          <div className="animate-fade-in">
            <CreatorProfilePage
              isOwnProfile={true}
              onViewModeChange={setViewMode}
            />
          </div>
        </ProtectedView>
        <AuthModalManager isOpen={showAuthModal} onClose={handleCloseAuthModal} />
      </>
    );
  }

  if (viewMode === 'dashboard') {
    return (
      <>
        <ProtectedView
          onRequireAuth={handleRequireAuth}
          emptyStateTitle="Account Dashboard"
          emptyStateMessage="Please login or signup to access your account dashboard"
        >
          <div className="animate-fade-in">
            <AccountDashboard onBackToApp={setViewMode} />
          </div>
        </ProtectedView>
        <AuthModalManager isOpen={showAuthModal} onClose={handleCloseAuthModal} />
      </>
    );
  }

  if (viewMode === 'edit-profile') {
    return (
      <>
        <ProtectedView
          onRequireAuth={handleRequireAuth}
          emptyStateTitle="Edit Profile"
          emptyStateMessage="Please login or signup to edit your profile"
        >
          <div className="animate-fade-in">
            <EditProfileStandalone onBack={() => setViewMode('profile')} />
          </div>
        </ProtectedView>
        <AuthModalManager isOpen={showAuthModal} onClose={handleCloseAuthModal} />
      </>
    );
  }

  return (
    <>
      <Layout viewMode={viewMode} onViewModeChange={setViewMode} onLoginClick={handleRequireAuth}>
        {viewMode === 'explore' && (
          <div className="animate-fade-in" key="explore">
            <ExploreView />
          </div>
        )}
        {viewMode === 'itinerary' && (
          <ProtectedView
            onRequireAuth={handleRequireAuth}
            emptyStateTitle="My Trips"
            emptyStateMessage="Please login or signup to view and manage your trips"
          >
            <div className="animate-fade-in" key="itinerary">
              <MyTripsPageNew onSelectTrip={handleSelectTrip} />
            </div>
          </ProtectedView>
        )}
        {viewMode === 'marketplace' && (
          <div className="animate-fade-in" key="marketplace">
            <MarketplacePage />
          </div>
        )}
        {viewMode === 'collections' && (
          <ProtectedView
            onRequireAuth={handleRequireAuth}
            emptyStateTitle="Collections"
            emptyStateMessage="Please login or signup to view your saved collections"
          >
            <div className="animate-fade-in" key="collections">
              <CollectionsPage />
            </div>
          </ProtectedView>
        )}
      </Layout>
      <AuthModalManager isOpen={showAuthModal} onClose={handleCloseAuthModal} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
