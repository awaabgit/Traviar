import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 animate-slide-up ${
            message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                          ${message.role === 'user' ? 'bg-coral-500' : 'bg-gray-100'}`}>
            {message.role === 'user' ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-gray-600" />
            )}
          </div>

          <div className={`flex-1 ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
            <div
              className={`max-w-2xl px-5 py-3.5 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-coral-500 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Attached content"
                  className="rounded-lg mb-3 max-w-full"
                />
              )}
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>

            <span className={`text-xs text-gray-500 mt-1.5 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}>
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-4 animate-slide-up">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-gray-600" />
          </div>

          <div className="flex-1">
            <div className="max-w-2xl px-5 py-4 rounded-2xl bg-gray-100 rounded-bl-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
