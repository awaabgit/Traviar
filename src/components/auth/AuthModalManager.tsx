import React, { useState } from 'react';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';

type AuthView = 'login' | 'signup';

interface AuthModalManagerProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: AuthView;
}

export function AuthModalManager({ isOpen, onClose, initialView = 'login' }: AuthModalManagerProps) {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);

  if (!isOpen) return null;

  return (
    <>
      {currentView === 'login' ? (
        <LoginModal
          onClose={onClose}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      ) : (
        <SignupModal
          onClose={onClose}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
    </>
  );
}
