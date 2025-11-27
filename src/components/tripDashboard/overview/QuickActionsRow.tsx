import { Sparkles, FileDown, Share2, Copy } from 'lucide-react';

interface QuickActionsRowProps {
  tripId: string;
}

export function QuickActionsRow({ tripId }: QuickActionsRowProps) {
  const actions = [
    { icon: Sparkles, label: 'Regenerate Trip', color: 'coral' },
    { icon: FileDown, label: 'Export PDF', color: 'gray' },
    { icon: Share2, label: 'Share Trip', color: 'gray' },
    { icon: Copy, label: 'Duplicate Trip', color: 'gray' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isHighlighted = action.color === 'coral';

        return (
          <button
            key={action.label}
            style={{ animationDelay: `${index * 75}ms` }}
            className={`flex flex-col items-center gap-3 p-6 rounded-[18px] border
                     transition-all duration-200 transform hover:scale-105 active:scale-95
                     animate-slide-up-fade ${
                       isHighlighted
                         ? 'bg-coral-50 border-coral-200 hover:bg-coral-100 hover:shadow-md'
                         : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-soft-lg'
                     }`}
          >
            <div
              className={`p-3 rounded-xl transition-transform duration-200 ${
                isHighlighted ? 'bg-coral-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span
              className={`text-sm font-medium text-center ${
                isHighlighted ? 'text-coral-900' : 'text-gray-700'
              }`}
            >
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
