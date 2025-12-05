import { X, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { TravelVideo } from '../../types';

interface VideoDrawerProps {
  videoId: string | null;
  onClose: () => void;
  onVideoSelect: (videoId: string) => void;
}

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

// YouTube embed component
function YouTubeEmbed({ url }: { url: string }) {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <p className="text-white">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-xl"
      ></iframe>
    </div>
  );
}

// TikTok embed component
function TikTokEmbed({ url }: { url: string }) {
  return (
    <div className="aspect-[9/16] max-h-[600px] rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
      <div className="text-center p-6">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <p className="text-white text-sm mb-3">TikTok Video</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          View on TikTok
        </a>
      </div>
    </div>
  );
}

// HTML5 video player for uploaded files
function UploadedVideoPlayer({ url }: { url: string }) {
  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black">
      <video
        controls
        src={url}
        className="w-full h-full"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

// Get thumbnail URL with auto-generation and fallback
const getThumbnailUrl = (video: TravelVideo): string => {
  // If thumbnail_url exists and is valid, use it
  if (video.thumbnail_url) {
    return video.thumbnail_url;
  }

  // Try to auto-generate from video_url
  if (video.video_url) {
    const url = video.video_url.toLowerCase();

    // YouTube videos - auto-generate thumbnail
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(video.video_url);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
  }

  // Fallback placeholder
  return 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400';
};

export function VideoDrawer({ videoId, onClose, onVideoSelect }: VideoDrawerProps) {
  const [video, setVideo] = useState<TravelVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<TravelVideo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoId) {
      setVideo(null);
      setRelatedVideos([]);
      return;
    }

    const fetchVideoData = async () => {
      setLoading(true);
      try {
        // Fetch the main video
        const { data: videoData, error: videoError } = await supabase
          .from('travel_videos')
          .select('*')
          .eq('id', videoId)
          .single();

        if (videoError) throw videoError;
        setVideo(videoData);

        // Fetch related videos from the same creator (excluding current video)
        if (videoData?.creator_user_id) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('travel_videos')
            .select('*')
            .eq('creator_user_id', videoData.creator_user_id)
            .neq('id', videoId)
            .order('created_at', { ascending: false })
            .limit(3);

          if (!relatedError && relatedData) {
            setRelatedVideos(relatedData);
          }
        }
      } catch (err) {
        console.error('Error fetching video:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl
                   overflow-y-auto animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4
                      flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Video Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {loading ? (
          <div className="p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
          </div>
        ) : video ? (
          <div className="p-6 space-y-6">
            {/* Video Player */}
            {video.source_platform === 'youtube' && video.video_url && (
              <YouTubeEmbed url={video.video_url} />
            )}
            {video.source_platform === 'tiktok' && video.video_url && (
              <TikTokEmbed url={video.video_url} />
            )}
            {video.source_platform === 'traviar' && video.video_url && (
              <UploadedVideoPlayer url={video.video_url} />
            )}

            {/* Video Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-gray-600 leading-relaxed">
                  {video.description}
                </p>
              )}
              {video.location_name && (
                <p className="text-sm text-coral-600 font-medium mt-2">
                  📍 {video.location_name}{video.location_country ? `, ${video.location_country}` : ''}
                </p>
              )}
            </div>

            {/* From Itinerary Section - TODO: Implement when itinerary connection is ready */}
            {/* Keeping this commented for future implementation
            <div className="rounded-xl bg-gradient-to-br from-coral-50 to-orange-50 p-6 border border-coral-200">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=120"
                  alt="Itinerary"
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-coral-600 uppercase mb-1">
                    From Itinerary
                  </p>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Weekend in Paris
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    3 days · 12 stops · $19
                  </p>

                  <button
                    onClick={onOpenItinerary}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-coral-500
                             hover:bg-coral-600 text-white text-sm font-semibold
                             transition-all shadow-sm hover:shadow-md
                             transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Open Itinerary
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            */}

            {/* More from this creator */}
            {relatedVideos.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">More from this creator</h4>
                <div className="grid grid-cols-3 gap-3">
                  {relatedVideos.map((relatedVideo) => (
                    <button
                      key={relatedVideo.id}
                      onClick={() => onVideoSelect(relatedVideo.id)}
                      className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100
                               hover:ring-2 hover:ring-coral-500 transition-all"
                    >
                      <img
                        src={getThumbnailUrl(relatedVideo)}
                        alt={relatedVideo.title}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* External Link */}
            {video.video_url && (
              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg
                         border-2 border-gray-300 hover:border-coral-500 hover:bg-coral-50
                         text-gray-700 hover:text-coral-700 font-semibold transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {video.source_platform === 'youtube' ? 'View on YouTube' :
                 video.source_platform === 'tiktok' ? 'View on TikTok' :
                 'View Original'}
              </a>
            )}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Video not found
          </div>
        )}
      </div>
    </div>
  );
}
