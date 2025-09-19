import { Exchange } from './types';

export function formatPrice(price: number): string {
  return `$${price.toFixed(4)}`;
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(1)}M`;
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K`;
  }
  return volume.toString();
}

export function formatPercentage(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export function getExchangeColor(exchange: Exchange): string {
  const colors = {
    binance: 'text-yellow-400',
    coinbase: 'text-blue-400',
    kraken: 'text-purple-400',
    okx: 'text-green-400',
    bybit: 'text-orange-400',
  };
  return colors[exchange] || 'text-gray-400';
}

export function generateMockTradeData() {
  const exchanges: Exchange[] = ['binance', 'coinbase', 'kraken', 'okx', 'bybit'];
  const basePrice = 0.045;
  const priceVariation = 0.01;
  
  return exchanges.map(exchange => ({
    exchange,
    symbol: 'PENGU',
    price: basePrice + (Math.random() - 0.5) * priceVariation,
    volume: Math.floor(Math.random() * 500000) + 50000,
    timestamp: new Date(),
    priceChange24h: (Math.random() - 0.5) * 0.01,
    priceChangePercent24h: (Math.random() - 0.5) * 20,
  }));
}

export function validateTriggerForm(data: {
  minVolume: string;
  minPriceChangePercent: string;
  timeframe: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (data.minVolume && (isNaN(Number(data.minVolume)) || Number(data.minVolume) < 0)) {
    errors.push('Minimum volume must be a positive number');
  }
  
  if (data.minPriceChangePercent && (isNaN(Number(data.minPriceChangePercent)) || Number(data.minPriceChangePercent) < 0)) {
    errors.push('Minimum price change must be a positive number');
  }
  
  if (!data.timeframe || isNaN(Number(data.timeframe))) {
    errors.push('Please select a valid timeframe');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
