import { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { MobileNav } from '../MobileNav';
import { CreatorProfileHero, CreatorProfile } from './CreatorProfileHero';
import { ProfileTabBar, ProfileTab } from './ProfileTabBar';
import { ItinerariesTab } from './ItinerariesTab';
import { VideosTab } from './VideosTab';
import { VideoDrawer } from './VideoDrawer';
import { CollectionsTab } from './CollectionsTab';
import { AboutTab } from './AboutTab';
import { CreatorRightPanel } from './CreatorRightPanel';
import { ViewMode } from '../../types';
import { Eye, X } from 'lucide-react';

interface CreatorProfilePageProps {
  creatorId?: string;
  isOwnProfile?: boolean;
  onViewModeChange: (mode: ViewMode) => void;
}

const MOCK_PROFILE: CreatorProfile = {
  id: '1',
  username: '@wanderlust_sam',
  displayName: 'Sam Chen',
  avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
  coverImage: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920',
  location: 'Barcelona, Spain',
  bio: 'Full-time travel creator helping budget travelers explore Europe. Sharing authentic experiences, hidden gems, and practical tips for your next adventure.',
  tags: ['Budget Travel', 'City Breaks', 'Foodie', 'Solo Travel'],
  socialLinks: {
    tiktok: '#',
    instagram: '#',
    youtube: '#',
    website: '#',
  },
  stats: {
    followers: 247500,
    tripsSold: 1840,
    rating: 4.9,
    countriesVisited: 28,
  },
};

export function CreatorProfilePage({ creatorId, isOwnProfile = false, onViewModeChange }: CreatorProfilePageProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('itineraries');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isVisitorView, setIsVisitorView] = useState(false);

  const handleFollow = () => {
    console.log('Follow clicked');
  };

  const handleMessage = () => {
    console.log('Message clicked');
  };

  const handleViewTikTok = () => {
    window.open(MOCK_PROFILE.socialLinks.tiktok, '_blank');
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
              profile={MOCK_PROFILE}
              onFollow={handleFollow}
              onMessage={handleMessage}
              onViewTikTok={handleViewTikTok}
            />

            <ProfileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="pb-12">
              {activeTab === 'itineraries' && (
                <ItinerariesTab onItineraryClick={handleItineraryClick} />
              )}

              {activeTab === 'videos' && (
                <VideosTab onVideoClick={handleVideoClick} />
              )}

              {activeTab === 'collections' && (
                <CollectionsTab onCollectionClick={handleCollectionClick} />
              )}

              {activeTab === 'about' && <AboutTab />}
            </div>
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
    </div>
  );
}
