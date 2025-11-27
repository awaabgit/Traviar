import { useState } from 'react';
import { Compass, Map, ShoppingBag, Bookmark, Sparkles, MessageCircle, Layers, LogOut, LogIn } from 'lucide-react';
import { ViewMode } from '../types';
import { ItineraryDays } from './ItineraryDays';
import { TripCustomizationModal } from './TripCustomizationModal';
import { TripDay } from '../hooks/useTripData';
import { useAuthContext } from '../contexts/AuthContext';

interface SidebarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onChatToggle: () => void;
  tripId?: string;
  days?: TripDay[];
  selectedDayNumber?: number;
  onSelectDay?: (dayNumber: number) => void;
  selectedActivityId?: string;
  onActivityClick?: (activityId: string, dayNumber: number) => void;
  activeTab?: string;
  onLoginClick?: () => void;
}

const navItems = [
  { id: 'explore' as ViewMode, icon: Compass, label: 'Explore' },
  { id: 'itinerary' as ViewMode, icon: Map, label: 'My Trips' },
  { id: 'marketplace' as ViewMode, icon: ShoppingBag, label: 'Marketplace', isNew: true },
  { id: 'collections' as ViewMode, icon: Layers, label: 'Collections' },
];

export function Sidebar({
  viewMode,
  onViewModeChange,
  onChatToggle,
  tripId,
  days,
  selectedDayNumber,
  onSelectDay,
  selectedActivityId,
  onActivityClick,
  activeTab,
  onLoginClick,
}: SidebarProps) {
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const { user, signOut } = useAuthContext();

  const handleTripSave = async (data: any) => {
    console.log('Trip saved:', data);
  };

  const handleLogout = async () => {
    await signOut();
    onViewModeChange('explore');
  };

  const showDaysList = activeTab === 'plan';

  return (
    <>
      <aside className="flex flex-col w-64 bg-white">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/rawsdff-removebg-preview.png"
              alt="Traviar"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Traviar
            </h1>
          </div>
        </div>

        <nav className="p-4 pt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = viewMode === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewModeChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-full
                  transition-all duration-300 font-semibold text-sm
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${isActive
                    ? 'bg-gradient-sunset text-white shadow-md'
                    : 'text-gray-600 hover:bg-gradient-sunset-soft hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                <span>{item.label}</span>
                {(item as any).isNew && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-white text-orange-600 rounded-full">
                    New
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {showDaysList && (
          <div className="flex-1 overflow-y-auto animate-slide-in-down">
            <div className="py-3">
              <ItineraryDays
                tripId={tripId}
                days={days}
                selectedDayNumber={selectedDayNumber}
                onDaySelect={onSelectDay}
                selectedActivityId={selectedActivityId}
                onActivityClick={onActivityClick}
                onCustomizeClick={() => setIsCustomizationOpen(true)}
              />
            </div>
          </div>
        )}

        {!showDaysList && <div className="flex-1" />}

        <div className="p-4 pt-2 space-y-3">
          <button
            onClick={() => onViewModeChange('chat')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full
                       bg-gradient-sunset text-white
                       hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]
                       transition-all duration-300 transform
                       font-bold text-sm group shadow-md"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            Plan with AI
          </button>

          {user ? (
            <>
              <button
                onClick={() => onViewModeChange('profile')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                           hover:bg-gray-50 transition-all duration-200 text-sm
                           transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-sunset
                              flex items-center justify-center text-white text-xs font-bold ring-2 ring-gray-100">
                  {user.user_metadata?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">View profile</p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                           text-gray-600 hover:bg-red-50 hover:text-red-600
                           transition-all duration-200 text-sm font-medium
                           transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                         bg-gray-100 text-gray-700 hover:bg-gray-200
                         transition-all duration-200 text-sm font-semibold
                         transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      </aside>

      <TripCustomizationModal
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        onSave={handleTripSave}
      />
    </>
  );
}
