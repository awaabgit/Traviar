import { RightPanelHeader, ChatRightPanelMode } from './RightPanelHeader';
import { DiscoverPanel } from './DiscoverPanel';
import { MapPanel } from './MapPanel';
import { TripSheetPanel } from './TripSheetPanel';

interface ChatRightPanelProps {
  mode: ChatRightPanelMode;
  onModeChange: (mode: ChatRightPanelMode) => void;
}

export function ChatRightPanel({ mode, onModeChange }: ChatRightPanelProps) {
  return (
    <aside className="w-[420px] border-l border-gray-200 bg-gray-50 flex flex-col flex-shrink-0 h-full">
      <RightPanelHeader mode={mode} onModeChange={onModeChange} />

      {mode === 'discover' && <DiscoverPanel />}
      {mode === 'map' && <MapPanel />}
      {mode === 'trip' && <TripSheetPanel />}
    </aside>
  );
}
