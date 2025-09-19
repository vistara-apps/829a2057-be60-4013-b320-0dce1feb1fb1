'use client';

import { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'loading';
  children: React.ReactNode;
}

export function PrimaryButton({ 
  variant = 'default', 
  children, 
  disabled,
  className = '',
  ...props 
}: PrimaryButtonProps) {
  const isLoading = variant === 'loading';
  
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`btn-primary ${className} ${
        (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
