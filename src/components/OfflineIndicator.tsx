
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Wifi } from 'lucide-react';
import { PWAUtils } from '@/utils/pwaUtils';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(PWAUtils.isOnline());
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    PWAUtils.addOnlineListener(handleOnline);
    PWAUtils.addOfflineListener(handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <Alert className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-yellow-50 border-yellow-200">
      <WifiOff className="w-4 h-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        You're currently offline. Some features may not be available.
      </AlertDescription>
    </Alert>
  );
};

export default OfflineIndicator;
