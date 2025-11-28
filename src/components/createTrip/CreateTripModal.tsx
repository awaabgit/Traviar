import { useState, useEffect } from 'react';
import { X, MapPin, Sparkles, Loader2, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TripPreviewPanel } from './TripPreviewPanel';
import { DestinationChip, Destination } from './DestinationChip';
import { CategoryChips, TripCategory, getCategoryImage } from './CategoryChips';
import { DateSelector } from './DateSelector';
import { TravelersSelector } from './TravelersSelector';
import { BudgetSelector, BudgetTier } from './BudgetSelector';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowType: 'manual' | 'ai';
  onSuccess?: (tripId: string) => void;
}

const popularDestinations = [
  { name: 'Paris', country: 'France', imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Tokyo', country: 'Japan', imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'New York', country: 'USA', imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'London', country: 'UK', imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Barcelona', country: 'Spain', imageUrl: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Rome', country: 'Italy', imageUrl: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Dubai', country: 'UAE', imageUrl: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Bali', country: 'Indonesia', imageUrl: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export function CreateTripModal({ isOpen, onClose, flowType, onSuccess }: CreateTripModalProps) {
  const [tripName, setTripName] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [showDestinationSearch, setShowDestinationSearch] = useState(false);
  const [categories, setCategories] = useState<TripCategory[]>([]);
  const [dateMode, setDateMode] = useState<'exact' | 'flexible'>('exact');
  const [exactDates, setExactDates] = useState({ startDate: '', endDate: '' });
  const [flexibleDays, setFlexibleDays] = useState(7);
  const [flexibleMonths, setFlexibleMonths] = useState<string[]>([]);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState<BudgetTier>('moderate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTripName('');
      setDestinations([]);
      setDestinationSearch('');
      setShowDestinationSearch(false);
      setCategories([]);
      setDateMode('exact');
      setExactDates({ startDate: '', endDate: '' });
      setFlexibleDays(7);
      setFlexibleMonths([]);
      setTravelers(1);
      setBudget('moderate');
      setIsSubmitting(false);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (destinations.length > 0 && !tripName) {
      const mainDest = destinations[0];
      setTripName(`Trip to ${mainDest.name}`);
    }
  }, [destinations]);

  if (!isOpen) return null;

  const handleAddDestination = (dest: typeof popularDestinations[0]) => {
    if (!destinations.find(d => d.name === dest.name)) {
      setDestinations([...destinations, { ...dest, stayDays: 3 }]);
      setDestinationSearch('');
      setShowDestinationSearch(false);
    }
  };

  const handleRemoveDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const handleUpdateDestinationDays = (index: number, days: number) => {
    setDestinations(
      destinations.map((d, i) => (i === index ? { ...d, stayDays: days } : d))
    );
  };

  const filteredDestinations = popularDestinations.filter(
    dest =>
      dest.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
      dest.country?.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  const isFormValid = () => {
    if (!tripName.trim()) return false;
    if (destinations.length === 0) return false;
    if (dateMode === 'exact') {
      if (!exactDates.startDate || !exactDates.endDate) return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const startDate = dateMode === 'exact' ? exactDates.startDate : new Date().toISOString().split('T')[0];
      const endDate = dateMode === 'exact'
        ? exactDates.endDate
        : new Date(Date.now() + flexibleDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const tripData = {
        user_id: user.id,
        trip_name: tripName.trim(),
        destination: destinations[0].name,
        start_date: startDate,
        end_date: endDate,
        hero_image_url: destinations[0].imageUrl,
        thumbnail_url: destinations[0].imageUrl,
        trip_status: 'draft',
        travelers_count: travelers,
        is_shared: false,
        locations: destinations.map(d => d.name),
        budget_tier: budget,
        categories: categories,
      };

      console.log('CreateTripModal: Inserting trip with data:', tripData);

      const { data, error: insertError } = await supabase
        .from('user_trips')
        .insert(tripData)
        .select()
        .single();

      console.log('CreateTripModal: Insert result:', { data, error: insertError });

      if (insertError) throw insertError;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const daysToInsert = [];
      for (let i = 0; i < daysCount; i++) {
        const dayDate = new Date(start);
        dayDate.setDate(start.getDate() + i);
        daysToInsert.push({
          trip_id: data.id,
          day_number: i + 1,
          date: dayDate.toISOString().split('T')[0],
        });
      }

      const { error: daysError } = await supabase
        .from('trip_days')
        .insert(daysToInsert);

      if (daysError) {
        console.error('Error creating trip days:', daysError);
      }

      onSuccess?.(data.id);
      onClose();
    } catch (err) {
      console.error('Error creating trip:', err);
      setError(err instanceof Error ? err.message : 'Failed to create trip');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[20px] shadow-soft-xl w-full max-w-[880px] max-h-[90vh] overflow-hidden animate-scale-in-bounce flex">
        <div className="w-[42%] relative overflow-hidden">
          <TripPreviewPanel
            tripName={tripName}
            destinations={destinations}
            dateRange={dateMode === 'exact' ? exactDates : null}
            isFlexible={dateMode === 'flexible'}
            flexibleDays={flexibleDays}
            travelers={travelers}
            budgetTier={budget}
            categoryImage={getCategoryImage(categories)}
          />
        </div>

        <div className="w-[58%] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {flowType === 'ai' ? 'Plan with AI' : 'Create New Trip'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <CategoryChips selectedCategories={categories} onSelectCategories={setCategories} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Name
              </label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="Name your adventure…"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-coral-500
                         focus:ring-2 focus:ring-coral-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinations
              </label>

              <div className="space-y-3">
                {destinations.map((dest, index) => (
                  <DestinationChip
                    key={index}
                    destination={dest}
                    onRemove={() => handleRemoveDestination(index)}
                    onUpdateDays={(days) => handleUpdateDestinationDays(index, days)}
                  />
                ))}

                <div className="relative">
                  {showDestinationSearch ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          value={destinationSearch}
                          onChange={(e) => setDestinationSearch(e.target.value)}
                          placeholder="Search destinations..."
                          autoFocus
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-coral-500
                                   focus:ring-2 focus:ring-coral-100 outline-none transition-all"
                        />
                      </div>

                      {destinationSearch && (
                        <div className="max-h-48 overflow-y-auto bg-white rounded-lg border border-gray-200 shadow-soft-lg">
                          {filteredDestinations.map((dest, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleAddDestination(dest)}
                              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <div
                                className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                                style={{ backgroundImage: `url(${dest.imageUrl})` }}
                              />
                              <div>
                                <p className="font-semibold text-sm text-gray-900">{dest.name}</p>
                                <p className="text-xs text-gray-500">{dest.country}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowDestinationSearch(true)}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300
                               hover:border-coral-400 hover:bg-coral-50 text-gray-600 hover:text-coral-600
                               font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Location
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dates
              </label>
              <DateSelector
                dateMode={dateMode}
                onDateModeChange={setDateMode}
                exactDates={exactDates}
                onExactDatesChange={setExactDates}
                flexibleDays={flexibleDays}
                onFlexibleDaysChange={setFlexibleDays}
                flexibleMonths={flexibleMonths}
                onFlexibleMonthsChange={setFlexibleMonths}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travelers
              </label>
              <TravelersSelector travelers={travelers} onTravelersChange={setTravelers} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <BudgetSelector selectedBudget={budget} onSelectBudget={setBudget} />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`
                w-full px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
                flex items-center justify-center gap-2
                ${
                  flowType === 'ai'
                    ? 'bg-coral-500 hover:bg-coral-600 disabled:bg-coral-300'
                    : 'bg-black hover:bg-gray-800 disabled:bg-gray-300'
                }
                disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {flowType === 'ai' ? 'Generating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {flowType === 'ai' && <Sparkles className="w-5 h-5" />}
                  {flowType === 'ai' ? 'Generate with AI' : 'Create Trip'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
