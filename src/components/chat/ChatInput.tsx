import { Send, Paperclip, Mic, Smile, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttachment?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onAttachment,
  placeholder = 'Type your message...',
  disabled = false
}: ChatInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachment) {
      onAttachment(file);
    }
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    autoResize();
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300
                     focus:outline-none focus:border-coral-500
                     text-sm text-gray-900 placeholder-gray-500 resize-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Paperclip className="w-4 h-4 text-gray-500" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="image/*,video/*"
              className="hidden"
            />
          </div>
        </div>

        {value.trim() ? (
          <button
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className="p-3 rounded-xl bg-coral-500 hover:bg-coral-600
                     text-white disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 hover:shadow-md flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsRecording(!isRecording)}
            disabled={disabled}
            className={`p-3 rounded-xl transition-all duration-200 flex-shrink-0
                      ${isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>

      {isRecording && (
        <div className="mt-3 flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-red-900">Recording...</span>
          </div>
          <button
            onClick={() => setIsRecording(false)}
            className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
}
