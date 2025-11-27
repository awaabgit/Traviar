import { X, Bookmark, Star, MapPin, Clock, Eye, ChevronRight } from 'lucide-react';
import { Collection } from './CollectionCard';

interface CollectionDetailDrawerProps {
  collection: Collection | null;
  onClose: () => void;
}

const MOCK_ITINERARIES = [
  {
    id: '1',
    title: 'Weekend in Paris',
    creatorName: '@parisfoodie',
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=200',
    price: 19,
    duration: '3 days',
    stops: 12,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    title: 'Barcelona on a Budget',
    creatorName: '@travelmore',
    creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=200',
    price: 15,
    duration: '4 days',
    stops: 15,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    title: 'Lisbon Hidden Gems',
    creatorName: '@cityexplorer',
    creatorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80',
    thumbnail: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=200',
    price: 22,
    duration: '3 days',
    stops: 10,
    rating: 4.7,
    reviews: 67,
  },
];

const MOCK_VIDEOS = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=200',
    creatorHandle: '@parisfoodie',
    creatorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=40',
    views: '2.3M',
    itineraryBadge: 'Paris on $300',
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=200',
    creatorHandle: '@travelmore',
    creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40',
    views: '1.8M',
    itineraryBadge: 'Barcelona Secrets',
  },
  {
    id: '3',
    thumbnail: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=200',
    creatorHandle: '@cityexplorer',
    creatorAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=40',
    views: '950K',
    itineraryBadge: 'Lisbon Vibes',
  },
];

const SIMILAR_COLLECTIONS = [
  {
    id: '1',
    title: 'Budget City Breaks',
    subtitle: 'More affordable European escapes',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    title: 'Foodie Weekends',
    subtitle: 'Culinary adventures across Europe',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    title: 'Quick Getaways',
    subtitle: '2-3 day European trips',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export function CollectionDetailDrawer({ collection, onClose }: CollectionDetailDrawerProps) {
  if (!collection) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
         onClick={onClose}>
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-3xl bg-white shadow-2xl
                   overflow-y-auto animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {collection.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {collection.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {collection.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Itineraries</p>
              <p className="text-sm font-semibold text-gray-900">{collection.itineraryCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Average rating</p>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {collection.averageRating}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Typical duration</p>
              <p className="text-sm font-semibold text-gray-900">3–5 days</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Popular regions</p>
              <p className="text-sm font-semibold text-gray-900">Paris · Barcelona</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-8">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Itineraries</h3>
            <div className="space-y-3">
              {MOCK_ITINERARIES.map((itinerary) => (
                <button
                  key={itinerary.id}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50
                           hover:bg-gray-100 transition-all duration-200 group"
                >
                  <img
                    src={itinerary.thumbnail}
                    alt={itinerary.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 text-left min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-coral-600 transition-colors">
                      {itinerary.title}
                    </h4>

                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={itinerary.creatorAvatar}
                        alt={itinerary.creatorName}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{itinerary.creatorName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {itinerary.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {itinerary.stops} stops
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {itinerary.rating} ({itinerary.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-lg font-bold text-gray-900">
                      ${itinerary.price}
                    </span>
                    <span className="text-coral-600 text-sm font-medium flex items-center gap-1
                                   group-hover:gap-2 transition-all">
                      View
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4">TikTok & Shorts</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
              {MOCK_VIDEOS.map((video) => (
                <button
                  key={video.id}
                  className="flex-shrink-0 w-40 group"
                >
                  <div className="relative rounded-xl overflow-hidden mb-2">
                    <img
                      src={video.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                  transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-coral-500
                                      border-b-8 border-b-transparent ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded bg-black/70 text-white text-xs font-medium
                                     flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={video.creatorAvatar}
                      alt={video.creatorHandle}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-xs font-medium text-gray-900 truncate">
                      {video.creatorHandle}
                    </span>
                  </div>

                  <span className="text-xs text-gray-600 px-2 py-1 rounded bg-gray-100 inline-block">
                    {video.itineraryBadge}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Collections</h3>
            <div className="grid grid-cols-3 gap-3">
              {SIMILAR_COLLECTIONS.map((similar) => (
                <button
                  key={similar.id}
                  className="text-left rounded-xl overflow-hidden bg-gray-50
                           hover:bg-gray-100 transition-colors group"
                >
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-0.5
                                 group-hover:text-coral-600 transition-colors">
                      {similar.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {similar.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
