import { Star, ExternalLink } from 'lucide-react';
import { PlaceDetail } from '../../types';

interface ReviewsSectionProps {
  place: PlaceDetail;
}

const PLATFORM_ICONS = {
  google: '🔍',
  yelp: '🍔',
  tripadvisor: '🦉',
  traviar: '✈️',
};

export function ReviewsSection({ place }: ReviewsSectionProps) {
  const summary = place.reviewSummary;
  const reviews = place.reviews || [];

  if (!summary) return null;

  const getDistributionPercentage = (count: number) => {
    return (count / summary.totalReviews) * 100;
  };

  return (
    <section
      id="reviews"
      className="px-6 py-6 border-t border-gray-100 space-y-6 animate-slide-up-fade"
      style={{ animationDelay: '100ms' }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>

      <div className="bg-gradient-to-br from-coral-50 to-orange-50 rounded-2xl p-6 border border-coral-100">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {summary.overallRating}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(summary.overallRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {summary.totalReviews.toLocaleString()} reviews
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-6">
                  {rating}
                </span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${getDistributionPercentage(
                        summary.distribution[rating as keyof typeof summary.distribution]
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {summary.distribution[
                    rating as keyof typeof summary.distribution
                  ].toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {summary.keywords.length > 0 && (
          <div className="mt-6 pt-6 border-t border-coral-200">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Travelers say:
            </div>
            <div className="flex flex-wrap gap-2">
              {summary.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block px-3 py-1.5 rounded-full bg-white
                           text-sm font-medium text-gray-700 border border-coral-200"
                >
                  "{keyword}"
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                style={{ animationDelay: `${150 + index * 75}ms` }}
                className="p-4 rounded-xl border border-gray-200 bg-white
                         hover:shadow-md transition-all duration-200 animate-slide-up-fade"
              >
                <div className="flex items-start gap-3 mb-3">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">
                        {review.username.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-semibold text-gray-900">
                        {review.username}
                      </div>
                      {review.platform && (
                        <span className="text-sm" title={review.platform}>
                          {PLATFORM_ICONS[review.platform]}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-3
                     rounded-xl font-medium text-coral-600 hover:text-coral-700
                     border border-coral-200 hover:border-coral-300 hover:bg-coral-50
                     transition-all duration-200 transform hover:scale-[1.02]"
          >
            <span>View all reviews</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </>
      ) : (
        <div className="text-center py-8 px-4">
          <p className="text-gray-500">
            No reviews yet – you might be one of the first travelers here.
          </p>
        </div>
      )}
    </section>
  );
}
