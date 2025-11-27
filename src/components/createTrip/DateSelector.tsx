import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { ModernCalendar } from './ModernCalendar';

interface DateSelectorProps {
  dateMode: 'exact' | 'flexible';
  onDateModeChange: (mode: 'exact' | 'flexible') => void;
  exactDates: { startDate: string; endDate: string };
  onExactDatesChange: (dates: { startDate: string; endDate: string }) => void;
  flexibleDays: number;
  onFlexibleDaysChange: (days: number) => void;
  flexibleMonths: string[];
  onFlexibleMonthsChange: (months: string[]) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function DateSelector({
  dateMode,
  onDateModeChange,
  exactDates,
  onExactDatesChange,
  flexibleDays,
  onFlexibleDaysChange,
  flexibleMonths,
  onFlexibleMonthsChange,
}: DateSelectorProps) {
  const [showMonthsPicker, setShowMonthsPicker] = useState(false);

  const toggleMonth = (month: string) => {
    if (flexibleMonths.includes(month)) {
      onFlexibleMonthsChange(flexibleMonths.filter(m => m !== month));
    } else {
      onFlexibleMonthsChange([...flexibleMonths, month]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onDateModeChange('exact')}
          className={`
            flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
            ${
              dateMode === 'exact'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Exact Dates
        </button>
        <button
          type="button"
          onClick={() => onDateModeChange('flexible')}
          className={`
            flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200
            ${
              dateMode === 'flexible'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Flexible
        </button>
      </div>

      {dateMode === 'exact' ? (
        <ModernCalendar
          startDate={exactDates.startDate}
          endDate={exactDates.endDate}
          onStartDateChange={(date) => onExactDatesChange({ ...exactDates, startDate: date })}
          onEndDateChange={(date) => onExactDatesChange({ ...exactDates, endDate: date })}
        />
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of Days: {flexibleDays}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={flexibleDays}
              onChange={(e) => onFlexibleDaysChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-coral-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 day</span>
              <span>30 days</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowMonthsPicker(!showMonthsPicker)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-left
                       hover:border-gray-400 transition-colors flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">
                {flexibleMonths.length === 0
                  ? 'Select travel months (optional)'
                  : `${flexibleMonths.length} ${flexibleMonths.length === 1 ? 'month' : 'months'} selected`}
              </span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </button>

            {showMonthsPicker && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => toggleMonth(month)}
                      className={`
                        px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                        ${
                          flexibleMonths.includes(month)
                            ? 'bg-coral-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }
                      `}
                    >
                      {month.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
