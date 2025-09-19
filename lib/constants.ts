import { Exchange } from './types';

export const EXCHANGES: { value: Exchange; label: string }[] = [
  { value: 'binance', label: 'Binance' },
  { value: 'coinbase', label: 'Coinbase' },
  { value: 'kraken', label: 'Kraken' },
  { value: 'okx', label: 'OKX' },
  { value: 'bybit', label: 'Bybit' },
];

export const TIMEFRAMES = [
  { value: '5', label: '5 minutes' },
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '240', label: '4 hours' },
  { value: '1440', label: '24 hours' },
];

export const PENGU_SYMBOL = 'PENGU';
export const DEFAULT_PRICE = 0.045; // Mock current price
export const FREE_TIER_TRIGGER_LIMIT = 2;
export const PREMIUM_PRICE = 5; // $5/month

export const MOCK_ALERTS = [
  {
    alertId: '1',
    triggerId: 'trigger-1',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    exchange: 'binance' as Exchange,
    tradeVolume: 150000,
    priceChangePercent: 12.5,
    currentPrice: 0.045,
    previousPrice: 0.040,
    isRead: false,
  },
  {
    alertId: '2',
    triggerId: 'trigger-2',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    exchange: 'coinbase' as Exchange,
    tradeVolume: 85000,
    priceChangePercent: -8.2,
    currentPrice: 0.042,
    previousPrice: 0.046,
    isRead: true,
  },
];
