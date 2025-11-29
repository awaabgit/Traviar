import { useState } from 'react';
import { Plus, Upload, Link as LinkIcon, Play, X, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useManageVideos } from '../../hooks/useManageVideos';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function VideoUploadModal({ isOpen, onClose, onSuccess }: VideoUploadModalProps) {
  const { user } = useAuthContext();
  const { createVideo, creating } = useManageVideos();

  const [uploadMethod, setUploadMethod] = useState<'file' | 'tiktok' | 'youtube'>('tiktok');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationCountry, setLocationCountry] = useState('');

  const handleCreateVideo = async () => {
    if (!user) return;
    if (!videoTitle.trim()) {
      alert('Please enter a video title');
      return;
    }

    const platform = uploadMethod === 'file' ? 'traviar' : uploadMethod;

    const result = await createVideo(
      user.id,
      user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown',
      user.user_metadata?.avatar_url || '',
      {
        title: videoTitle,
        description: videoDescription,
        thumbnail_url: videoThumbnail || 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400',
        video_url: videoUrl || undefined,
        source_platform: platform as 'traviar' | 'tiktok' | 'youtube',
        external_video_id: uploadMethod !== 'file' ? videoUrl : undefined,
        location_name: locationName,
        location_country: locationCountry,
      }
    );

    if (result) {
      resetForm();
      onSuccess();
      onClose();
    }
  };

  const resetForm = () => {
    setVideoUrl('');
    setVideoTitle('');
    setVideoDescription('');
    setVideoThumbnail('');
    setLocationName('');
    setLocationCountry('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Video</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUploadMethod('tiktok')}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
              uploadMethod === 'tiktok'
                ? 'border-coral-500 bg-coral-50 text-coral-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LinkIcon className="w-5 h-5 mx-auto mb-1" />
            <p className="text-sm font-medium">TikTok Link</p>
          </button>
          <button
            onClick={() => setUploadMethod('youtube')}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
              uploadMethod === 'youtube'
                ? 'border-coral-500 bg-coral-50 text-coral-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Play className="w-5 h-5 mx-auto mb-1" />
            <p className="text-sm font-medium">YouTube Link</p>
          </button>
          <button
            onClick={() => setUploadMethod('file')}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
              uploadMethod === 'file'
                ? 'border-coral-500 bg-coral-50 text-coral-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Upload className="w-5 h-5 mx-auto mb-1" />
            <p className="text-sm font-medium">Upload File</p>
          </button>
        </div>

        {(uploadMethod === 'tiktok' || uploadMethod === 'youtube') && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {uploadMethod === 'tiktok' ? 'TikTok' : 'YouTube'} Video URL
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={uploadMethod === 'tiktok'
                  ? 'https://www.tiktok.com/@username/video/...'
                  : 'https://youtube.com/watch?v=...'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
          </div>
        )}

        {uploadMethod === 'file' && (
          <div className="space-y-4 mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-coral-500 transition-all cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">MP4, MOV, AVI (max 500MB)</p>
              <p className="text-xs text-gray-400 mt-2">Note: File upload not yet implemented</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Title *
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Give your video a title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              rows={3}
              placeholder="Describe your video..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail URL (Optional)
            </label>
            <input
              type="url"
              value={videoThumbnail}
              onChange={(e) => setVideoThumbnail(e.target.value)}
              placeholder="https://example.com/thumbnail.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Name (Optional)
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g., Paris"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country (Optional)
              </label>
              <input
                type="text"
                value={locationCountry}
                onChange={(e) => setLocationCountry(e.target.value)}
                placeholder="e.g., France"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                     text-gray-700 font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateVideo}
            disabled={creating}
            className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                     text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {creating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload Video'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
