
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { PWAUtils } from '@/utils/pwaUtils';

const PWAInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const checkInstallPrompt = () => {
      setShowPrompt(PWAUtils.canInstall());
    };

    // Check initially
    checkInstallPrompt();

    // Check periodically
    const interval = setInterval(checkInstallPrompt, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const accepted = await PWAUtils.showInstallPrompt();
      if (accepted) {
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Download className="w-6 h-6 text-automotive-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-automotive-dark mb-1">
              Install TM Auto Express
            </h3>
            <p className="text-sm text-automotive-gray mb-3">
              Install our app for faster access and offline browsing
            </p>
            <div className="flex gap-2">
              <Button
                variant="automotive"
                size="sm"
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1"
              >
                {isInstalling ? 'Installing...' : 'Install App'}
              </Button>
              <Button
                variant="automotive-outline"
                size="sm"
                onClick={handleDismiss}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;
