import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { EmptyStateMessage } from './EmptyStateMessage';

interface ProtectedViewProps {
  children: React.ReactNode;
  onRequireAuth: () => void;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}

export function ProtectedView({
  children,
  onRequireAuth,
  emptyStateTitle = "Authentication Required",
  emptyStateMessage = "Please login or signup to access this feature"
}: ProtectedViewProps) {
  const { user, loading } = useAuthContext();

  // While checking auth, show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent"></div>
      </div>
    );
  }

  // If user is not authenticated, show empty state with login prompt
  if (!user) {
    return (
      <EmptyStateMessage
        title={emptyStateTitle}
        message={emptyStateMessage}
        onLoginClick={onRequireAuth}
      />
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
