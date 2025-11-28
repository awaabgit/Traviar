import { Plus } from 'lucide-react';

interface MyTripsHeaderProps {
  activeTab: 'upcoming' | 'in_progress' | 'past' | 'saved';
  onTabChange: (tab: 'upcoming' | 'in_progress' | 'past' | 'saved') => void;
  onCreateTrip: () => void;
}

export function MyTripsHeader({ activeTab, onTabChange, onCreateTrip }: MyTripsHeaderProps) {
  const tabs = [
    { id: 'upcoming' as const, label: 'Upcoming' },
    { id: 'in_progress' as const, label: 'In Progress' },
    { id: 'past' as const, label: 'Past Trips' },
    { id: 'saved' as const, label: 'Saved' },
  ];

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Trips</h1>

          <button
            onClick={onCreateTrip}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-sunset
                     text-white font-bold rounded-full transition-all duration-300
                     hover:shadow-lg hover:scale-105 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create Trip
          </button>
        </div>

        <div className="flex gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-6 py-3 font-semibold text-sm transition-all duration-300
                border-b-3 -mb-[3px] rounded-t-lg
                ${activeTab === tab.id
                  ? 'text-gray-900 border-orange-500 bg-gradient-sunset-soft'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
