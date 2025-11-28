import { useState } from 'react';
import { Eye, Play, Settings, User, Edit3, LogOut, ChevronDown, BarChart3 } from 'lucide-react';
import { MapView } from '../MapView';

type PanelMode = 'media' | 'map' | 'discover';

interface CreatorRightPanelProps {
  onVideoClick: (id: string) => void;
  isOwnProfile?: boolean;
  isVisitorView?: boolean;
  onToggleVisitorView?: () => void;
  onEditProfile?: () => void;
  onAccountSettings?: () => void;
  onCreatorDashboard?: () => void;
  isCreator?: boolean;
}

const MOCK_MEDIA = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=200',
    views: '2.3M',
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=200',
    views: '1.8M',
  },
  {
    id: '3',
    thumbnail: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=200',
    views: '950K',
  },
  {
    id: '4',
    thumbnail: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=200',
    views: '3.1M',
  },
  {
    id: '5',
    thumbnail: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=200',
    views: '1.2M',
  },
  {
    id: '6',
    thumbnail: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=200',
    views: '2.7M',
  },
];

const MOCK_LOCATIONS = [
  { id: '1', name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, type: 'attraction' as const },
  { id: '2', name: 'Sagrada Familia', lat: 41.4036, lng: 2.1744, type: 'attraction' as const },
  { id: '3', name: 'Colosseum', lat: 41.8902, lng: 12.4922, type: 'attraction' as const },
  { id: '4', name: 'Anne Frank House', lat: 52.3752, lng: 4.8840, type: 'attraction' as const },
];

const MOCK_SIMILAR_CREATORS = [
  {
    id: '1',
    name: '@travelwithemma',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
    itineraries: 32,
    rating: 4.8,
  },
  {
    id: '2',
    name: '@jakeontheroad',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80',
    itineraries: 18,
    rating: 4.9,
  },
  {
    id: '3',
    name: '@cityexplorer',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
    itineraries: 24,
    rating: 4.7,
  },
];

export function CreatorRightPanel({
  onVideoClick,
  isOwnProfile = false,
  isVisitorView = false,
  onToggleVisitorView,
  onEditProfile,
  onAccountSettings,
  onCreatorDashboard,
  isCreator = false
}: CreatorRightPanelProps) {
  const [mode, setMode] = useState<PanelMode>('media');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <aside className="hidden lg:block relative w-96 border-l border-gray-200 bg-white flex flex-col">
      {isOwnProfile && !isVisitorView && (
        <div className="border-b border-gray-200 p-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg
                       bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600
                              flex items-center justify-center text-white text-xs font-semibold">
                  JD
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">Your Profile</p>
                  <p className="text-xs text-gray-600">Manage settings</p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg
                           border border-gray-200 shadow-xl z-20 overflow-hidden
                           animate-slide-up-fade origin-top">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                           transition-all text-left hover:scale-[1.01] group"
                  style={{ animationDelay: '0ms' }}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onEditProfile?.();
                  }}
                >
                  <Edit3 className="w-4 h-4 text-gray-600 group-hover:rotate-6 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Edit Profile</p>
                    <p className="text-xs text-gray-500">Update your public information</p>
                  </div>
                </button>

                {isCreator && (
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                             transition-all text-left border-t border-gray-100 hover:scale-[1.01] group"
                    style={{ animationDelay: '50ms' }}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onCreatorDashboard?.();
                    }}
                  >
                    <BarChart3 className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Creator Dashboard</p>
                      <p className="text-xs text-gray-500">Analytics, sales & content management</p>
                    </div>
                  </button>
                )}

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                           transition-all text-left border-t border-gray-100 hover:scale-[1.01] group"
                  style={{ animationDelay: isCreator ? '100ms' : '50ms' }}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onAccountSettings?.();
                  }}
                >
                  <Settings className="w-4 h-4 text-gray-600 group-hover:rotate-90 transition-transform duration-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Account Settings</p>
                    <p className="text-xs text-gray-500">Privacy, security, notifications</p>
                  </div>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50
                           transition-all text-left border-t border-gray-100 hover:scale-[1.01] group"
                  style={{ animationDelay: isCreator ? '150ms' : '100ms' }}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onToggleVisitorView?.();
                  }}
                >
                  <User className="w-4 h-4 text-gray-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">View as Visitor</p>
                    <p className="text-xs text-gray-500">See how others view your profile</p>
                  </div>
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50
                           transition-all text-left border-t border-gray-100 hover:scale-[1.01] group"
                  style={{ animationDelay: isCreator ? '200ms' : '150ms' }}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    console.log('Log Out');
                  }}
                >
                  <LogOut className="w-4 h-4 text-red-600 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-red-600">Log Out</p>
                    <p className="text-xs text-gray-500">Sign out of your account</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode('media')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'media'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setMode('map')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'map'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setMode('discover')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'discover'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Discover
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mode === 'media' && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Creator's Videos</h3>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_MEDIA.map((video) => (
                <button
                  key={video.id}
                  onClick={() => onVideoClick(video.id)}
                  className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-100
                           hover:ring-2 hover:ring-coral-500 transition-all"
                >
                  <img
                    src={video.thumbnail}
                    alt="Video"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-coral-600 ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded bg-black/70 text-white text-xs font-medium
                                 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'map' && (
          <div className="h-full">
            <MapView
              locations={MOCK_LOCATIONS}
              center={[48.8584, 2.2945]}
              zoom={4}
            />
          </div>
        )}

        {mode === 'discover' && (
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Suggested Itineraries</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="w-full flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <img
                      src={`https://images.pexels.com/photos/${i === 1 ? '699466' : i === 2 ? '1388030' : '2147029'}/pexels-photo-${i === 1 ? '699466' : i === 2 ? '1388030' : '2147029'}.jpeg?auto=compress&cs=tinysrgb&w=80`}
                      alt="Itinerary"
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        {i === 1 ? 'Paris Weekend' : i === 2 ? 'Barcelona Tour' : 'Lisbon Guide'}
                      </h4>
                      <p className="text-xs text-gray-600">3 days · $19</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Similar Creators</h3>
              <div className="space-y-3">
                {MOCK_SIMILAR_CREATORS.map((creator) => (
                  <button
                    key={creator.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {creator.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {creator.itineraries} trips · ⭐ {creator.rating}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
