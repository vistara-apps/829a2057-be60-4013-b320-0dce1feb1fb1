'use client';

import { NotificationToggleProps } from '@/lib/types';
import { Bell, BellOff } from 'lucide-react';

export function NotificationToggle({ enabled, onChange, label }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 card">
      <div className="flex items-center space-x-3">
        {enabled ? (
          <Bell className="w-5 h-5 text-accent" />
        ) : (
          <BellOff className="w-5 h-5 text-muted" />
        )}
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          enabled ? 'bg-accent' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
