import { Search, Plus, Archive, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface Conversation {
  id: string;
  creator_id: string;
  creator_name: string;
  creator_avatar: string;
  title: string;
  last_message: string;
  last_message_at: string;
  is_archived: boolean;
  unread_count: number;
}

interface ConversationHistoryProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export function ConversationHistory({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onNewChat
}: ConversationHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch =
      conv.creator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArchived = showArchived ? conv.is_archived : !conv.is_archived;
    return matchesSearch && matchesArchived;
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
          <button
            onClick={onNewChat}
            className="p-2 rounded-lg bg-coral-500 hover:bg-coral-600
                     text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300
                     focus:outline-none focus:border-coral-500
                     text-sm text-gray-900 placeholder-gray-500"
          />
        </div>

        <button
          onClick={() => setShowArchived(!showArchived)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Archive className="w-4 h-4" />
          <span>{showArchived ? 'Show Active' : 'Show Archived'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-sm">No conversations found</p>
          </div>
        )}

        {filteredConversations.map(conversation => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full flex items-start gap-3 p-4 border-b border-gray-100
                      hover:bg-gray-50 transition-colors text-left
                      ${selectedConversationId === conversation.id ? 'bg-coral-50' : ''}`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={conversation.creator_avatar}
                alt={conversation.creator_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.unread_count > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 rounded-full
                              flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {conversation.unread_count}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {conversation.creator_name}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {getTimeAgo(conversation.last_message_at)}
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-0.5 truncate">
                {conversation.title}
              </p>

              <p className={`text-sm truncate ${
                conversation.unread_count > 0
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600'
              }`}>
                {conversation.last_message}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
