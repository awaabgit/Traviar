import { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { MobileNav } from '../MobileNav';
import { CreatorProfileHero, CreatorProfile } from './CreatorProfileHero';
import { ProfileTabBar, ProfileTab } from './ProfileTabBar';
import { ItinerariesTab, ItineraryCardData } from './ItinerariesTab';
import { VideosTab } from './VideosTab';
import { VideoDrawer } from './VideoDrawer';
import { CollectionsTab } from './CollectionsTab';
import { AboutTab } from './AboutTab';
import { CreatorRightPanel } from './CreatorRightPanel';
import { CreateTripModal } from '../createTrip/CreateTripModal';
import { ViewMode } from '../../types';
import { Eye, X, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useCreatorItineraries } from '../../hooks/useCreatorItineraries';

interface CreatorProfilePageProps {
  creatorId?: string;
  isOwnProfile?: boolean;
  onViewModeChange: (mode: ViewMode) => void;
}

export function CreatorProfilePage({ creatorId, isOwnProfile = false, onViewModeChange }: CreatorProfilePageProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('itineraries');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isVisitorView, setIsVisitorView] = useState(false);
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);

  // Get current user and profile data
  const { user } = useAuthContext();
  const userId = creatorId || user?.id;
  const { profile, loading, error } = useProfile(userId);
  const { itineraries: marketplaceItineraries, loading: itinerariesLoading } = useCreatorItineraries(userId);

  const handleFollow = () => {
    console.log('Follow clicked');
  };

  const handleMessage = () => {
    console.log('Message clicked');
  };

  const handleViewTikTok = () => {
    console.log('View TikTok clicked');
  };

  const handleItineraryClick = (id: string) => {
    console.log('Itinerary clicked:', id);
  };

  const handleVideoClick = (id: string) => {
    setSelectedVideoId(id);
  };

  const handleCollectionClick = (id: string) => {
    console.log('Collection clicked:', id);
  };

  const handleOpenItinerary = () => {
    setSelectedVideoId(null);
    console.log('Open itinerary from video');
  };

  const handleChatToggle = () => {
    console.log('Chat toggle');
  };

  // Map database profile to CreatorProfile format
  const creatorProfile: CreatorProfile | null = profile ? {
    id: profile.id,
    username: `@${profile.username}`,
    displayName: profile.full_name || profile.username,
    avatar: profile.avatar_url || 'https://via.placeholder.com/300',
    coverImage: undefined,
    location: '',
    bio: profile.bio || '',
    tags: profile.travel_style || [],
    socialLinks: {
      tiktok: '#',
      instagram: '#',
      youtube: '#',
      website: '#',
    },
    stats: {
      followers: profile.follower_count || 0,
      tripsSold: marketplaceItineraries.length,
      rating: 0,
      countriesVisited: 0,
    },
  } : null;

  // Map marketplace itineraries to ItineraryCardData format
  const itineraryCards: ItineraryCardData[] = marketplaceItineraries.map((itinerary) => ({
    id: itinerary.id,
    title: itinerary.title,
    coverImage: itinerary.cover_image_url || 'https://via.placeholder.com/600',
    price: itinerary.discount_price || itinerary.price,
    rating: itinerary.rating_avg || 0,
    reviewCount: itinerary.rating_count || 0,
    duration: `${itinerary.duration_days} day${itinerary.duration_days > 1 ? 's' : ''}`,
    stops: 0, // This would need to be calculated from itinerary items if available
    creatorAvatar: profile?.avatar_url || 'https://via.placeholder.com/80',
  }));

  const handlePlanTrip = () => {
    setIsCreateTripModalOpen(true);
  };

  const handlePlanWithAI = () => {
    onViewModeChange('chat');
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          viewMode="profile"
          onViewModeChange={onViewModeChange}
          onChatToggle={handleChatToggle}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-coral-500 animate-spin" />
              </div>
            )}

            {error && (
              <div className="p-8 bg-red-50 border border-red-200 rounded-xl text-center">
                <p className="text-red-700 font-medium">Error loading profile</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            )}

            {!loading && !error && creatorProfile && (
              <>
                {isOwnProfile && isVisitorView && (
                  <div className="mb-4 px-6 py-4 rounded-xl bg-blue-50 border border-blue-200
                               flex items-center justify-between animate-slide-down">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">Preview Mode</p>
                        <p className="text-xs text-blue-700">You're viewing your profile as others see it</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsVisitorView(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600
                               hover:bg-blue-700 text-white text-sm font-medium transition-all"
                    >
                      <X className="w-4 h-4" />
                      Exit Preview
                    </button>
                  </div>
                )}

                <CreatorProfileHero
                  profile={creatorProfile}
                  onFollow={handleFollow}
                  onMessage={handleMessage}
                  onViewTikTok={handleViewTikTok}
                  onEditProfile={() => onViewModeChange('dashboard')}
                />

                <ProfileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="pb-12">
                  {activeTab === 'itineraries' && (
                    <ItinerariesTab
                      itineraries={itineraryCards}
                      isOwnProfile={isOwnProfile}
                      onItineraryClick={handleItineraryClick}
                      onPlanTrip={handlePlanTrip}
                      onPlanWithAI={handlePlanWithAI}
                    />
                  )}

                  {activeTab === 'videos' && (
                    <VideosTab onVideoClick={handleVideoClick} />
                  )}

                  {activeTab === 'collections' && (
                    <CollectionsTab onCollectionClick={handleCollectionClick} />
                  )}

                  {activeTab === 'about' && <AboutTab />}
                </div>
              </>
            )}
          </div>
        </main>

        <CreatorRightPanel
          onVideoClick={handleVideoClick}
          isOwnProfile={isOwnProfile}
          isVisitorView={isVisitorView}
          onToggleVisitorView={() => setIsVisitorView(!isVisitorView)}
          onEditProfile={() => onViewModeChange('dashboard')}
          onAccountSettings={() => onViewModeChange('dashboard')}
        />
      </div>

      <MobileNav
        viewMode="profile"
        onViewModeChange={onViewModeChange}
        onChatToggle={handleChatToggle}
      />

      <VideoDrawer
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
        onOpenItinerary={handleOpenItinerary}
      />

      <CreateTripModal
        isOpen={isCreateTripModalOpen}
        onClose={() => setIsCreateTripModalOpen(false)}
        flowType="manual"
        onSuccess={(tripId) => {
          setIsCreateTripModalOpen(false);
          console.log('Trip created:', tripId);
        }}
      />
    </div>
  );
}
