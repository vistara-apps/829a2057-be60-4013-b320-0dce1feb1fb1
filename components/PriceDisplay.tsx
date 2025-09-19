'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatPrice, formatPercentage } from '@/lib/utils';

interface PriceDisplayProps {
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
}

export function PriceDisplay({ currentPrice, priceChange24h, volume24h }: PriceDisplayProps) {
  const [isLive, setIsLive] = useState(true);
  const isPositive = priceChange24h > 0;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-6 text-center">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <span className="text-lg font-bold text-foreground">$PENGU</span>
        <div className={`flex items-center space-x-1 ${isLive ? 'animate-pulse' : ''}`}>
          <Activity className="w-4 h-4 text-accent" />
          <span className="text-xs text-accent font-medium">LIVE</span>
        </div>
      </div>
      
      <div className="text-3xl font-bold text-foreground mb-2">
        {formatPrice(currentPrice)}
      </div>
      
      <div className={`flex items-center justify-center space-x-1 text-sm ${
        isPositive ? 'text-accent' : 'text-danger'
      }`}>
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span className="font-medium">
          {formatPercentage(priceChange24h)} (24h)
        </span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="text-xs text-muted">24h Volume</div>
        <div className="text-sm font-medium text-foreground">
          {(volume24h / 1000000).toFixed(1)}M PENGU
        </div>
      </div>
    </div>
  );
}
