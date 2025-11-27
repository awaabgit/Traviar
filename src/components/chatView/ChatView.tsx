import { useState } from 'react';
import { HeroChatBanner } from './HeroChatBanner';
import { PromptCarousel } from './PromptCarousel';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { ChatRightPanel } from './ChatRightPanel';
import { ChatRightPanelMode } from './RightPanelHeader';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [rightPanelMode, setRightPanelMode] = useState<ChatRightPanelMode>('discover');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Great choice! I'd love to help you plan that. Let me put together some amazing recommendations for your trip...",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handlePromptSelect = (prompt: string) => {
    setInputValue(prompt);
    setShowPrompts(false);
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && (
            <div className="animate-fade-in">
              <HeroChatBanner />
              <div className="px-8 py-6">
                <PromptCarousel onSelectPrompt={handlePromptSelect} />
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="px-8 py-6">
              <ChatMessages messages={messages} isTyping={isTyping} />
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-white">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            onTogglePrompts={() => setShowPrompts(!showPrompts)}
            showPrompts={showPrompts}
          />
          {showPrompts && (
            <div className="border-t border-gray-100 px-8 py-4 max-h-80 overflow-y-auto animate-slide-down">
              <PromptCarousel onSelectPrompt={handlePromptSelect} />
            </div>
          )}
        </div>
      </div>

      <ChatRightPanel mode={rightPanelMode} onModeChange={setRightPanelMode} />
    </div>
  );
}
