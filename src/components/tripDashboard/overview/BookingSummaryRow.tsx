import { Plane, Hotel, Ticket, Utensils } from 'lucide-react';

interface BookingSummaryRowProps {
  tripId: string;
}

export function BookingSummaryRow({ tripId }: BookingSummaryRowProps) {
  const bookings = [
    { icon: Plane, label: 'Flights', count: 2, color: 'blue' },
    { icon: Hotel, label: 'Hotels', count: 3, color: 'green' },
    { icon: Ticket, label: 'Activities', count: 8, color: 'purple' },
    { icon: Utensils, label: 'Restaurants', count: 5, color: 'orange' },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6
                    hover:shadow-soft-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Bookings Summary</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {bookings.map((booking, index) => {
          const Icon = booking.icon;
          const colorClass = colorClasses[booking.color as keyof typeof colorClasses];

          return (
            <div
              key={booking.label}
              style={{ animationDelay: `${index * 75}ms` }}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-200
                       hover:border-gray-300 hover:shadow-md transition-all duration-200
                       cursor-pointer animate-slide-up-fade transform hover:scale-105"
            >
              <div className={`p-3 rounded-xl ${colorClass}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{booking.count}</div>
                <div className="text-sm text-gray-600">{booking.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
