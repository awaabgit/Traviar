import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface RenameModalProps {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}

export function RenameModal({ isOpen, currentName, onClose, onConfirm }: RenameModalProps) {
  const [newName, setNewName] = useState(currentName);

  useEffect(() => {
    setNewName(currentName);
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onConfirm(newName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-soft-xl max-w-md w-full p-6 animate-slide-in-right">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Rename Trip</h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="tripName" className="block text-sm font-medium text-gray-700 mb-2">
              Trip Name
            </label>
            <input
              id="tripName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-coral-500
                       focus:ring-2 focus:ring-coral-100 outline-none transition-all"
              placeholder="Enter trip name"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700
                       hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newName.trim()}
              className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                       text-white font-medium transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface DeleteModalProps {
  isOpen: boolean;
  tripName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ isOpen, tripName, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-soft-xl max-w-md w-full p-6 animate-slide-in-right">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Trip</h3>
            <p className="text-gray-600 text-sm">
              Are you sure you want to delete <span className="font-semibold">"{tripName}"</span>?
              This action cannot be undone and all trip data will be permanently removed.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700
                     hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700
                     text-white font-medium transition-colors"
          >
            Delete Trip
          </button>
        </div>
      </div>
    </div>
  );
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className={`
        px-6 py-4 rounded-lg shadow-soft-xl flex items-center gap-3 min-w-[300px]
        ${type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
      `}>
        <div className={`
          w-2 h-2 rounded-full
          ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        `} />
        <p className={`
          text-sm font-medium
          ${type === 'success' ? 'text-green-900' : 'text-red-900'}
        `}>
          {message}
        </p>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded hover:bg-white/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
