import { Eye, Play } from 'lucide-react';

interface VideoCardData {
  id: string;
  thumbnail: string;
  views: string;
  itineraryTag: string;
}

interface VideosTabProps {
  onVideoClick: (id: string) => void;
}

const MOCK_VIDEOS: VideoCardData[] = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '2.3M',
    itineraryTag: 'Paris on $300',
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '1.8M',
    itineraryTag: 'Barcelona Budget',
  },
  {
    id: '3',
    thumbnail: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '950K',
    itineraryTag: 'Lisbon Vibes',
  },
  {
    id: '4',
    thumbnail: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '3.1M',
    itineraryTag: 'Rome Must-See',
  },
  {
    id: '5',
    thumbnail: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '1.2M',
    itineraryTag: 'Amsterdam Guide',
  },
  {
    id: '6',
    thumbnail: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '2.7M',
    itineraryTag: 'Berlin Culture',
  },
  {
    id: '7',
    thumbnail: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '890K',
    itineraryTag: 'Madrid Tapas',
  },
  {
    id: '8',
    thumbnail: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '1.5M',
    itineraryTag: 'Prague Adventures',
  },
  {
    id: '9',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400',
    views: '2.1M',
    itineraryTag: 'Vienna Classic',
  },
];

export function VideosTab({ onVideoClick }: VideosTabProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {MOCK_VIDEOS.map((video) => (
        <button
          key={video.id}
          onClick={() => onVideoClick(video.id)}
          className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100
                   hover:ring-2 hover:ring-coral-500 transition-all"
        >
          <img
            src={video.thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                        transition-opacity flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-coral-600 ml-1" fill="currentColor" />
            </div>
          </div>

          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 rounded bg-black/70 text-white text-xs font-medium
                         flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {video.views}
            </span>
          </div>

          <div className="absolute bottom-2 left-2 right-2">
            <span className="px-2 py-1 rounded bg-black/80 text-white text-xs font-medium
                         block truncate">
              From: {video.itineraryTag}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
