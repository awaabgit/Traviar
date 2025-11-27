import { Compass, Map, Bookmark, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';

interface MobileNavProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onChatToggle: () => void;
}

const navItems = [
  { id: 'explore' as ViewMode, icon: Compass, label: 'Explore' },
  { id: 'itinerary' as ViewMode, icon: Map, label: 'Trips' },
  { id: 'budget' as ViewMode, icon: Bookmark, label: 'Saved' },
];

export function MobileNav({ viewMode, onViewModeChange, onChatToggle }: MobileNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200
                    px-2 py-2 z-50 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = viewMode === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewModeChange(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg
                transition-all duration-150
                ${isActive
                  ? 'bg-coral-50 text-coral-600'
                  : 'text-gray-600'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={onChatToggle}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg
                   bg-coral-500 text-white"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-medium">AI</span>
        </button>
      </div>
    </nav>
  );
}
