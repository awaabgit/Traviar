import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Flag, Filter, Search } from 'lucide-react';

interface Review {
  id: string;
  reviewer: string;
  avatar: string;
  itinerary: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
  responded: boolean;
  response?: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    reviewer: 'Sarah M.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
    itinerary: 'Weekend in Paris',
    rating: 5,
    text: 'Absolutely amazing itinerary! Every recommendation was perfect. The restaurant suggestions were spot on and the timing for each activity was just right. Would definitely recommend!',
    date: '2024-01-20',
    helpful: 12,
    responded: true,
    response: 'Thank you so much for your kind words! I\'m thrilled you enjoyed Paris!',
  },
  {
    id: '2',
    reviewer: 'Mike T.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80',
    itinerary: 'Barcelona on a Budget',
    rating: 4,
    text: 'Great value for money. The budget tips were really helpful and saved me a lot. Only wish there were more food recommendations.',
    date: '2024-01-18',
    helpful: 8,
    responded: false,
  },
  {
    id: '3',
    reviewer: 'Emma L.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80',
    itinerary: 'Rome in 5 Days',
    rating: 5,
    text: 'Perfect! The itinerary was well-paced and included all the must-see spots plus some hidden gems. The tips for avoiding crowds were invaluable.',
    date: '2024-01-15',
    helpful: 15,
    responded: true,
    response: 'So happy to hear you discovered some hidden gems! Thank you for the review!',
  },
];

export function ReviewsRatingsPage() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [filter, setFilter] = useState<'all' | 5 | 4 | 3 | 2 | 1 | 'needs-response'>('all');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');

  const avgRating = 4.9;
  const totalReviews = 127;
  const responseRate = 94;

  const ratingDistribution = [
    { stars: 5, count: 105, percentage: 83 },
    { stars: 4, count: 18, percentage: 14 },
    { stars: 3, count: 3, percentage: 2 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const handleRespond = (review: Review) => {
    setSelectedReview(review);
    setResponseText('');
    setShowResponseModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
        <p className="text-gray-600">Manage and respond to customer reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Overall Rating</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{avgRating}</p>
            <span className="text-sm text-gray-600">/ 5.0</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Reviews</h3>
          <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Response Rate</h3>
          <p className="text-3xl font-bold text-gray-900">{responseRate}%</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
              <Star className="w-6 h-6 text-coral-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Needs Response</h3>
          <p className="text-3xl font-bold text-coral-900">
            {reviews.filter(r => !r.responded).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Customer Reviews</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg border border-gray-200 hover:border-coral-300 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.avatar}
                    alt={review.reviewer}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{review.reviewer}</h3>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">· {review.itinerary}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{review.text}</p>

                    {review.responded && review.response && (
                      <div className="p-3 rounded-lg bg-coral-50 border border-coral-100 mb-3">
                        <p className="text-xs font-semibold text-coral-900 mb-1">Your Response:</p>
                        <p className="text-sm text-gray-700">{review.response}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful} helpful</span>
                      </button>
                      {!review.responded && (
                        <button
                          onClick={() => handleRespond(review)}
                          className="px-3 py-1 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium"
                        >
                          Respond
                        </button>
                      )}
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                        <Flag className="w-4 h-4" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Rating Distribution</h2>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-gray-900">{item.stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors">
                All Reviews ({totalReviews})
              </button>
              <button className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors text-coral-600">
                Needs Response ({reviews.filter(r => !r.responded).length})
              </button>
              <button className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors">
                5 Stars Only ({ratingDistribution[0].count})
              </button>
              <button className="w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors">
                4 Stars & Below ({totalReviews - ratingDistribution[0].count})
              </button>
            </div>
          </div>
        </div>
      </div>

      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Respond to Review</h2>

            <div className="p-4 rounded-lg bg-gray-50 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <img src={selectedReview.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">{selectedReview.reviewer}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < selectedReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{selectedReview.text}</p>
            </div>

            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows={4}
              placeholder="Write your response..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setShowResponseModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-semibold">
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
