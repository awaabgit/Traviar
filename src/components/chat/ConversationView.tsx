import { ArrowLeft, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MessageBubble, SuggestedReplies } from './MessageBubble';
import { ChatInput } from './ChatInput';

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

interface Message {
  id: string;
  sender_type: 'user' | 'creator';
  content: string;
  created_at: string;
  is_read: boolean;
  media_url?: string;
  media_type?: string;
}

interface ConversationViewProps {
  creator: Creator;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (content: string) => void;
  onAttachment?: (file: File) => void;
  isLoading?: boolean;
}

export function ConversationView({
  creator,
  messages,
  onBack,
  onSendMessage,
  onAttachment,
  isLoading = false
}: ConversationViewProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');

      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleSuggestedReply = (text: string) => {
    setInputValue(text);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="relative flex-shrink-0">
            <img
              src={creator.avatar_url}
              alt={creator.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {creator.is_online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{creator.name}</h3>
            <p className="text-xs text-gray-600">
              {creator.is_online ? 'Online' : `Replies in ${creator.response_time}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Info className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
      >
        {messages.length === 0 && (
          <div className="text-center py-12">
            <img
              src={creator.avatar_url}
              alt={creator.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Start chatting with {creator.name}
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              {creator.bio}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {creator.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium bg-white border border-gray-200 text-gray-700 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const showAvatar = index === 0 ||
            messages[index - 1]?.sender_type !== message.sender_type;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              creatorAvatar={creator.avatar_url}
              creatorName={creator.name}
              showAvatar={showAvatar}
            />
          );
        })}

        {isTyping && (
          <div className="flex gap-3">
            <img
              src={creator.avatar_url}
              alt={creator.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-gray-100 rounded-bl-sm">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="pt-4">
            <SuggestedReplies onSelect={handleSuggestedReply} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onAttachment={onAttachment}
        placeholder={`Message ${creator.name}...`}
        disabled={isLoading}
      />
    </div>
  );
}
