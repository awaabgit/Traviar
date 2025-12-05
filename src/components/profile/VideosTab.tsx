import { Eye, Play, Video, Link, Plus } from 'lucide-react';
import { TravelVideo } from '../../types';

interface VideosTabProps {
  videos: TravelVideo[];
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Determine if video is vertical/short format
const isShortFormat = (video: TravelVideo): boolean => {
  // Use video_format if available, otherwise fall back to URL detection
  if (video.video_format) {
    return video.video_format === 'short';
  }

  // Fallback for old videos without video_format field
  if (!video.video_url) return false;
  const url = video.video_url.toLowerCase();
  return url.includes('tiktok.com') || url.includes('youtube.com/shorts');
};

// Determine platform badge
const getPlatformBadge = (video: TravelVideo): string => {
  if (!video.video_url) return video.source_platform;
  const url = video.video_url.toLowerCase();
  if (url.includes('tiktok.com')) return 'TikTok';
  if (url.includes('youtube.com/shorts')) return 'Shorts';
  if (url.includes('youtube.com')) return 'YouTube';
  return video.source_platform;
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// Get thumbnail URL with auto-generation and fallback
const getThumbnailUrl = (video: TravelVideo): string => {
  console.log('🔍 getThumbnailUrl called for video:', {
    id: video.id,
    title: video.title,
    thumbnail_url: video.thumbnail_url,
    video_url: video.video_url,
    source_platform: video.source_platform,
  });

  // If thumbnail_url exists and is valid, use it
  if (video.thumbnail_url) {
    console.log('✅ Using existing thumbnail_url:', video.thumbnail_url);
    return video.thumbnail_url;
  }

  // Try to auto-generate from video_url
  if (video.video_url) {
    const url = video.video_url.toLowerCase();

    // YouTube videos - auto-generate thumbnail
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(video.video_url);
      if (videoId) {
        const generatedUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        console.log('🎥 Auto-generated YouTube thumbnail:', generatedUrl, 'from video ID:', videoId);
        return generatedUrl;
      }
    }
  }

  // Fallback placeholder
  console.log('⚠️ Using fallback placeholder thumbnail');
  return 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400';
};

export function VideosTab({ videos, isOwnProfile, onVideoClick, onUploadVideo, onLinkTikTok }: VideosTabProps) {
  console.log('📹 VideosTab received videos:', videos);
  console.log('📹 Total videos count:', videos.length);

  // Separate videos into shorts and regular videos
  const shorts = videos.filter(isShortFormat);
  const regularVideos = videos.filter(video => !isShortFormat(video));

  console.log('📹 Shorts count:', shorts.length);
  console.log('📹 Regular videos count:', regularVideos.length);

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
    <div className="space-y-8">
      {/* Shorts Section */}
      {shorts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Shorts</h3>
            {isOwnProfile && (
              <button
                onClick={onUploadVideo}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600
                         text-white text-sm font-semibold transition-all transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
            {shorts.map((video) => (
              <button
                key={video.id}
                onClick={() => onVideoClick(video.id)}
                className="group flex-shrink-0 w-40"
              >
                {/* Vertical thumbnail */}
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100
                             hover:ring-2 hover:ring-coral-500 transition-all mb-2">
                  <img
                    src={getThumbnailUrl(video)}
                    alt={video.title}
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error('❌ Image failed to load for Shorts video:', video.id, 'Original src:', e.currentTarget.src);
                      e.currentTarget.src = 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                    onLoad={() => {
                      console.log('✅ Image loaded successfully for Shorts video:', video.id);
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-coral-600 ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Platform badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                      {getPlatformBadge(video)}
                    </span>
                  </div>
                </div>

                {/* Video info */}
                <div className="text-left">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Eye className="w-3 h-3" />
                    {formatViews(video.view_count)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Regular Videos Section */}
      {regularVideos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Videos</h3>
            {isOwnProfile && (
              <button
                onClick={onUploadVideo}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600
                         text-white text-sm font-semibold transition-all transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => onVideoClick(video.id)}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all text-left"
              >
                {/* Horizontal thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={getThumbnailUrl(video)}
                    alt={video.title}
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error('❌ Image failed to load for Regular video:', video.id, 'Original src:', e.currentTarget.src);
                      e.currentTarget.src = 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                    onLoad={() => {
                      console.log('✅ Image loaded successfully for Regular video:', video.id);
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-coral-600 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Video info */}
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
                    {video.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatViews(video.view_count)}
                    </div>
                    <span>•</span>
                    <span>{formatDate(video.created_at)}</span>
                  </div>

                  {video.description && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {video.description}
                    </p>
                  )}

                  {video.location_name && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-coral-50 text-coral-700 text-xs font-medium">
                        📍 {video.location_name}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
