import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Lock, Globe, X, Loader2, FolderOpen } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCreatorCollections } from '../../hooks/useCreatorCollections';
import { useManageCollections } from '../../hooks/useManageCollections';
import { MarketplaceCollection } from '../../types';

export function CollectionsManagerPage() {
  const { user } = useAuthContext();
  const { collections, loading, error, refetch } = useCreatorCollections(user?.id);
  const { createCollection, updateCollection, deleteCollection, creating, deleting } = useManageCollections();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<MarketplaceCollection | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCoverImage, setNewCoverImage] = useState('');

  const handleCreateCollection = async () => {
    if (!user) return;
    if (!newTitle.trim()) {
      alert('Please enter a collection title');
      return;
    }

    const result = await createCollection(user.id, {
      title: newTitle,
      description: newDescription,
      cover_image_url: newCoverImage || 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=600',
      itinerary_ids: [],
    });

    if (result) {
      setShowCreateModal(false);
      resetForm();
      refetch();
    }
  };

  const handleUpdateCollection = async () => {
    if (!editingCollection) return;

    const result = await updateCollection(editingCollection.id, {
      title: newTitle,
      description: newDescription,
      cover_image_url: newCoverImage,
    });

    if (result) {
      setShowEditModal(false);
      setEditingCollection(null);
      resetForm();
      refetch();
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;

    const result = await deleteCollection(collectionId);
    if (result) {
      refetch();
    }
  };

  const openEditModal = (collection: MarketplaceCollection) => {
    setEditingCollection(collection);
    setNewTitle(collection.title);
    setNewDescription(collection.description || '');
    setNewCoverImage(collection.cover_image_url);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewCoverImage('');
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-medium">Error loading collections</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Collection</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
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
                  Collection Title *
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
                  Description (Optional)
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
                  Cover Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                disabled={creating}
                className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                         text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Collection'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingCollection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Collection</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCollection(null);
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
                  Collection Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCollection(null);
                  resetForm();
                }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50
                         text-gray-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCollection}
                className="flex-1 px-4 py-2.5 rounded-lg bg-coral-500 hover:bg-coral-600
                         text-white font-semibold transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collections Grid */}
      {collections.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No collections yet</h3>
          <p className="text-gray-600 mb-6">Create your first collection to organize your itineraries.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-coral-500
                     hover:bg-coral-600 text-white font-semibold transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create Your First Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-video">
                <img
                  src={collection.cover_image_url}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                  {collection.itinerary_ids?.length || 0} items
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{collection.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{collection.description}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(collection)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                             text-gray-700 text-sm font-medium transition-all flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                             text-gray-700 text-sm font-medium transition-all flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteCollection(collection.id)}
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
