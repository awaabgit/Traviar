import { X, Search, Send, MoreVertical } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  unread: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Sarah M.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
    message: 'Hi! I have a question about the Paris itinerary...',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    sender: 'Mike T.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80',
    message: 'Thanks for the Barcelona guide! It was amazing!',
    time: '5h ago',
    unread: true,
  },
  {
    id: '3',
    sender: 'Emma L.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80',
    message: 'Can you recommend some restaurants in Rome?',
    time: '1d ago',
    unread: false,
  },
];

interface MessagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessagesDrawer({ isOpen, onClose }: MessagesDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {MOCK_MESSAGES.map((message) => (
            <button
              key={message.id}
              className={`w-full flex gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left ${
                message.unread ? 'bg-coral-50/30' : ''
              }`}
            >
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-semibold ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                    {message.sender}
                  </p>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className={`text-sm truncate ${message.unread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  {message.message}
                </p>
              </div>
              {message.unread && (
                <div className="w-2 h-2 rounded-full bg-coral-500 flex-shrink-0 mt-2"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
            <button className="px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
