
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export class PWAUtils {
  private static deferredPrompt: BeforeInstallPromptEvent | null = null;
  private static isInstalled = false;

  static init() {
    // Check if app is already installed
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches;

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  static async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    
    return outcome === 'accepted';
  }

  static canInstall(): boolean {
    return this.deferredPrompt !== null && !this.isInstalled;
  }

  static isAppInstalled(): boolean {
    return this.isInstalled;
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }

  static addOnlineListener(callback: () => void): void {
    window.addEventListener('online', callback);
  }

  static addOfflineListener(callback: () => void): void {
    window.addEventListener('offline', callback);
  }
}
