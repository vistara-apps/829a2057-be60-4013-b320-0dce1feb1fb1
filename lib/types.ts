export interface User {
  userId: string;
  web3Address?: string;
  notificationPreferences: NotificationPreferences;
  activeTriggers: Trigger[];
  isPremium: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  channels: ('frame' | 'push')[];
  quietHours?: {
    start: string;
    end: string;
  };
}

export interface Trigger {
  triggerId: string;
  userId: string;
  exchange: Exchange;
  minVolume?: number;
  minPriceChangePercent?: number;
  timeframe: number; // in minutes
  isActive: boolean;
  createdAt: Date;
}

export interface Alert {
  alertId: string;
  triggerId: string;
  timestamp: Date;
  exchange: Exchange;
  tradeVolume: number;
  priceChangePercent: number;
  currentPrice: number;
  previousPrice: number;
  isRead: boolean;
}

export interface TradeData {
  exchange: Exchange;
  symbol: string;
  price: number;
  volume: number;
  timestamp: Date;
  priceChange24h: number;
  priceChangePercent24h: number;
}

export type Exchange = 'binance' | 'coinbase' | 'kraken' | 'okx' | 'bybit';

export interface TriggerFormData {
  exchange: Exchange;
  minVolume: string;
  minPriceChangePercent: string;
  timeframe: string;
}

export interface AlertCardProps {
  alert: Alert;
  variant?: 'default' | 'highlight';
  onMarkAsRead?: (alertId: string) => void;
}

export interface TriggerInputProps {
  variant: 'volume' | 'priceChange' | 'exchangeSelect';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  options?: { value: string; label: string }[];
}

export interface NotificationToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}
