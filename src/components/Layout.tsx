import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { MobileNav } from './MobileNav';
import { ViewMode, RightPanelMode } from '../types';

interface LayoutProps {
  children: ReactNode;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onLoginClick?: () => void;
}

export function Layout({ children, viewMode, onViewModeChange, onLoginClick }: LayoutProps) {
  const [rightPanelMode, setRightPanelMode] = useState<RightPanelMode>('map');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setRightPanelMode(isChatOpen ? 'map' : 'chat');
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onChatToggle={handleChatToggle}
          onLoginClick={onLoginClick}
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {viewMode !== 'chat' && (
          <RightPanel
            mode={rightPanelMode}
            isChatOpen={isChatOpen}
            onChatClose={() => {
              setIsChatOpen(false);
              setRightPanelMode('map');
            }}
          />
        )}
      </div>

      <MobileNav
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onChatToggle={handleChatToggle}
      />
    </div>
  );
}
