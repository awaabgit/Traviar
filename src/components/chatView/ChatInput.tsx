import { Paperclip, Mic, Send, HelpCircle } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onTogglePrompts: () => void;
  showPrompts: boolean;
}

export function ChatInput({ value, onChange, onSend, onTogglePrompts, showPrompts }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything... or paste a TikTok link"
              rows={1}
              className="w-full px-6 py-4 pr-32 rounded-full border-2 border-gray-200
                       focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500
                       text-base text-gray-900 placeholder-gray-400
                       resize-none transition-all duration-300
                       shadow-sm hover:border-gray-300"
              style={{ minHeight: '56px', maxHeight: '160px' }}
            />

            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                title="Attach file"
              >
                <Paperclip className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                title="Voice input"
              >
                <Mic className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                onClick={onSend}
                disabled={!value.trim()}
                className="p-2 rounded-full bg-gradient-sunset
                         text-white disabled:opacity-40 disabled:cursor-not-allowed
                         transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <button
            onClick={onTogglePrompts}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600
                     transition-colors group font-medium"
          >
            <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-medium">
              {showPrompts ? 'Hide prompts' : 'What can I ask Traviar?'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
