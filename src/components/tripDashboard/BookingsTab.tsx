import { useState } from 'react';
import { Plane, Hotel, Ticket, Utensils, FileText, ChevronDown, ChevronUp, MapPin, Copy, QrCode, CheckCircle, Clock } from 'lucide-react';

export function BookingsTab() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['flights', 'hotels']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    { id: 'flights', label: 'Flights', icon: Plane, count: 2, color: 'blue' },
    { id: 'hotels', label: 'Hotels', icon: Hotel, count: 3, color: 'green' },
    { id: 'activities', label: 'Activities & Tickets', icon: Ticket, count: 5, color: 'purple' },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, count: 4, color: 'orange' },
    { id: 'receipts', label: 'Uploaded Receipts', icon: FileText, count: 8, color: 'gray' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isExpanded = expandedSections.has(section.id);

        return (
          <div
            key={section.id}
            style={{ animationDelay: `${index * 75}ms` }}
            className="bg-white rounded-[18px] shadow-soft border border-gray-100 overflow-hidden
                     hover:shadow-soft-lg transition-all duration-300 animate-slide-up-fade"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50
                       transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${getColorClasses(section.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">{section.label}</h3>
                  <p className="text-sm text-gray-500">{section.count} {section.count === 1 ? 'booking' : 'bookings'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">
                  {isExpanded ? 'Collapse' : 'Expand'}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="px-6 pb-6 animate-slide-in-down">
                <div className="space-y-4">
                  {section.id === 'flights' && <FlightsSection />}
                  {section.id === 'hotels' && <HotelsSection />}
                  {section.id === 'activities' && <ActivitiesSection />}
                  {section.id === 'restaurants' && <RestaurantsSection />}
                  {section.id === 'receipts' && <ReceiptsSection />}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getColorClasses(color: string) {
  const classes = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    gray: 'bg-gray-100 text-gray-600',
  };
  return classes[color as keyof typeof classes] || classes.gray;
}

function FlightsSection() {
  const flights = [
    {
      id: '1',
      airline: 'Air France',
      from: 'JFK',
      to: 'CDG',
      date: 'Mar 15, 2024',
      time: '8:30 PM - 10:15 AM+1',
      confirmation: 'AF123456',
      status: 'confirmed',
      seat: '12A',
    },
    {
      id: '2',
      airline: 'Air France',
      from: 'CDG',
      to: 'JFK',
      date: 'Mar 22, 2024',
      time: '11:00 AM - 1:45 PM',
      confirmation: 'AF789012',
      status: 'confirmed',
      seat: '15C',
    },
  ];

  return (
    <>
      {flights.map((flight, index) => (
        <BookingCard
          key={flight.id}
          delay={index * 50}
          icon={<Plane className="w-5 h-5" />}
          title={`${flight.from} → ${flight.to}`}
          subtitle={flight.airline}
          details={[
            { label: 'Date', value: flight.date },
            { label: 'Time', value: flight.time },
            { label: 'Seat', value: flight.seat },
          ]}
          confirmation={flight.confirmation}
          status={flight.status}
        />
      ))}
    </>
  );
}

function HotelsSection() {
  const hotels = [
    {
      id: '1',
      name: 'Hotel Le Marais',
      location: 'Paris, France',
      checkIn: 'Mar 15, 2024',
      checkOut: 'Mar 18, 2024',
      room: 'Deluxe Double Room',
      confirmation: 'HTL987654',
      status: 'confirmed',
    },
    {
      id: '2',
      name: 'Boutique Hotel Seine',
      location: 'Paris, France',
      checkIn: 'Mar 18, 2024',
      checkOut: 'Mar 22, 2024',
      room: 'Superior King Room',
      confirmation: 'HTL456789',
      status: 'confirmed',
    },
  ];

  return (
    <>
      {hotels.map((hotel, index) => (
        <BookingCard
          key={hotel.id}
          delay={index * 50}
          icon={<Hotel className="w-5 h-5" />}
          title={hotel.name}
          subtitle={hotel.location}
          details={[
            { label: 'Check-in', value: hotel.checkIn },
            { label: 'Check-out', value: hotel.checkOut },
            { label: 'Room', value: hotel.room },
          ]}
          confirmation={hotel.confirmation}
          status={hotel.status}
        />
      ))}
    </>
  );
}

function ActivitiesSection() {
  const activities = [
    {
      id: '1',
      name: 'Eiffel Tower Summit Access',
      date: 'Mar 16, 2024',
      time: '10:00 AM',
      tickets: 2,
      confirmation: 'TKT123456',
      status: 'confirmed',
    },
    {
      id: '2',
      name: 'Louvre Museum Tour',
      date: 'Mar 17, 2024',
      time: '2:00 PM',
      tickets: 2,
      confirmation: 'TKT789012',
      status: 'confirmed',
    },
  ];

  return (
    <>
      {activities.map((activity, index) => (
        <BookingCard
          key={activity.id}
          delay={index * 50}
          icon={<Ticket className="w-5 h-5" />}
          title={activity.name}
          subtitle={`${activity.tickets} ${activity.tickets === 1 ? 'ticket' : 'tickets'}`}
          details={[
            { label: 'Date', value: activity.date },
            { label: 'Time', value: activity.time },
          ]}
          confirmation={activity.confirmation}
          status={activity.status}
        />
      ))}
    </>
  );
}

function RestaurantsSection() {
  const restaurants = [
    {
      id: '1',
      name: 'Le Comptoir du Relais',
      date: 'Mar 16, 2024',
      time: '7:30 PM',
      party: 2,
      confirmation: 'RST123456',
      status: 'confirmed',
    },
    {
      id: '2',
      name: 'Septime',
      date: 'Mar 19, 2024',
      time: '8:00 PM',
      party: 2,
      confirmation: 'RST789012',
      status: 'pending',
    },
  ];

  return (
    <>
      {restaurants.map((restaurant, index) => (
        <BookingCard
          key={restaurant.id}
          delay={index * 50}
          icon={<Utensils className="w-5 h-5" />}
          title={restaurant.name}
          subtitle={`Party of ${restaurant.party}`}
          details={[
            { label: 'Date', value: restaurant.date },
            { label: 'Time', value: restaurant.time },
          ]}
          confirmation={restaurant.confirmation}
          status={restaurant.status}
        />
      ))}
    </>
  );
}

function ReceiptsSection() {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p className="text-sm text-gray-600 mb-4">Upload your booking confirmations and receipts</p>
      <button
        className="px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium
                 transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        Upload Files
      </button>
    </div>
  );
}

interface BookingCardProps {
  delay: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
  confirmation: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

function BookingCard({ delay, icon, title, subtitle, details, confirmation, status }: BookingCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(confirmation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: Clock },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="p-5 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md
               transition-all duration-200 animate-slide-up-fade group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg}`}>
          <StatusIcon className={`w-3.5 h-3.5 ${config.text}`} />
          <span className={`text-xs font-medium ${config.text} capitalize`}>{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {details.map((detail) => (
          <div key={detail.label}>
            <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
            <p className="text-sm font-medium text-gray-900">{detail.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Confirmation:</span>
          <span className="text-sm font-mono font-medium text-gray-900">{confirmation}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200
                     transform hover:scale-110 active:scale-95"
            title="Copy confirmation code"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200
                     hover:border-gray-300 hover:bg-gray-50 text-sm text-gray-700
                     transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5" />
            Map
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200
                     hover:border-gray-300 hover:bg-gray-50 text-sm text-gray-700
                     transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5" />
            QR
          </button>
        </div>
      </div>
    </div>
  );
}
