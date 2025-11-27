import { useState } from 'react';
import { X, Calendar, Clock, Tag } from 'lucide-react';

interface AddToDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dayId: string, time: string, category: string) => void;
  tripDays: {
    id: string;
    dayNumber: number;
    title: string;
    date: string;
  }[];
}

const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening', 'All-day'];
const CATEGORIES = ['Food', 'Sightseeing', 'Activity', 'Shopping', 'Nightlife', 'Transport'];

export function AddToDayModal({ isOpen, onClose, onConfirm, tripDays }: AddToDayModalProps) {
  const [selectedDay, setSelectedDay] = useState(tripDays[0]?.id || '');
  const [selectedTime, setSelectedTime] = useState('Morning');
  const [selectedCategory, setSelectedCategory] = useState('Sightseeing');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedDay, selectedTime, selectedCategory);
    onClose();
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl
                   animate-scale-in overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Add to Trip</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-900">
                Select Day
              </label>
            </div>
            <div className="space-y-2">
              {tripDays.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl
                           border-2 transition-all duration-200 text-left ${
                             selectedDay === day.id
                               ? 'border-coral-500 bg-coral-50'
                               : 'border-gray-200 hover:border-gray-300 bg-white'
                           }`}
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      Day {day.dayNumber}
                      {day.title && ` • ${day.title}`}
                    </div>
                    <div className="text-sm text-gray-600">{formatDate(day.date)}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedDay === day.id
                        ? 'border-coral-500 bg-coral-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedDay === day.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-900">
                Time of Day
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm
                           border-2 transition-all duration-200 ${
                             selectedTime === slot
                               ? 'border-coral-500 bg-coral-50 text-coral-700'
                               : 'border-gray-200 hover:border-gray-300 text-gray-700'
                           }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-semibold text-gray-900">
                Category
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium text-sm
                           transition-all duration-200 transform hover:scale-105 ${
                             selectedCategory === category
                               ? 'bg-coral-500 text-white shadow-md'
                               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                           }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700
                     border border-gray-300 hover:bg-gray-50
                     transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-white
                     bg-coral-500 hover:bg-coral-600 shadow-md hover:shadow-lg
                     transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
