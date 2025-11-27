import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Lock, Globe, MoreVertical, X } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  visibility: 'public' | 'private';
  createdAt: string;
}

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: '1',
    title: 'European Cities',
    description: 'My favorite destinations across Europe',
    thumbnail: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=300',
    itemCount: 12,
    visibility: 'public',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Budget Travel Tips',
    description: 'Places and tips for traveling on a budget',
    thumbnail: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=300',
    itemCount: 8,
    visibility: 'public',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Hidden Gems',
    description: 'Secret spots I discovered',
    thumbnail: 'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=300',
    itemCount: 15,
    visibility: 'private',
    createdAt: '2024-01-05',
  },
];

export function CollectionsManagerPage() {
  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newVisibility, setNewVisibility] = useState<'public' | 'private'>('public');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Collections Manager</h1>
          <p className="text-gray-600">Organize your content into collections</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-coral-500
                   hover:bg-coral-600 text-white font-semibold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Collection
        </button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Collection</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Best Beaches in Europe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe this collection..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewVisibility('public')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      newVisibility === 'public'
                        ? 'border-coral-500 bg-coral-50 text-coral-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Public</span>
                  </button>
                  <button
                    onClick={() => setNewVisibility('private')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      newVisibility === 'private'
                        ? 'border-coral-500 bg-coral-50 text-coral-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span className="font-medium">Private</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                               text-white font-semibold transition-all">
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative aspect-video">
              <img
                src={collection.thumbnail}
                alt={collection.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                {collection.visibility === 'public' ? (
                  <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Public
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-gray-900 text-white text-xs font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Private
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                {collection.itemCount} items
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">{collection.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{collection.description}</p>

              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                                 text-gray-700 text-sm font-medium transition-all flex items-center justify-center gap-1">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                                 text-gray-700 text-sm font-medium transition-all flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  View
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
