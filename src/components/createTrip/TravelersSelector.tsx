import { useState } from 'react';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';

interface TravelersSelectorProps {
  travelers: number;
  onTravelersChange: (count: number) => void;
}

const presets = [
  { value: 1, label: 'Solo' },
  { value: 2, label: 'Couple' },
  { value: 4, label: 'Family' },
  { value: 6, label: 'Group' },
];

export function TravelersSelector({ travelers, onTravelersChange }: TravelersSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [customMode, setCustomMode] = useState(false);

  const handlePresetSelect = (value: number) => {
    onTravelersChange(value);
    setCustomMode(false);
    setShowDropdown(false);
  };

  const handleCustom = () => {
    setCustomMode(true);
  };

  const increment = () => {
    if (travelers < 50) {
      onTravelersChange(travelers + 1);
    }
  };

  const decrement = () => {
    if (travelers > 1) {
      onTravelersChange(travelers - 1);
    }
  };

  const getDisplayLabel = () => {
    if (customMode) {
      return `${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}`;
    }
    const preset = presets.find(p => p.value === travelers);
    return preset ? preset.label : `${travelers} travelers`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-left
                 hover:border-gray-400 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">{getDisplayLabel()}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-soft-lg border border-gray-200 py-2 z-20">
            {presets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handlePresetSelect(preset.value)}
                className={`
                  w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition-colors
                  ${travelers === preset.value && !customMode ? 'bg-coral-50 text-coral-600 font-medium' : 'text-gray-700'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{preset.label}</span>
                  <span className="text-xs text-gray-500">{preset.value} {preset.value === 1 ? 'person' : 'people'}</span>
                </div>
              </button>
            ))}

            <div className="border-t border-gray-200 mt-2 pt-2 px-4">
              <button
                type="button"
                onClick={handleCustom}
                className="w-full text-left text-sm text-coral-600 hover:text-coral-700 font-medium py-2"
              >
                Custom
              </button>

              {customMode && (
                <div className="flex items-center justify-between mt-2 pb-2">
                  <button
                    type="button"
                    onClick={decrement}
                    disabled={travelers <= 1}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="text-sm font-medium text-gray-900">
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={increment}
                    disabled={travelers >= 50}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
