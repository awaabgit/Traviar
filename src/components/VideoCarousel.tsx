import { Play } from 'lucide-react';
import { useState } from 'react';
import { VideoPlayerModal } from './VideoPlayerModal';
import { TravelVideo } from '../types';

const MOCK_VIDEOS: TravelVideo[] = [
  {
    id: '1',
    title: 'Hidden Gems in Rome',
    description: 'Discover secret spots locals love in the eternal city. From hidden trattorias to lesser-known piazzas, explore Rome beyond the tourist crowds.',
    thumbnail_url: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'marco_travels',
    creator_avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    source_platform: 'traviar',
    location_name: 'Rome',
    location_country: 'Italy',
    location_lat: 41.9028,
    location_lng: 12.4964,
    view_count: 45600,
    like_count: 12400,
    comment_count: 234,
    share_count: 567,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '1', video_id: '1', tag_name: 'Rome', created_at: new Date().toISOString() },
      { id: '2', video_id: '1', tag_name: 'Hidden Gems', created_at: new Date().toISOString() },
      { id: '3', video_id: '1', tag_name: 'Local Life', created_at: new Date().toISOString() },
    ],
    comments: [
      {
        id: '1',
        video_id: '1',
        user_id: '1',
        comment_text: 'Amazing spots! I visited the cafe you mentioned and it was incredible.',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        user: { username: 'sarah_travels', avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
      },
    ],
    is_liked: false,
    is_saved: false,
  },
  {
    id: '2',
    title: 'NYC Food Tour',
    description: "Best street food spots in Manhattan you can't miss. From classic New York pizza to authentic halal carts, taste the city one bite at a time.",
    thumbnail_url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'sarah_eats',
    source_platform: 'tiktok',
    external_video_id: 'tiktok_12345',
    location_name: 'Manhattan',
    location_country: 'United States',
    location_lat: 40.7580,
    location_lng: -73.9855,
    view_count: 78900,
    like_count: 8900,
    comment_count: 456,
    share_count: 892,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '4', video_id: '2', tag_name: 'NYC', created_at: new Date().toISOString() },
      { id: '5', video_id: '2', tag_name: 'Food', created_at: new Date().toISOString() },
      { id: '6', video_id: '2', tag_name: 'Street Food', created_at: new Date().toISOString() },
    ],
    comments: [],
    is_liked: false,
    is_saved: false,
  },
  {
    id: '3',
    title: 'Santorini Sunset',
    description: 'The most breathtaking sunset viewpoints in Oia. Watch the sky transform into a canvas of oranges and pinks over the Aegean Sea.',
    thumbnail_url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'elena_explores',
    creator_avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    source_platform: 'traviar',
    location_name: 'Santorini',
    location_country: 'Greece',
    location_lat: 36.4618,
    location_lng: 25.3753,
    view_count: 125000,
    like_count: 15200,
    comment_count: 678,
    share_count: 1234,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '7', video_id: '3', tag_name: 'Santorini', created_at: new Date().toISOString() },
      { id: '8', video_id: '3', tag_name: 'Sunset', created_at: new Date().toISOString() },
      { id: '9', video_id: '3', tag_name: 'Greece', created_at: new Date().toISOString() },
    ],
    comments: [
      {
        id: '2',
        video_id: '3',
        user_id: '2',
        comment_text: 'This is on my bucket list! Thanks for the tips.',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        user: { username: 'travel_dreamer', avatar_url: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200' },
      },
    ],
    is_liked: false,
    is_saved: false,
  },
  {
    id: '4',
    title: 'Kyoto Temples',
    description: 'Traditional tea ceremony and temple exploration. Experience the serene beauty of ancient Kyoto through its magnificent temples and gardens.',
    thumbnail_url: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'yuki_wanders',
    source_platform: 'traviar',
    creator_avatar_url: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200',
    location_name: 'Kyoto',
    location_country: 'Japan',
    location_lat: 35.0116,
    location_lng: 135.7681,
    view_count: 89300,
    like_count: 10300,
    comment_count: 345,
    share_count: 678,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '10', video_id: '4', tag_name: 'Japan', created_at: new Date().toISOString() },
      { id: '11', video_id: '4', tag_name: 'Temples', created_at: new Date().toISOString() },
      { id: '12', video_id: '4', tag_name: 'Culture', created_at: new Date().toISOString() },
    ],
    comments: [],
    is_liked: false,
    is_saved: false,
  },
  {
    id: '5',
    title: 'Dubai Adventure',
    description: 'Desert safari and luxury experiences in one day. From sand dunes to skyscrapers, experience the contrasts of modern Dubai.',
    thumbnail_url: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'ahmed_travels',
    source_platform: 'tiktok',
    external_video_id: 'tiktok_67890',
    location_name: 'Dubai',
    location_country: 'United Arab Emirates',
    location_lat: 25.2048,
    location_lng: 55.2708,
    view_count: 67800,
    like_count: 9100,
    comment_count: 289,
    share_count: 445,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '13', video_id: '5', tag_name: 'Dubai', created_at: new Date().toISOString() },
      { id: '14', video_id: '5', tag_name: 'Adventure', created_at: new Date().toISOString() },
      { id: '15', video_id: '5', tag_name: 'Desert', created_at: new Date().toISOString() },
    ],
    comments: [],
    is_liked: false,
    is_saved: false,
  },
  {
    id: '6',
    title: 'Bali Beach Vibes',
    description: 'Best beach clubs and hidden coves in Uluwatu. Find your perfect spot in paradise with stunning cliffs and crystal-clear waters.',
    thumbnail_url: 'https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'tropical_tales',
    creator_avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    source_platform: 'traviar',
    location_name: 'Uluwatu',
    location_country: 'Indonesia',
    location_lat: -8.8295,
    location_lng: 115.0849,
    view_count: 95600,
    like_count: 11700,
    comment_count: 412,
    share_count: 789,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '16', video_id: '6', tag_name: 'Bali', created_at: new Date().toISOString() },
      { id: '17', video_id: '6', tag_name: 'Beach', created_at: new Date().toISOString() },
      { id: '18', video_id: '6', tag_name: 'Tropical', created_at: new Date().toISOString() },
    ],
    comments: [
      {
        id: '3',
        video_id: '6',
        user_id: '3',
        comment_text: 'Going there next month! Can you share the exact location?',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        user: { username: 'beach_lover', avatar_url: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=200' },
      },
    ],
    is_liked: false,
    is_saved: false,
  },
  {
    id: '7',
    title: 'Iceland Northern Lights',
    description: 'Chasing aurora borealis in the land of fire and ice. Witness the magical dance of the northern lights in pristine Icelandic landscapes.',
    thumbnail_url: 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=400',
    creator_username: 'arctic_explorer',
    creator_avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    source_platform: 'traviar',
    location_name: 'Reykjavik',
    location_country: 'Iceland',
    location_lat: 64.1466,
    location_lng: -21.9426,
    view_count: 156000,
    like_count: 18500,
    comment_count: 892,
    share_count: 1567,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [
      { id: '19', video_id: '7', tag_name: 'Iceland', created_at: new Date().toISOString() },
      { id: '20', video_id: '7', tag_name: 'Northern Lights', created_at: new Date().toISOString() },
      { id: '21', video_id: '7', tag_name: 'Nature', created_at: new Date().toISOString() },
    ],
    comments: [
      {
        id: '4',
        video_id: '7',
        user_id: '4',
        comment_text: 'This is absolutely stunning! What time of year did you go?',
        created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        user: { username: 'nature_seeker', avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
      },
      {
        id: '5',
        video_id: '7',
        user_id: '5',
        comment_text: 'Best time is between September and March!',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        user: { username: 'iceland_guide', avatar_url: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200' },
      },
    ],
    is_liked: false,
    is_saved: false,
  },
];

export function VideoCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const handleVideoClick = (index: number) => {
    setSelectedVideoIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Travel Inspiration</h2>
          <button className="text-sm font-medium text-coral-600 hover:text-coral-700">
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          {MOCK_VIDEOS.map((video, index) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(index)}
              className="relative flex-shrink-0 w-36 h-64 rounded-xl overflow-hidden
                       group cursor-pointer border border-gray-200"
            >
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm
                              flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-xs mb-1 line-clamp-2 leading-tight">
                  {video.title}
                </p>
                <p className="text-white/90 text-xs">@{video.creator_username}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videos={MOCK_VIDEOS}
        initialIndex={selectedVideoIndex}
      />
    </>
  );
}
