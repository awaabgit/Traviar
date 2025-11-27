import { X, ChevronUp, ChevronDown, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TravelVideo } from '../types';
import { VideoDetailsPanel } from './VideoDetailsPanel';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: TravelVideo[];
  initialIndex: number;
}

export function VideoPlayerModal({ isOpen, onClose, videos, initialIndex }: VideoPlayerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, videos.length, onClose]);

  useEffect(() => {
    if (isOpen) {
      const currentVideo = videos[currentIndex];
      setIsLiked(currentVideo.is_liked || false);
      setIsSaved(currentVideo.is_saved || false);
    }
  }, [currentIndex, videos, isOpen]);

  if (!isOpen) return null;

  const currentVideo = videos[currentIndex];

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl mx-4 h-[90vh] flex bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalFadeIn 0.3s ease-out',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm
                   hover:bg-white transition-all shadow-lg"
        >
          <X className="w-5 h-5 text-gray-900" />
        </button>

        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
          <span className="text-sm font-medium text-gray-900">
            {currentIndex + 1} / {videos.length}
          </span>
        </div>

        <div className="relative flex-1 bg-black flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={currentVideo.thumbnail_url}
              alt={currentVideo.title}
              className="max-w-full max-h-full object-contain"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

            <div className="absolute right-6 bottom-24 flex flex-col gap-5">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                              hover:bg-white/30 transition-all flex items-center justify-center
                              shadow-lg group-hover:scale-110 duration-200">
                  <Heart
                    className={`w-6 h-6 transition-all ${
                      isLiked ? 'fill-coral-500 text-coral-500' : 'text-white'
                    }`}
                  />
                </div>
                <span className="text-white text-sm font-semibold drop-shadow-lg">
                  {(currentVideo.like_count || 0) + (isLiked ? 1 : 0) > 0
                    ? ((currentVideo.like_count || 0) + (isLiked ? 1 : 0)).toLocaleString()
                    : ''}
                </span>
              </button>

              <button className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                              hover:bg-white/30 transition-all flex items-center justify-center
                              shadow-lg group-hover:scale-110 duration-200">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-sm font-semibold drop-shadow-lg">
                  {currentVideo.comment_count || 0}
                </span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                              hover:bg-white/30 transition-all flex items-center justify-center
                              shadow-lg group-hover:scale-110 duration-200">
                  <Bookmark
                    className={`w-6 h-6 transition-all ${
                      isSaved ? 'fill-white text-white' : 'text-white'
                    }`}
                  />
                </div>
              </button>

              <button className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                              hover:bg-white/30 transition-all flex items-center justify-center
                              shadow-lg group-hover:scale-110 duration-200">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
              </button>
            </div>

            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute top-6 left-1/2 -translate-x-1/2
                         p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30
                         transition-all shadow-lg hover:scale-110 duration-200"
              >
                <ChevronUp className="w-6 h-6 text-white" />
              </button>
            )}

            {currentIndex < videos.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute bottom-6 left-1/2 -translate-x-1/2
                         p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30
                         transition-all shadow-lg hover:scale-110 duration-200"
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="w-[420px] flex-shrink-0 border-l border-gray-200">
          <VideoDetailsPanel video={currentVideo} onClose={onClose} />
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
