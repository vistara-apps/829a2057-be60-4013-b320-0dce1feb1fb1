'use client';

import { Settings, Bell } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  hasUnreadAlerts: boolean;
}

export function Header({ onSettingsClick, hasUnreadAlerts }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🐧</div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PENGU Watch</h1>
              <p className="text-xs text-muted">Never miss a big trade</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {hasUnreadAlerts && (
              <div className="relative">
                <Bell className="w-5 h-5 text-accent animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full"></div>
              </div>
            )}
            <button
              onClick={onSettingsClick}
              className="p-2 text-muted hover:text-foreground transition-colors duration-200 rounded-md hover:bg-surface"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
