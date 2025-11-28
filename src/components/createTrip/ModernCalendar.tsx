import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ModernCalendarProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onDatesChange?: (startDate: string, endDate: string) => void; // Atomic update
}

export function ModernCalendar({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onDatesChange,
}: ModernCalendarProps) {
  // Debug: Log props at component render
  console.log('ModernCalendar render - startDate:', startDate, 'endDate:', endDate);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = startDate ? new Date(startDate) : new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Helper to update dates - uses atomic update if available, otherwise individual updates
  const updateDates = (newStart: string, newEnd: string) => {
    console.log('updateDates called:', { newStart, newEnd });
    if (onDatesChange) {
      // Atomic update - no stale closure issues
      onDatesChange(newStart, newEnd);
    } else {
      // Fallback to individual updates (may have stale closure issues)
      onStartDateChange(newStart);
      onEndDateChange(newEnd);
    }
  };

  const handleDateClick = (date: string) => {
    console.log('=== handleDateClick ===');
    console.log('Clicked date:', date);
    console.log('Current props - startDate:', startDate, 'endDate:', endDate);

    if (!startDate || (startDate && endDate)) {
      console.log('Action: Setting NEW start date to:', date, '(clearing end date)');
      updateDates(date, '');
    } else if (startDate && !endDate) {
      if (new Date(date) < new Date(startDate)) {
        console.log('Action: Selected date is before start, swapping');
        console.log('New start:', date, 'New end:', startDate);
        updateDates(date, startDate);
      } else {
        console.log('Action: Setting end date to:', date);
        updateDates(startDate, date);
      }
    }
    console.log('=== handleDateClick complete ===');
  };

  const isDateInRange = (date: string): boolean => {
    if (!startDate || !date) return false;
    const checkDate = new Date(date);
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : (hoverDate ? new Date(hoverDate) : null);

    if (!end) return false;
    const inRange = checkDate >= start && checkDate <= end;
    return inRange;
  };

  const isStartDate = (date: string): boolean => {
    const result = startDate === date;
    if (result) {
      console.log('isStartDate TRUE for:', date, '(startDate prop is:', startDate, ')');
    }
    return result;
  };

  const isEndDate = (date: string): boolean => {
    const result = endDate === date || (!endDate && hoverDate === date && !!startDate && new Date(date) > new Date(startDate));
    if (result) {
      console.log('isEndDate TRUE for:', date, '(endDate prop is:', endDate, ')');
    }
    return result;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const renderMonth = (monthOffset: number) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const days = getDaysInMonth(displayMonth);
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();

    return (
      <div className="flex-1 min-w-0">
        <div className="text-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dateStr = formatDate(year, month, day);
            const isStart = isStartDate(dateStr);
            const isEnd = isEndDate(dateStr);
            const inRange = isDateInRange(dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];

            // Fix: Create today's date properly and compare date strings
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(dateStr);
            selectedDate.setHours(0, 0, 0, 0);
            const isPast = selectedDate < today;

            // Debug: Log when we find a start or end date
            if (isStart || isEnd) {
              console.log('RENDERING selected date:', dateStr, '| isStart:', isStart, '| isEnd:', isEnd, '| inRange:', inRange);
            }

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDateClick(dateStr)}
                onMouseEnter={() => !isPast && setHoverDate(dateStr)}
                onMouseLeave={() => setHoverDate(null)}
                disabled={isPast}
                className={`
                  aspect-square relative flex items-center justify-center text-sm font-medium
                  transition-all duration-150
                  ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                  ${isStart || isEnd ? 'text-white z-10' : ''}
                  ${inRange && !isStart && !isEnd ? 'bg-coral-100 text-coral-900' : ''}
                  ${!inRange && !isStart && !isEnd && !isPast ? 'text-gray-700 hover:bg-gray-100' : ''}
                  ${isToday && !isStart && !isEnd ? 'font-bold text-coral-600' : ''}
                `}
              >
                {(isStart || isEnd) && (
                  <div className={`
                    absolute inset-0 bg-coral-500 z-[-1]
                    ${isStart && isEnd ? 'rounded-lg' : ''}
                    ${isStart && !isEnd ? 'rounded-l-lg' : ''}
                    ${isEnd && !isStart ? 'rounded-r-lg' : ''}
                  `} />
                )}
                {inRange && !isStart && !isEnd && (
                  <div className="absolute inset-0 bg-coral-100 z-[-1]" />
                )}
                <span className="relative z-10">{day}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">
            {startDate && (
              <>
                <span className="font-medium text-gray-900">
                  {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                {endDate && (
                  <>
                    <span className="mx-2">→</span>
                    <span className="font-medium text-gray-900">
                      {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex gap-6">
        {renderMonth(0)}
        {renderMonth(1)}
      </div>
    </div>
  );
}
