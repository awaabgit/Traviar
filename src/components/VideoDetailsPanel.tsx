import { MapPin, Calendar, Eye, TrendingUp, Tag, Flag, Plus, Heart, Bookmark } from 'lucide-react';
import { TravelVideo, VideoComment } from '../types';
import { useState } from 'react';

interface VideoDetailsPanelProps {
  video: TravelVideo;
  onClose: () => void;
}

export function VideoDetailsPanel({ video, onClose }: VideoDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'comments'>('details');
  const [commentText, setCommentText] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setCommentText('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {video.creator_avatar_url ? (
                <img
                  src={video.creator_avatar_url}
                  alt={video.creator_username}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral-400 to-coral-600
                              flex items-center justify-center text-white font-semibold">
                  {video.creator_username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">@{video.creator_username}</h3>
                {video.source_platform === 'tiktok' && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    TikTok
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{formatDate(video.created_at)}</p>
            </div>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isFollowing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-coral-500 text-white hover:bg-coral-600'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h2>
            <p className="text-gray-700 leading-relaxed">{video.description}</p>
          </div>

          <div className="flex items-center gap-6 py-4 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {formatNumber(video.view_count)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {formatNumber(video.like_count)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {formatNumber(video.share_count)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-coral-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{video.location_name}</p>
                <p className="text-sm text-gray-600">{video.location_country}</p>
              </div>
            </div>
          </div>

          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100
                           text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag.tag_name}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5
                             bg-coral-500 text-white rounded-lg hover:bg-coral-600
                             transition-colors font-medium">
              <Plus className="w-4 h-4" />
              Add to Trip
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5
                             border border-gray-300 text-gray-700 rounded-lg
                             hover:bg-gray-50 transition-colors font-medium">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-coral-500 text-coral-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === 'comments'
                    ? 'border-coral-500 text-coral-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Comments ({video.comment_count})
              </button>
            </div>

            {activeTab === 'details' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-600 font-medium">Published</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(video.created_at)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-600 font-medium">Total Views</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatNumber(video.view_count)}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <Flag className="w-4 h-4" />
                    Report content
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600
                                flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    U
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent
                               resize-none text-sm"
                      rows={2}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        className="px-4 py-1.5 bg-coral-500 text-white rounded-lg text-sm font-medium
                                 hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed
                                 transition-colors"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {video.comments && video.comments.length > 0 ? (
                    video.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600
                                      flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">
                              {comment.user?.username || 'Anonymous'}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment_text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-sm text-gray-500 py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
