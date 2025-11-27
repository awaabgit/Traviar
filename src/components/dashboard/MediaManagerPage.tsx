import { useState } from 'react';
import { Plus, Upload, Link as LinkIcon, Edit, Trash2, Eye, Play, X, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  source: 'upload' | 'tiktok' | 'youtube';
  views: string;
  linkedItinerary?: string;
  featured: boolean;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Weekend in Paris - Day 1',
    source: 'tiktok',
    views: '2.3M',
    linkedItinerary: 'Weekend in Paris',
    featured: true,
  },
  {
    id: '2',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Barcelona Food Tour',
    source: 'tiktok',
    views: '1.8M',
    linkedItinerary: 'Barcelona on a Budget',
    featured: true,
  },
  {
    id: '3',
    thumbnail: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Hidden Gems in Rome',
    source: 'upload',
    views: '950K',
    featured: false,
  },
];

export function MediaManagerPage() {
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'tiktok' | 'youtube'>('file');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

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

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add New Video</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 mb-6">
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
            </div>

            {uploadMethod === 'file' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-coral-500 transition-all cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">MP4, MOV, AVI (max 500MB)</p>
                </div>
              </div>
            )}

            {uploadMethod === 'tiktok' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok Video URL
                  </label>
                  <input
                    type="url"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@username/video/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste the full URL of your TikTok video</p>
                </div>
              </div>
            )}

            {uploadMethod === 'youtube' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste the full URL of your YouTube video</p>
                </div>
              </div>
            )}

            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
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
                  Link to Itinerary (Optional)
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500">
                  <option value="">No itinerary</option>
                  <option value="1">Weekend in Paris</option>
                  <option value="2">Barcelona on a Budget</option>
                  <option value="3">Rome in 5 Days</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" className="rounded" />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Set as featured video
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                               text-white font-semibold transition-all">
                Upload Video
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all
                            flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="p-3 rounded-full bg-white hover:bg-gray-100 transition-all">
                  <Play className="w-6 h-6 text-gray-900" />
                </button>
              </div>
              {video.featured && (
                <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-coral-500 text-white text-xs font-medium">
                  Featured
                </span>
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full
                            bg-black/70 text-white text-xs">
                <Eye className="w-3 h-3" />
                {video.views}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 truncate">{video.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                  {video.source}
                </span>
                {video.linkedItinerary && (
                  <span className="px-2 py-1 rounded-full bg-coral-100 text-coral-700 text-xs flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" />
                    Linked
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                                 text-gray-700 text-sm font-medium transition-all flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-red-300 hover:bg-red-50
                                 text-red-700 text-sm font-medium transition-all">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
