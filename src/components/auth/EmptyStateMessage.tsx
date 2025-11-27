import React from 'react';
import { Lock, LogIn, UserPlus } from 'lucide-react';

interface EmptyStateMessageProps {
  title: string;
  message: string;
  onLoginClick: () => void;
}

export function EmptyStateMessage({ title, message, onLoginClick }: EmptyStateMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md px-6 py-12 animate-fade-in">
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-sunset shadow-lg animate-scale-in">
          <Lock className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {title}
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onLoginClick}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                       bg-gradient-to-r from-coral-500 to-coral-600 text-white
                       hover:from-coral-600 hover:to-coral-700
                       transition-all duration-200 font-semibold shadow-lg shadow-coral-500/30
                       transform hover:scale-105 active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>

          <button
            onClick={onLoginClick}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                       bg-white text-gray-700 border-2 border-gray-300
                       hover:border-coral-500 hover:text-coral-600
                       transition-all duration-200 font-semibold
                       transform hover:scale-105 active:scale-95"
          >
            <UserPlus className="w-5 h-5" />
            Sign Up
          </button>
        </div>

        {/* Additional hint */}
        <p className="mt-6 text-sm text-gray-500">
          Create an account to unlock all features
        </p>
      </div>
    </div>
  );
}
