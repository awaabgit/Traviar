import { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { CreatorGrid } from './chat/CreatorGrid';
import { ConversationView } from './chat/ConversationView';
import { ConversationHistory } from './chat/ConversationHistory';
import { useChatData } from '../hooks/useChatData';

interface ChatPanelProps {
  onClose: () => void;
}

type ViewMode = 'creators' | 'conversation' | 'history';

interface Creator {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  specialties: string[];
  rating: number;
  total_chats: number;
  response_time: string;
  is_online: boolean;
  verified: boolean;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('creators');
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const userId = 'demo-user-id';
  const {
    creators,
    conversations,
    messages,
    loading,
    fetchMessages,
    createConversation,
    sendMessage,
  } = useChatData(userId);

  const handleSelectCreator = async (creator: Creator) => {
    setSelectedCreator(creator);

    const existingConv = conversations.find(c => c.creator_id === creator.id);

    if (existingConv) {
      setSelectedConversationId(existingConv.id);
      await fetchMessages(existingConv.id);
    } else {
      const newConv = await createConversation(creator.id);
      if (newConv) {
        setSelectedConversationId(newConv.id);
        await fetchMessages(newConv.id);
      }
    }

    setViewMode('conversation');
  };

  const handleSelectConversation = async (conversationId: string) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const creator = creators.find(c => c.id === conv.creator_id);
    if (creator) {
      setSelectedCreator(creator);
    }

    setSelectedConversationId(conversationId);
    await fetchMessages(conversationId);
    setViewMode('conversation');
    setShowHistory(false);
  };

  const handleSendMessage = async (content: string) => {
    if (selectedConversationId) {
      await sendMessage(selectedConversationId, content);
    }
  };

  const handleBack = () => {
    if (viewMode === 'conversation') {
      setViewMode('creators');
      setSelectedCreator(null);
      setSelectedConversationId(null);
    }
  };

  const handleNewChat = () => {
    setViewMode('creators');
    setSelectedCreator(null);
    setSelectedConversationId(null);
    setShowHistory(false);
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="h-full flex bg-white">
      {showHistory && conversations.length > 0 && (
        <div className="w-80 flex-shrink-0">
          <ConversationHistory
            conversations={conversations}
            selectedConversationId={selectedConversationId || undefined}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          {viewMode === 'conversation' && (
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {viewMode === 'creators' ? 'Choose a Creator' : selectedCreator?.name || 'Chat'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {conversations.length > 0 && (
              <button
                onClick={handleToggleHistory}
                className="px-3 py-1.5 text-sm font-medium rounded-lg
                         bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                {showHistory ? 'Hide' : 'History'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-coral-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : viewMode === 'creators' ? (
            <CreatorGrid
              creators={creators}
              onSelectCreator={handleSelectCreator}
              selectedCreatorId={selectedCreator?.id}
            />
          ) : viewMode === 'conversation' && selectedCreator ? (
            <ConversationView
              creator={selectedCreator}
              messages={messages}
              onBack={handleBack}
              onSendMessage={handleSendMessage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
