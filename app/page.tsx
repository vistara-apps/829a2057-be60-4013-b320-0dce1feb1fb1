'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PriceDisplay } from '@/components/PriceDisplay';
import { AlertCard } from '@/components/AlertCard';
import { TriggerForm } from '@/components/TriggerForm';
import { NotificationToggle } from '@/components/NotificationToggle';
import { PrimaryButton } from '@/components/PrimaryButton';
import { MOCK_ALERTS, DEFAULT_PRICE, FREE_TIER_TRIGGER_LIMIT } from '@/lib/constants';
import { Alert, Trigger, User } from '@/lib/types';
import { Plus, Zap, Crown } from 'lucide-react';

export default function HomePage() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [showSettings, setShowSettings] = useState(false);
  const [showTriggerForm, setShowTriggerForm] = useState(false);
  const [isCreatingTrigger, setIsCreatingTrigger] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(DEFAULT_PRICE);
  const [priceChange24h, setPriceChange24h] = useState(8.5);
  const [volume24h, setVolume24h] = useState(2500000);
  
  // Mock user data
  const [user] = useState<User>({
    userId: 'user-1',
    web3Address: '0x1234...5678',
    notificationPreferences: {
      enabled: true,
      channels: ['frame'],
    },
    activeTriggers: [],
    isPremium: false,
  });

  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const hasUnreadAlerts = unreadAlerts.length > 0;
  const canCreateMoreTriggers = user.isPremium || user.activeTriggers.length < FREE_TIER_TRIGGER_LIMIT;

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 0.002;
      setCurrentPrice(prev => Math.max(0.001, prev + variation));
      
      const changeVariation = (Math.random() - 0.5) * 2;
      setPriceChange24h(prev => prev + changeVariation);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.alertId === alertId 
          ? { ...alert, isRead: true }
          : alert
      )
    );
  };

  const handleCreateTrigger = async (triggerData: Omit<Trigger, 'triggerId' | 'userId' | 'createdAt'>) => {
    setIsCreatingTrigger(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTrigger: Trigger = {
      ...triggerData,
      triggerId: `trigger-${Date.now()}`,
      userId: user.userId,
      createdAt: new Date(),
    };
    
    // In a real app, this would update the user's triggers
    console.log('Created trigger:', newTrigger);
    
    setIsCreatingTrigger(false);
    setShowTriggerForm(false);
    
    // Show success message (in a real app, you'd show a toast)
    alert('Alert trigger created successfully!');
  };

  if (showSettings) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSettingsClick={() => setShowSettings(false)} 
          hasUnreadAlerts={hasUnreadAlerts}
        />
        
        <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
            <p className="text-muted">Manage your PENGU Watch preferences</p>
          </div>
          
          <NotificationToggle
            enabled={notificationsEnabled}
            onChange={setNotificationsEnabled}
            label="Push Notifications"
          />
          
          <div className="card p-4">
            <h3 className="font-semibold text-foreground mb-3">Account Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Plan</span>
                <span className="text-foreground flex items-center">
                  {user.isPremium ? (
                    <>
                      <Crown className="w-4 h-4 mr-1 text-yellow-400" />
                      Premium
                    </>
                  ) : (
                    'Free'
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Active Triggers</span>
                <span className="text-foreground">
                  {user.activeTriggers.length} / {user.isPremium ? '∞' : FREE_TIER_TRIGGER_LIMIT}
                </span>
              </div>
            </div>
            
            {!user.isPremium && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <PrimaryButton className="w-full">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium - $5/mo
                </PrimaryButton>
              </div>
            )}
          </div>
          
          <PrimaryButton 
            onClick={() => setShowSettings(false)}
            className="w-full"
          >
            Back to Alerts
          </PrimaryButton>
        </main>
      </div>
    );
  }

  if (showTriggerForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSettingsClick={() => setShowSettings(true)} 
          hasUnreadAlerts={hasUnreadAlerts}
        />
        
        <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Alert Trigger</h2>
            <p className="text-muted">Set up custom conditions for PENGU trade alerts</p>
          </div>
          
          <div className="card p-4">
            <TriggerForm 
              onSubmit={handleCreateTrigger}
              isLoading={isCreatingTrigger}
            />
          </div>
          
          <PrimaryButton 
            onClick={() => setShowTriggerForm(false)}
            className="w-full"
            variant="default"
          >
            Cancel
          </PrimaryButton>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSettingsClick={() => setShowSettings(true)} 
        hasUnreadAlerts={hasUnreadAlerts}
      />
      
      <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
        <PriceDisplay 
          currentPrice={currentPrice}
          priceChange24h={priceChange24h}
          volume24h={volume24h}
        />
        
        {hasUnreadAlerts && (
          <div className="card p-4 bg-red-950/10 border-red-500/20">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-danger rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-danger">BIG TRADE DETECTED</h3>
            </div>
            <p className="text-sm text-muted mb-3">
              {unreadAlerts.length} new alert{unreadAlerts.length > 1 ? 's' : ''} detected
            </p>
            <div className="text-lg font-bold text-foreground">
              $PENGU Token
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Alerts</h2>
          <button
            onClick={() => setShowTriggerForm(true)}
            disabled={!canCreateMoreTriggers}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              canCreateMoreTriggers
                ? 'bg-primary text-white hover:bg-blue-600'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Trigger</span>
          </button>
        </div>
        
        {!canCreateMoreTriggers && (
          <div className="card p-4 bg-yellow-950/10 border-yellow-500/20">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-medium">
                Free tier limit reached. Upgrade to create unlimited triggers.
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐧</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No alerts yet</h3>
              <p className="text-muted mb-4">
                Create your first trigger to start receiving PENGU trade alerts
              </p>
              <PrimaryButton onClick={() => setShowTriggerForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Trigger
              </PrimaryButton>
            </div>
          ) : (
            alerts.map((alert) => (
              <AlertCard
                key={alert.alertId}
                alert={alert}
                variant={!alert.isRead ? 'highlight' : 'default'}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          )}
        </div>
        
        <div className="text-center py-6">
          <p className="text-xs text-muted">
            Monitoring {['Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit'].join(', ')} for PENGU trades
          </p>
        </div>
      </main>
    </div>
  );
}
