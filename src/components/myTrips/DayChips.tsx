interface DayChipsProps {
  totalDays: number;
  currentDay?: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function DayChips({ totalDays, currentDay, selectedDay, onSelectDay }: DayChipsProps) {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {days.map((day) => {
        const isToday = currentDay === day;
        const isSelected = selectedDay === day;

        return (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`
              flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm
              transition-all duration-200 whitespace-nowrap
              ${isSelected
                ? 'bg-black text-white shadow-md'
                : isToday
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Day {day}
            {isToday && ' (Today)'}
          </button>
        );
      })}
    </div>
  );
}
