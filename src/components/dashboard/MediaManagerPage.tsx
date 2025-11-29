import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Play, X, Loader2, Video as VideoIcon } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCreatorVideos } from '../../hooks/useCreatorVideos';
import { useManageVideos } from '../../hooks/useManageVideos';
import { VideoUploadModal } from './VideoUploadModal';
import { TravelVideo } from '../../types';

export function MediaManagerPage() {
  const { user } = useAuthContext();
  const { videos, loading, error, refetch } = useCreatorVideos(user?.id);
  const { updateVideo, deleteVideo, deleting } = useManageVideos();

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [editingVideo, setEditingVideo] = useState<TravelVideo | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationCountry, setLocationCountry] = useState('');

  const handleUpdateVideo = async () => {
    if (!editingVideo) return;

    const result = await updateVideo(editingVideo.id, {
      title: videoTitle,
      description: videoDescription,
      thumbnail_url: videoThumbnail,
      location_name: locationName,
      location_country: locationCountry,
    });

    if (result) {
      setShowEditModal(false);
      setEditingVideo(null);
      resetForm();
      refetch();
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    const result = await deleteVideo(videoId);
    if (result) {
      refetch();
    }
  };

  const openEditModal = (video: TravelVideo) => {
    setEditingVideo(video);
    setVideoTitle(video.title);
    setVideoDescription(video.description || '');
    setVideoThumbnail(video.thumbnail_url);
    setLocationName(video.location_name || '');
    setLocationCountry(video.location_country || '');
    setShowEditModal(true);
  };

  const resetForm = () => {
    setVideoTitle('');
    setVideoDescription('');
    setVideoThumbnail('');
    setLocationName('');
    setLocationCountry('');
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-coral-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Media Manager</h1>
          <p className="text-gray-600">Upload and manage your videos and content</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-coral-500
                   hover:bg-coral-600 text-white font-semibold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-medium">Error loading videos</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      <VideoUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={refetch}
      />

      {/* Edit Modal */}
      {showEditModal && editingVideo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Video</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingVideo(null);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={videoThumbnail}
                  onChange={(e) => setVideoThumbnail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Name
                  </label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={locationCountry}
                    onChange={(e) => setLocationCountry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingVideo(null);
                  resetForm();
                }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateVideo}
                className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                         text-white font-semibold transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <VideoIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos yet</h3>
          <p className="text-gray-600 mb-6">Upload your first video to get started.</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-coral-500
                     hover:bg-coral-600 text-white font-semibold transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Your First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all
                              flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="p-3 rounded-full bg-white hover:bg-gray-100 transition-all">
                    <Play className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full
                              bg-black/70 text-white text-xs">
                  <Eye className="w-3 h-3" />
                  {formatViewCount(video.view_count)}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 truncate">{video.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {video.source_platform}
                  </span>
                  {video.location_name && (
                    <span className="px-2 py-1 rounded-full bg-coral-100 text-coral-700 text-xs">
                      {video.location_name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(video)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                             text-gray-700 text-sm font-medium transition-all flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    disabled={deleting}
                    className="px-3 py-1.5 rounded-lg border border-red-300 hover:bg-red-50
                             text-red-700 text-sm font-medium transition-all disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
