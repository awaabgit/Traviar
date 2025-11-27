import { RightPanelMode } from '../types';
import { ChatPanel } from './ChatPanel';
import { MapView } from './MapView';

interface RightPanelProps {
  mode: RightPanelMode;
  isChatOpen: boolean;
  onChatClose: () => void;
}

const SAMPLE_LOCATIONS = [
  { id: '1', name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, type: 'attraction' as const },
  { id: '2', name: 'Le Comptoir', lat: 48.8566, lng: 2.3522, type: 'restaurant' as const },
  { id: '3', name: 'Louvre Museum', lat: 48.8606, lng: 2.3376, type: 'attraction' as const },
];

export function RightPanel({ mode, isChatOpen, onChatClose }: RightPanelProps) {
  return (
    <aside className="hidden lg:block relative w-96 bg-white">
      <div className={`h-full transition-all duration-300 ${isChatOpen ? 'blur-sm' : ''}`}>
        {mode === 'map' && (
          <div className="h-full p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
              <MapView
                locations={SAMPLE_LOCATIONS}
                center={[48.8584, 2.2945]}
                zoom={13}
              />
            </div>
          </div>
        )}
      </div>

      {isChatOpen && (
        <div className="absolute inset-0 bg-white animate-slide-in-right">
          <ChatPanel onClose={onChatClose} />
        </div>
      )}
    </aside>
  );
}
