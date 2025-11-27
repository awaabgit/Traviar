import { TripTab } from '../TripDashboard';

interface TripTabsProps {
  activeTab: TripTab;
  onTabChange: (tab: TripTab) => void;
}

export function TripTabs({ activeTab, onTabChange }: TripTabsProps) {
  const tabs: { id: TripTab; label: string }[] = [
    { id: 'plan', label: 'Plan' },
    { id: 'explorer', label: 'Explorer' },
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'essentials', label: 'Essentials' },
    { id: 'shared', label: 'Shared' },
  ];

  return (
    <div className="border-b border-gray-100">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{ animationDelay: `${index * 40}ms` }}
            className={`relative px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap animate-fade-in
                      rounded-t-xl transform hover:scale-105 active:scale-95 ${
              activeTab === tab.id
                ? 'text-white bg-gradient-sunset shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-sunset-soft'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
