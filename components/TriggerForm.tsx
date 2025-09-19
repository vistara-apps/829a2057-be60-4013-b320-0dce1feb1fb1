'use client';

import { useState } from 'react';
import { TriggerInput } from './TriggerInput';
import { PrimaryButton } from './PrimaryButton';
import { EXCHANGES, TIMEFRAMES } from '@/lib/constants';
import { TriggerFormData, Trigger } from '@/lib/types';
import { validateTriggerForm } from '@/lib/utils';

interface TriggerFormProps {
  onSubmit: (trigger: Omit<Trigger, 'triggerId' | 'userId' | 'createdAt'>) => void;
  isLoading?: boolean;
}

export function TriggerForm({ onSubmit, isLoading = false }: TriggerFormProps) {
  const [formData, setFormData] = useState<TriggerFormData>({
    exchange: 'binance',
    minVolume: '',
    minPriceChangePercent: '',
    timeframe: '60',
  });
  
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTriggerForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors([]);
    
    const trigger = {
      exchange: formData.exchange as any,
      minVolume: formData.minVolume ? Number(formData.minVolume) : undefined,
      minPriceChangePercent: formData.minPriceChangePercent ? Number(formData.minPriceChangePercent) : undefined,
      timeframe: Number(formData.timeframe),
      isActive: true,
    };
    
    onSubmit(trigger);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TriggerInput
        variant="exchangeSelect"
        label="Exchange"
        value={formData.exchange}
        onChange={(value) => setFormData(prev => ({ ...prev, exchange: value as any }))}
        options={EXCHANGES}
      />
      
      <TriggerInput
        variant="volume"
        label="Minimum Volume (PENGU)"
        value={formData.minVolume}
        onChange={(value) => setFormData(prev => ({ ...prev, minVolume: value }))}
        placeholder="e.g., 10000"
      />
      
      <TriggerInput
        variant="priceChange"
        label="Minimum Price Change (%)"
        value={formData.minPriceChangePercent}
        onChange={(value) => setFormData(prev => ({ ...prev, minPriceChangePercent: value }))}
        placeholder="e.g., 5.0"
      />
      
      <TriggerInput
        variant="exchangeSelect"
        label="Timeframe"
        value={formData.timeframe}
        onChange={(value) => setFormData(prev => ({ ...prev, timeframe: value }))}
        options={TIMEFRAMES}
      />
      
      {errors.length > 0 && (
        <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-md">
          <ul className="text-sm text-red-400 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <PrimaryButton
        type="submit"
        variant={isLoading ? 'loading' : 'default'}
        className="w-full"
      >
        Create Alert Trigger
      </PrimaryButton>
    </form>
  );
}
