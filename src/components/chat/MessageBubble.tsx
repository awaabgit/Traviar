import { Check, CheckCheck, MapPin, Calendar, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  sender_type: 'user' | 'creator';
  content: string;
  created_at: string;
  is_read: boolean;
  media_url?: string;
  media_type?: string;
}

interface MessageBubbleProps {
  message: Message;
  creatorAvatar?: string;
  creatorName?: string;
  showAvatar?: boolean;
}

export function MessageBubble({
  message,
  creatorAvatar,
  creatorName,
  showAvatar = true
}: MessageBubbleProps) {
  const isUser = message.sender_type === 'user';
  const time = new Date(message.created_at).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {showAvatar && !isUser && (
        <img
          src={creatorAvatar}
          alt={creatorName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      )}
      {showAvatar && !isUser && !creatorAvatar && (
        <div className="w-8 h-8 rounded-full bg-coral-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {creatorName?.[0] || 'C'}
          </span>
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        {!isUser && showAvatar && (
          <span className="text-xs font-medium text-gray-600 mb-1">{creatorName}</span>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? 'bg-coral-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          {message.media_url && (
            <div className="mb-2">
              {message.media_type === 'image' && (
                <img
                  src={message.media_url}
                  alt="Attached"
                  className="rounded-lg max-w-full h-auto"
                />
              )}
            </div>
          )}

          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        <div className={`flex items-center gap-1 mt-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-gray-500">{time}</span>
          {isUser && (
            <div>
              {message.is_read ? (
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              ) : (
                <Check className="w-3.5 h-3.5 text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuickReplyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function QuickReplyCard({ icon, title, description, onClick }: QuickReplyCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-white
               hover:border-coral-400 hover:shadow-md transition-all duration-200 text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-coral-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 mb-0.5">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}

interface SuggestedRepliesProps {
  onSelect: (text: string) => void;
}

export function SuggestedReplies({ onSelect }: SuggestedRepliesProps) {
  const suggestions = [
    {
      icon: <MapPin className="w-5 h-5 text-coral-500" />,
      title: 'Find Places',
      description: 'Discover restaurants and attractions',
      text: 'Can you suggest some must-visit places?',
    },
    {
      icon: <Calendar className="w-5 h-5 text-coral-500" />,
      title: 'Optimize Itinerary',
      description: 'Improve your daily schedule',
      text: 'Help me optimize my itinerary',
    },
    {
      icon: <DollarSign className="w-5 h-5 text-coral-500" />,
      title: 'Budget Tips',
      description: 'Save money on your trip',
      text: 'What are some budget-friendly tips?',
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">
        Suggested Questions
      </p>
      {suggestions.map((suggestion, idx) => (
        <QuickReplyCard
          key={idx}
          icon={suggestion.icon}
          title={suggestion.title}
          description={suggestion.description}
          onClick={() => onSelect(suggestion.text)}
        />
      ))}
    </div>
  );
}
