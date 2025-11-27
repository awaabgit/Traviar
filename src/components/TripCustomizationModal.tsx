import { useState } from 'react';
import { X, Calendar, MapPin, Clock } from 'lucide-react';

interface TripCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: TripCustomizationData) => void;
}

export interface TripCustomizationData {
  destination: string;
  startDate: string;
  endDate: string;
  tripName: string;
}

export function TripCustomizationModal({ isOpen, onClose, onSave }: TripCustomizationModalProps) {
  const [tripName, setTripName] = useState('My Trip');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.({
      destination,
      startDate,
      endDate,
      tripName,
    });
    onClose();
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff + 1;
  };

  const duration = calculateDuration();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-slide-in-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Customize Your Trip</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Name
            </label>
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g., Summer in Paris"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                       focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900
                       text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, France"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                       focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900
                       text-gray-900 placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                         focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900
                         text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300
                         focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900
                         text-gray-900"
              />
            </div>
          </div>

          {duration > 0 && (
            <div className="flex items-center gap-2 p-4 bg-coral-50 rounded-lg border border-coral-200">
              <Clock className="w-5 h-5 text-coral-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Trip Duration: {duration} {duration === 1 ? 'day' : 'days'}
                </p>
                <p className="text-xs text-gray-600">
                  Your itinerary will be organized into {duration} days
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300
                     hover:bg-white text-gray-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!destination || !startDate || !endDate}
            className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                     text-white font-medium transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
