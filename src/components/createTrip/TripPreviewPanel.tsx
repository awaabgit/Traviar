import { Calendar, Users, DollarSign, MapPin } from 'lucide-react';

interface Destination {
  name: string;
  country?: string;
  imageUrl: string;
  stayDays?: number;
}

interface TripPreviewPanelProps {
  tripName: string;
  destinations: Destination[];
  dateRange: { startDate: string; endDate: string } | null;
  isFlexible: boolean;
  flexibleDays?: number;
  travelers: number;
  budgetTier: 'budget' | 'moderate' | 'premium' | 'luxury';
  categoryImage?: string;
}

const budgetLabels = {
  budget: '$',
  moderate: '$$',
  premium: '$$$',
  luxury: 'Luxury',
};

const placeholderImages = [
  'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export function TripPreviewPanel({
  tripName,
  destinations,
  dateRange,
  isFlexible,
  flexibleDays,
  travelers,
  budgetTier,
  categoryImage,
}: TripPreviewPanelProps) {
  const getDisplayImage = () => {
    if (destinations.length > 0) {
      return destinations[0].imageUrl;
    }
    if (categoryImage) {
      return categoryImage;
    }
    return placeholderImages[0];
  };

  const formatDateRange = () => {
    if (isFlexible && flexibleDays) {
      return `${flexibleDays} ${flexibleDays === 1 ? 'day' : 'days'}`;
    }
    if (dateRange?.startDate && dateRange?.endDate) {
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `${startStr} - ${endStr}`;
    }
    return 'Flexible';
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{ backgroundImage: `url(${getDisplayImage()})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
        <h2 className="text-3xl font-bold mb-4 transition-all duration-300">
          {tripName || 'Name your adventure...'}
        </h2>

        <div className="space-y-3">
          {destinations.length > 0 && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">
                  {destinations.map((d, idx) => (
                    <span key={idx}>
                      {d.name}
                      {d.country && `, ${d.country}`}
                      {idx < destinations.length - 1 && ' → '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{formatDateRange()}</span>
          </div>

          {travelers > 0 && (
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">
                {travelers} {travelers === 1 ? 'traveler' : 'travelers'}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{budgetLabels[budgetTier]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
