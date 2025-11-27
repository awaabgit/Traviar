import { Eye, Play, Video, Link } from 'lucide-react';

export interface VideoCardData {
  id: string;
  thumbnail: string;
  views: number;
  itineraryTag?: string;
}

interface VideosTabProps {
  videos: VideoCardData[];
  isOwnProfile: boolean;
  onVideoClick: (id: string) => void;
  onUploadVideo?: () => void;
  onLinkTikTok?: () => void;
}

const formatViews = (views: number): string => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

export function VideosTab({ videos, isOwnProfile, onVideoClick, onUploadVideo, onLinkTikTok }: VideosTabProps) {
  // Empty state when no videos
  if (videos.length === 0) {
    if (isOwnProfile) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-20 h-20 rounded-full bg-gradient-sunset flex items-center justify-center mb-6">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Share your travel moments
          </h3>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            Upload videos from your trips or connect your TikTok to showcase your adventures
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onUploadVideo}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-coral-500
                       hover:bg-coral-600 text-white font-semibold transition-all
                       shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Video className="w-4 h-4" />
              Upload Video
            </button>
            <button
              onClick={onLinkTikTok}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-coral-500
                       hover:bg-coral-50 text-coral-600 font-semibold transition-all
                       transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link className="w-4 h-4" />
              Link TikTok
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-center">No videos yet</p>
        </div>
      );
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.map((video) => (
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
              {formatViews(video.views)}
            </span>
          </div>

          {video.itineraryTag && (
            <div className="absolute bottom-2 left-2 right-2">
              <span className="px-2 py-1 rounded bg-black/80 text-white text-xs font-medium
                           block truncate">
                From: {video.itineraryTag}
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
