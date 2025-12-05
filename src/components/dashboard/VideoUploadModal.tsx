import { useState, useEffect, useRef } from 'react';
import { Upload, Link as LinkIcon, Play, X, Loader2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useManageVideos } from '../../hooks/useManageVideos';
import { supabase } from '../../lib/supabase';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Popular countries list for the dropdown
const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
  'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
  'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden',
  'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe'
];

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

// Generate YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};


export function VideoUploadModal({ isOpen, onClose, onSuccess }: VideoUploadModalProps) {
  const { user } = useAuthContext();
  const { createVideo, creating } = useManageVideos();

  const [uploadMethod, setUploadMethod] = useState<'file' | 'tiktok' | 'youtube'>('tiktok');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [autoThumbnail, setAutoThumbnail] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [videoFormat, setVideoFormat] = useState<'short' | 'standard'>('short');

  // File upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate thumbnail when URL changes
  useEffect(() => {
    if (!videoUrl) {
      setAutoThumbnail('');
      return;
    }

    const url = videoUrl.toLowerCase();

    // YouTube videos - auto-generate thumbnail
    if (uploadMethod === 'youtube') {
      const videoId = getYouTubeVideoId(videoUrl);
      if (videoId) {
        setAutoThumbnail(getYouTubeThumbnail(videoId));
      }

      // Auto-detect format from URL
      if (url.includes('youtube.com/shorts')) {
        setVideoFormat('short');
      } else if (url.includes('youtube.com/watch')) {
        setVideoFormat('standard');
      }
    } else if (uploadMethod === 'tiktok') {
      // TikTok videos are always short format
      setVideoFormat('short');
      // For TikTok, we'll use a placeholder until we implement TikTok API
      setAutoThumbnail('https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400');
    }
  }, [videoUrl, uploadMethod]);

  // File validation
  const validateFile = (file: File): string | null => {
    const maxSize = 500 * 1024 * 1024; // 500MB
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']; // .mp4, .mov, .avi

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload MP4, MOV, or AVI files only.';
    }

    if (file.size > maxSize) {
      return 'File size exceeds 500MB limit.';
    }

    return null;
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setSelectedFile(file);
    setUploadError(null);

    // Auto-populate title from filename if empty
    if (!videoTitle) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      setVideoTitle(nameWithoutExt);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Generate thumbnail from video
  const generateThumbnail = (videoFile: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.preload = 'metadata';
      video.muted = true;

      video.onloadeddata = () => {
        // Seek to 1 second or 10% of video, whichever is less
        video.currentTime = Math.min(1, video.duration * 0.1);
      };

      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to generate thumbnail'));
            }
          }, 'image/jpeg', 0.8);
        } else {
          reject(new Error('Canvas context not available'));
        }
      };

      video.onerror = () => {
        reject(new Error('Failed to load video for thumbnail'));
      };

      video.src = URL.createObjectURL(videoFile);
    });
  };

  // Upload file to Supabase Storage
  const handleFileUpload = async () => {
    if (!user || !selectedFile) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}_${selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload video file
      const { error: videoError } = await supabase.storage
        .from('videos')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (videoError) throw videoError;

      // Get public URL for video
      const { data: { publicUrl: videoPublicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      setUploadProgress(50);

      // Generate and upload thumbnail
      let thumbnailUrl = '';
      try {
        const thumbnailBlob = await generateThumbnail(selectedFile);
        const thumbnailFileName = `${timestamp}_${selectedFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
        const thumbnailPath = `${user.id}/thumbnails/${thumbnailFileName}`;

        const { error: thumbnailError } = await supabase.storage
          .from('videos')
          .upload(thumbnailPath, thumbnailBlob, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
            upsert: false,
          });

        if (!thumbnailError) {
          const { data: { publicUrl: thumbPublicUrl } } = supabase.storage
            .from('videos')
            .getPublicUrl(thumbnailPath);
          thumbnailUrl = thumbPublicUrl;
        }
      } catch (thumbError) {
        console.error('Failed to generate thumbnail:', thumbError);
        // Use placeholder if thumbnail generation fails
        thumbnailUrl = 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=400';
      }

      setUploadProgress(75);

      // Create video record in database
      const result = await createVideo(
        user.id,
        user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown',
        user.user_metadata?.avatar_url || '',
        {
          title: videoTitle,
          description: videoDescription,
          thumbnail_url: thumbnailUrl,
          video_url: videoPublicUrl,
          source_platform: 'traviar',
          video_format: videoFormat,
          location_name: locationName,
          location_country: locationCountry,
        }
      );

      if (!result) {
        throw new Error('Failed to create video record');
      }

      setUploadProgress(100);

      // Success!
      setTimeout(() => {
        resetForm();
        onSuccess();
        onClose();
      }, 500);

    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Failed to upload video');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateVideo = async () => {
    if (!user) return;
    if (!videoTitle.trim()) {
      alert('Please enter a video title');
      return;
    }

    // For file uploads, use the file upload handler
    if (uploadMethod === 'file') {
      if (!selectedFile) {
        alert('Please select a video file');
        return;
      }
      await handleFileUpload();
      return;
    }

    // For URL-based uploads (TikTok, YouTube)
    const result = await createVideo(
      user.id,
      user.user_metadata?.username || user.email?.split('@')[0] || 'Unknown',
      user.user_metadata?.avatar_url || '',
      {
        title: videoTitle,
        description: videoDescription,
        thumbnail_url: autoThumbnail, // Don't use fallback - let the component handle it
        video_url: videoUrl || undefined,
        source_platform: uploadMethod as 'tiktok' | 'youtube',
        video_format: videoFormat,
        external_video_id: videoUrl,
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
    setAutoThumbnail('');
    setLocationName('');
    setLocationCountry('');
    setVideoFormat('short');
    setSelectedFile(null);
    setUploadProgress(0);
    setUploading(false);
    setUploadError(null);
    setIsDragging(false);
  };

  const handleClose = () => {
    // Prevent closing while uploading
    if (uploading) {
      return;
    }
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
            disabled={uploading}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUploadMethod('tiktok')}
            disabled={uploading}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
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
            disabled={uploading}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
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
            disabled={uploading}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
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
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="hidden"
            />

            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-300 hover:border-coral-500'
                }`}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {isDragging ? 'Drop video here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">MP4, MOV, AVI (max 500MB)</p>
              </div>
            ) : (
              <div className="border-2 border-coral-500 bg-coral-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Play className="w-8 h-8 text-coral-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-600">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1 hover:bg-coral-100 rounded"
                    type="button"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {uploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">Uploading...</span>
                      <span className="text-xs font-medium text-gray-700">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-coral-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {/* Video Format Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Format *
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setVideoFormat('short')}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  videoFormat === 'short'
                    ? 'border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-sm mb-1">Shorts (Vertical)</div>
                <div className="text-xs opacity-75">9:16 aspect ratio</div>
              </button>
              <button
                type="button"
                onClick={() => setVideoFormat('standard')}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                  videoFormat === 'standard'
                    ? 'border-coral-500 bg-coral-50 text-coral-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-sm mb-1">Video (Horizontal)</div>
                <div className="text-xs opacity-75">16:9 aspect ratio</div>
              </button>
            </div>
          </div>

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

          {autoThumbnail && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Preview
              </label>
              <div className="relative aspect-video w-48 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={autoThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Auto-generated from video URL</p>
            </div>
          )}

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
              <select
                value={locationCountry}
                onChange={(e) => setLocationCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 bg-white"
              >
                <option value="">Select country...</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
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
            disabled={creating || uploading}
            className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                     text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {(creating || uploading) ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploading ? `Uploading... ${uploadProgress}%` : 'Creating...'}
              </>
            ) : (
              uploadMethod === 'file' ? 'Upload Video' : 'Add Video'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
