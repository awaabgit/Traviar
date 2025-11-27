import { Image, Video, FileText, Plus } from 'lucide-react';

export function MediaTab() {
  return (
    <div className="bg-white rounded-2xl shadow-soft-lg p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Media</h2>

      <div className="max-w-3xl mx-auto">
        <div className="text-center py-12 mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center transform rotate-6">
                <Image className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center transform -rotate-12">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -left-4 bottom-0 w-14 h-14 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center transform rotate-12">
                <FileText className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Add your trip inspo
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Save posts, videos, photos, and files — all in one place
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Add media
          </button>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your media</h3>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No media added yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
