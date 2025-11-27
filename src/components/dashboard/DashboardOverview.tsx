import { TrendingUp, TrendingDown, DollarSign, FileText, ShoppingBag, Star, Plus, MessageCircle, BarChart3, Eye } from 'lucide-react';

interface DashboardOverviewProps {
  onCreateItinerary: () => void;
  onUploadVideo: () => void;
  onOpenMessages: () => void;
  onViewAnalytics: () => void;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '$4,892',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: 'Active Listings',
    value: '24',
    change: '+3',
    isPositive: true,
    icon: FileText,
  },
  {
    title: 'Total Sales',
    value: '342',
    change: '+18.2%',
    isPositive: true,
    icon: ShoppingBag,
  },
  {
    title: 'Average Rating',
    value: '4.9',
    change: '+0.2',
    isPositive: true,
    icon: Star,
  },
];

const RECENT_ACTIVITY = [
  {
    id: '1',
    type: 'sale',
    title: 'New purchase: Weekend in Paris',
    buyer: 'Sarah M.',
    amount: '$19',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'review',
    title: 'New 5-star review',
    buyer: 'Mike T.',
    itinerary: 'Barcelona on a Budget',
    time: '5 hours ago',
  },
  {
    id: '3',
    type: 'follower',
    title: 'New follower',
    buyer: 'Emma L.',
    time: '1 day ago',
  },
  {
    id: '4',
    type: 'sale',
    title: 'New purchase: Rome in 5 Days',
    buyer: 'John D.',
    amount: '$29',
    time: '2 days ago',
  },
];

const TOP_ITINERARIES = [
  {
    id: '1',
    title: 'Weekend in Paris',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=200',
    sales: 45,
    revenue: '$855',
    rating: 4.9,
  },
  {
    id: '2',
    title: 'Barcelona on a Budget',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=200',
    sales: 38,
    revenue: '$570',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Rome in 5 Days',
    thumbnail: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=200',
    sales: 32,
    revenue: '$928',
    rating: 4.9,
  },
];

export function DashboardOverview({ onCreateItinerary, onUploadVideo, onOpenMessages, onViewAnalytics }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-coral-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-coral-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onCreateItinerary}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300
                       hover:border-coral-500 hover:bg-coral-50 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-coral-100
                            flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-gray-600 group-hover:text-coral-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Create New Itinerary</p>
                <p className="text-xs text-gray-500">Start building your next trip</p>
              </div>
            </button>

            <button
              onClick={onUploadVideo}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300
                       hover:border-coral-500 hover:bg-coral-50 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-coral-100
                            flex items-center justify-center transition-colors">
                <Eye className="w-5 h-5 text-gray-600 group-hover:text-coral-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Upload Video</p>
                <p className="text-xs text-gray-500">Add new content</p>
              </div>
            </button>

            <button
              onClick={onOpenMessages}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300
                       hover:border-coral-500 hover:bg-coral-50 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-coral-100
                            flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-coral-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Check Messages</p>
                <p className="text-xs text-gray-500">3 unread</p>
              </div>
            </button>

            <button
              onClick={onViewAnalytics}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300
                       hover:border-coral-500 hover:bg-coral-50 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-coral-100
                            flex items-center justify-center transition-colors">
                <BarChart3 className="w-5 h-5 text-gray-600 group-hover:text-coral-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">View Analytics</p>
                <p className="text-xs text-gray-500">See your performance</p>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-coral-100 flex items-center justify-center flex-shrink-0">
                  {activity.type === 'sale' && <DollarSign className="w-4 h-4 text-coral-600" />}
                  {activity.type === 'review' && <Star className="w-4 h-4 text-coral-600" />}
                  {activity.type === 'follower' && <Eye className="w-4 h-4 text-coral-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.buyer} · {activity.time}</p>
                </div>
                {activity.amount && (
                  <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Top Performing Itineraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOP_ITINERARIES.map((itinerary) => (
            <div
              key={itinerary.id}
              className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-coral-500
                       hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={itinerary.thumbnail}
                alt={itinerary.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-2 truncate">{itinerary.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    {itinerary.sales}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {itinerary.revenue}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {itinerary.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
