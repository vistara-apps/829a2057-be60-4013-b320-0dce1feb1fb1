'use client';

import { AlertCardProps } from '@/lib/types';
import { formatPrice, formatVolume, formatPercentage, formatTimeAgo, getExchangeColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

export function AlertCard({ alert, variant = 'default', onMarkAsRead }: AlertCardProps) {
  const isPositive = alert.priceChangePercent > 0;
  const isHighlight = variant === 'highlight' || !alert.isRead;
  
  return (
    <div className={`alert-card ${isHighlight ? 'alert-highlight' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-accent' : 'bg-danger'} animate-pulse-slow`}></div>
          <span className={`text-sm font-medium ${getExchangeColor(alert.exchange)}`}>
            {alert.exchange.toUpperCase()}
          </span>
          <span className="text-xs text-muted flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeAgo(alert.timestamp)}
          </span>
        </div>
        {!alert.isRead && (
          <button
            onClick={() => onMarkAsRead?.(alert.alertId)}
            className="text-xs text-primary hover:text-blue-400 transition-colors duration-200"
          >
            Mark as read
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Current Price</span>
          <span className="font-semibold text-foreground">
            {formatPrice(alert.currentPrice)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Volume</span>
          <span className="font-medium text-foreground flex items-center">
            <DollarSign className="w-3 h-3 mr-1" />
            {formatVolume(alert.tradeVolume)} PENGU
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Price Change</span>
          <span className={`font-medium flex items-center ${isPositive ? 'text-accent' : 'text-danger'}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {formatPercentage(alert.priceChangePercent)}
          </span>
        </div>
      </div>
      
      {isHighlight && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <p className="text-xs text-muted">
            🚨 Big PENGU trade detected! {formatVolume(alert.tradeVolume)} PENGU traded at {formatPrice(alert.currentPrice)}
          </p>
        </div>
      )}
    </div>
  );
}
