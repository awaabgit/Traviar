import { FileText, Video, Layers, Info } from 'lucide-react';

export type ProfileTab = 'itineraries' | 'videos' | 'collections' | 'about';

interface ProfileTabBarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const tabs = [
  { id: 'itineraries' as ProfileTab, label: 'Itineraries', icon: FileText },
  { id: 'videos' as ProfileTab, label: 'Videos', icon: Video },
  { id: 'collections' as ProfileTab, label: 'Collections', icon: Layers },
  { id: 'about' as ProfileTab, label: 'About', icon: Info },
];

export function ProfileTabBar({ activeTab, onTabChange }: ProfileTabBarProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm
                         border-b-2 transition-all duration-200 ${
                           isActive
                             ? 'border-coral-500 text-coral-600'
                             : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                         }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
