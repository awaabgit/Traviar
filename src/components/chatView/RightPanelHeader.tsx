export type ChatRightPanelMode = 'discover' | 'map' | 'trip';

interface RightPanelHeaderProps {
  mode: ChatRightPanelMode;
  onModeChange: (mode: ChatRightPanelMode) => void;
}

const TABS: { id: ChatRightPanelMode; label: string }[] = [
  { id: 'discover', label: 'Discover' },
  { id: 'map', label: 'Map' },
  { id: 'trip', label: 'Trip sheet' },
];

export function RightPanelHeader({ mode, onModeChange }: RightPanelHeaderProps) {
  return (
    <div className="sticky top-0 bg-gray-50 z-10 px-6 py-5 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">For You</h2>
          <p className="text-sm text-gray-600 mt-0.5">Personalized travel tools</p>
        </div>

        <div
          className="flex items-center rounded-full border border-gray-300 p-1 bg-white shadow-sm"
          role="tablist"
          aria-label="Panel mode selector"
        >
          {TABS.map((tab) => {
            const isActive = mode === tab.id;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onModeChange(tab.id)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-200
                  min-w-[70px] text-center
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2
                  ${isActive
                    ? 'bg-coral-500 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
