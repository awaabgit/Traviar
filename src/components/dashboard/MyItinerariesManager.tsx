import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Copy, Archive, Eye, DollarSign, Star } from 'lucide-react';

interface Itinerary {
  id: string;
  title: string;
  thumbnail: string;
  status: 'published' | 'draft' | 'archived';
  price: number;
  views: number;
  sales: number;
  revenue: number;
  rating: number;
}

const MOCK_ITINERARIES: Itinerary[] = [
  {
    id: '1',
    title: 'Weekend in Paris',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'published',
    price: 19,
    views: 1234,
    sales: 45,
    revenue: 855,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'Barcelona on a Budget',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'published',
    price: 15,
    views: 987,
    sales: 38,
    revenue: 570,
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Rome in 5 Days - Draft',
    thumbnail: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'draft',
    price: 29,
    views: 0,
    sales: 0,
    revenue: 0,
    rating: 0,
  },
];

export function MyItinerariesManager() {
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItineraries = MOCK_ITINERARIES.filter((itinerary) => {
    const matchesFilter = filter === 'all' || itinerary.status === filter;
    const matchesSearch = itinerary.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Itineraries</h1>
          <p className="text-gray-600">Manage your marketplace listings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-coral-500
                         hover:bg-coral-600 text-white font-semibold transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          Create New Itinerary
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search itineraries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredItineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              <img
                src={itinerary.thumbnail}
                alt={itinerary.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{itinerary.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        itinerary.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : itinerary.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-gray-900">${itinerary.price}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold mb-1">
                      <Eye className="w-4 h-4" />
                      {itinerary.views}
                    </div>
                    <p className="text-xs text-gray-600">Views</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold mb-1">
                      <DollarSign className="w-4 h-4" />
                      {itinerary.sales}
                    </div>
                    <p className="text-xs text-gray-600">Sales</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold mb-1">
                      <DollarSign className="w-4 h-4" />
                      ${itinerary.revenue}
                    </div>
                    <p className="text-xs text-gray-600">Revenue</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-gray-900 font-semibold mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {itinerary.rating || 'N/A'}
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-coral-500
                                   hover:bg-coral-600 text-white text-sm font-medium transition-all">
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300
                                   hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all">
                    <Copy className="w-3 h-3" />
                    Duplicate
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300
                                   hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all">
                    <Eye className="w-3 h-3" />
                    View Public
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300
                                   hover:bg-gray-50 text-gray-700 text-sm font-medium transition-all">
                    <Archive className="w-3 h-3" />
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
