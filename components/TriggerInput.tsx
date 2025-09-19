'use client';

import { TriggerInputProps } from '@/lib/types';

export function TriggerInput({ 
  variant, 
  value, 
  onChange, 
  placeholder, 
  label, 
  options 
}: TriggerInputProps) {
  if (variant === 'exchangeSelect' && options) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field w-full"
        >
          <option value="">Select exchange</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const inputType = variant === 'volume' ? 'number' : 'number';
  const step = variant === 'priceChange' ? '0.1' : '1';
  const min = '0';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field w-full"
        step={step}
        min={min}
      />
    </div>
  );
}
