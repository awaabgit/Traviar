import { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { PlaceDetail } from '../../types';
import { HeroSection } from './HeroSection';
import { QuickActionsBar } from './QuickActionsBar';
import { SectionTabs } from './SectionTabs';
import { OverviewSection } from './OverviewSection';
import { DetailsSection } from './DetailsSection';
import { ReviewsSection } from './ReviewsSection';
import { ContentSection } from './ContentSection';
import { NearbySection } from './NearbySection';
import { PlaceDetailSkeleton } from './PlaceDetailSkeleton';
import { AddToDayModal } from './AddToDayModal';

interface PlaceDetailDrawerProps {
  placeId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToDay?: (placeId: string, dayId: string, time: string) => void;
  tripId?: string;
}

export function PlaceDetailDrawer({
  placeId,
  isOpen,
  onClose,
  onAddToDay,
  tripId
}: PlaceDetailDrawerProps) {
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showAddToDayModal, setShowAddToDayModal] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const mockTripDays = [
    { id: 'd1', dayNumber: 1, title: 'Arrival & Eiffel Tower', date: '2024-06-15' },
    { id: 'd2', dayNumber: 2, title: 'Louvre & Latin Quarter', date: '2024-06-16' },
    { id: 'd3', dayNumber: 3, title: 'Versailles Day Trip', date: '2024-06-17' },
    { id: 'd4', dayNumber: 4, title: 'Montmartre & Sacré-Cœur', date: '2024-06-18' },
  ];

  useEffect(() => {
    if (isOpen && placeId) {
      loadPlaceDetails(placeId);
    }
  }, [isOpen, placeId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const loadPlaceDetails = async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setPlace({
        id,
        name: 'Eiffel Tower',
        category: 'Landmark',
        city: 'Paris, France',
        description: 'The iconic iron lattice tower on the Champ de Mars, offering breathtaking views of Paris from its observation decks. A must-visit symbol of French culture and engineering marvel.',
        rating: 4.7,
        reviewCount: 125430,
        priceLevel: '$$',
        images: [
          'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2422256/pexels-photo-2422256.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
        phone: '+33 892 70 12 39',
        website: 'https://www.toureiffel.paris',
        latitude: 48.8584,
        longitude: 2.2945,
        openingHours: {
          isOpenNow: true,
          closesAt: '11:30 PM',
          schedule: [
            { day: 'Monday', hours: '9:30 AM - 11:30 PM' },
            { day: 'Tuesday', hours: '9:30 AM - 11:30 PM' },
            { day: 'Wednesday', hours: '9:30 AM - 11:30 PM' },
            { day: 'Thursday', hours: '9:30 AM - 11:30 PM' },
            { day: 'Friday', hours: '9:30 AM - 11:30 PM' },
            { day: 'Saturday', hours: '9:30 AM - 11:30 PM' },
            { day: 'Sunday', hours: '9:30 AM - 11:30 PM' },
          ],
        },
        amenities: [
          'Skip-the-line tickets',
          'Wheelchair accessible',
          'Audio guides available',
          'Restaurant on site',
          'Gift shop',
          'Photography allowed',
        ],
        tags: ['Must-do', 'Romantic', 'Photography'],
        vibes: ['Iconic', 'Historic', 'Panoramic views'],
        suggestedDuration: '2-3 hours',
        bestFor: ['Couples', 'Photographers', 'First-time visitors'],
        bestTime: 'evening',
        bookingUrl: 'https://booking.example.com/eiffel',
        reviewSummary: {
          overallRating: 4.7,
          totalReviews: 125430,
          distribution: { 5: 78500, 4: 32100, 3: 9800, 2: 3200, 1: 1830 },
          keywords: ['breathtaking views', 'long queues', 'iconic experience'],
        },
        reviews: [
          {
            id: '1',
            username: 'Sarah M.',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
            rating: 5,
            date: '2 days ago',
            text: 'Absolutely breathtaking! The sunset view from the top is something you\'ll never forget. Book tickets in advance to skip the massive queues.',
            platform: 'google',
          },
          {
            id: '2',
            username: 'James T.',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
            rating: 4,
            date: '1 week ago',
            text: 'Amazing views but very crowded. The elevator ride takes a while during peak hours. Still worth it for the experience!',
            platform: 'tripadvisor',
          },
          {
            id: '3',
            username: 'Emma L.',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
            rating: 5,
            date: '2 weeks ago',
            text: 'A must-see in Paris. The sparkling lights at night are magical. The champagne bar at the top is a nice touch for a special moment.',
            platform: 'yelp',
          },
        ],
        creatorContent: [
          {
            id: '1',
            type: 'video',
            thumbnailUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'tiktok',
            creatorHandle: '@paris_explorer',
            title: 'Best time to visit Eiffel',
            viewCount: 1200000,
          },
          {
            id: '2',
            type: 'video',
            thumbnailUrl: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'instagram',
            creatorHandle: '@travel_with_me',
            title: 'Sunset from the top',
            viewCount: 850000,
          },
          {
            id: '3',
            type: 'video',
            thumbnailUrl: 'https://images.pexels.com/photos/2422256/pexels-photo-2422256.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'youtube',
            creatorHandle: '@paris_vlogs',
            title: 'Complete tower walkthrough',
            viewCount: 450000,
          },
        ],
        nearbyPlaces: [
          {
            id: 'n1',
            name: 'Trocadéro Gardens',
            category: 'Park',
            distance: '5 min walk',
            rating: 4.6,
            imageUrl: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400',
            priceLevel: 'Free',
          },
          {
            id: 'n2',
            name: 'Musée du Quai Branly',
            category: 'Museum',
            distance: '8 min walk',
            rating: 4.5,
            imageUrl: 'https://images.pexels.com/photos/2563681/pexels-photo-2563681.jpeg?auto=compress&cs=tinysrgb&w=400',
            priceLevel: '$$',
          },
          {
            id: 'n3',
            name: 'Seine River Cruise Dock',
            category: 'Activity',
            distance: '3 min walk',
            rating: 4.7,
            imageUrl: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=400',
            priceLevel: '$$',
          },
        ],
      });
    } catch (error) {
      console.error('Failed to load place details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      const offset = 180;
      const elementPosition = element.offsetTop;
      contentRef.current.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    console.log('Share place');
  };

  const handleAddToDay = () => {
    setShowAddToDayModal(true);
  };

  const handleConfirmAddToDay = (dayId: string, time: string, category: string) => {
    if (placeId && onAddToDay) {
      onAddToDay(placeId, dayId, time);
    }
    setIsAdded(true);
    setShowAddToDayModal(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center md:justify-end"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      <div
        ref={drawerRef}
        className={`relative w-full md:w-[480px] h-[92vh] md:h-full bg-white
                   md:shadow-2xl overflow-hidden
                   animate-slide-in-bottom md:animate-slide-in-right
                   rounded-t-3xl md:rounded-none flex flex-col`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/95 backdrop-blur-sm
                   shadow-lg hover:bg-white transition-all duration-200
                   transform hover:scale-110 active:scale-95"
          aria-label="Close drawer"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {loading ? (
          <PlaceDetailSkeleton />
        ) : place ? (
          <>
            <HeroSection
              place={place}
              isSaved={isSaved}
              onSave={handleSave}
              onShare={handleShare}
            />

            <QuickActionsBar
              isAdded={isAdded}
              onAddToDay={handleAddToDay}
              distanceInfo="8 min walk from hotel"
            />

            <SectionTabs
              activeSection={activeSection}
              onSectionChange={handleScrollToSection}
            />

            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="pb-8">
                <OverviewSection place={place} />
                <DetailsSection place={place} />
                <ReviewsSection place={place} />
                <ContentSection place={place} />
                <NearbySection
                  places={place.nearbyPlaces || []}
                  onPlaceClick={(placeId) => console.log('Open place:', placeId)}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Failed to load place details</p>
              <button
                onClick={() => placeId && loadPlaceDetails(placeId)}
                className="px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white
                         font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      <AddToDayModal
        isOpen={showAddToDayModal}
        onClose={() => setShowAddToDayModal(false)}
        onConfirm={handleConfirmAddToDay}
        tripDays={mockTripDays}
      />
    </div>
  );
}
