import { X } from 'lucide-react';
import { useState } from 'react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

export interface FilterValues {
  priceRange: [number, number];
  duration: string[];
  vibeTags: string[];
  budgetLevel: string[];
  destinationType: string[];
}

const DURATION_OPTIONS = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
const VIBE_TAGS = ['Romantic', 'Adventure', 'Cultural', 'Wellness', 'Luxury', 'Budget', 'Family', 'Solo', 'Foodie', 'Nature'];
const BUDGET_LEVELS = ['Budget ($)', 'Moderate ($$)', 'Luxury ($$$)', 'Ultra-luxury ($$$$)'];
const DESTINATION_TYPES = ['Beach', 'Urban', 'Mountain', 'Desert', 'Island', 'Countryside'];

export function FiltersModal({ isOpen, onClose, onApply }: FiltersModalProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [duration, setDuration] = useState<string[]>([]);
  const [vibeTags, setVibeTags] = useState<string[]>([]);
  const [budgetLevel, setBudgetLevel] = useState<string[]>([]);
  const [destinationType, setDestinationType] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggle = (value: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter(item => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleApply = () => {
    onApply({
      priceRange,
      duration,
      vibeTags,
      budgetLevel,
      destinationType
    });
    onClose();
  };

  const handleClear = () => {
    setPriceRange([0, 2000]);
    setDuration([]);
    setVibeTags([]);
    setBudgetLevel([]);
    setDestinationType([]);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-1 block">Min</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-600 mb-1 block">Max</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-100"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-coral-500"
              />
              <p className="text-sm text-gray-600">
                ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Duration</h3>
            <div className="grid grid-cols-2 gap-2">
              {DURATION_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => handleToggle(option, duration, setDuration)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm border-2 transition-all duration-200 ${
                    duration.includes(option)
                      ? 'border-coral-500 bg-coral-50 text-coral-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vibe & Style</h3>
            <div className="flex flex-wrap gap-2">
              {VIBE_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleToggle(tag, vibeTags, setVibeTags)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                    vibeTags.includes(tag)
                      ? 'bg-coral-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Level</h3>
            <div className="grid grid-cols-2 gap-2">
              {BUDGET_LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => handleToggle(level, budgetLevel, setBudgetLevel)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm border-2 transition-all duration-200 ${
                    budgetLevel.includes(level)
                      ? 'border-coral-500 bg-coral-50 text-coral-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Destination Type</h3>
            <div className="flex flex-wrap gap-2">
              {DESTINATION_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => handleToggle(type, destinationType, setDestinationType)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    destinationType.includes(type)
                      ? 'bg-coral-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700
                     border border-gray-300 hover:bg-gray-50
                     transition-all duration-200"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-white
                     bg-coral-500 hover:bg-coral-600 shadow-md hover:shadow-lg
                     transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
