import { ArrowLeft } from 'lucide-react';
import { EditProfilePage } from './EditProfilePage';

interface EditProfileStandaloneProps {
  onBack: (showSuccessToast?: boolean) => void;
}

export function EditProfileStandalone({ onBack }: EditProfileStandaloneProps) {
  const handleNavigateToProfile = () => {
    onBack(true); // Pass true to indicate profile was updated
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => onBack(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-coral-600
                     font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <EditProfilePage onNavigateToProfile={handleNavigateToProfile} />
      </main>
    </div>
  );
}
