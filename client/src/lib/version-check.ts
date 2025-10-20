// Version checking and auto-reload functionality
export const APP_VERSION = '1.0.1';

// Check for new version every 5 minutes
const CHECK_INTERVAL = 5 * 60 * 1000;

// Check if app needs update by fetching version file
async function checkForUpdates(): Promise<boolean> {
  try {
    const response = await fetch('/version.json?t=' + Date.now(), {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.version !== APP_VERSION;
    }
  } catch (error) {
    console.log('[Version Check] Could not check for updates:', error);
  }
  
  return false;
}

// Auto-reload when new version is detected
async function performVersionCheck() {
  const hasUpdate = await checkForUpdates();
  
  if (hasUpdate) {
    console.log('[Version Check] New version detected! Updating...');
    
    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
    
    // Clear localStorage except bookings
    const bookings = localStorage.getItem('garagem599_bookings');
    localStorage.clear();
    if (bookings) {
      localStorage.setItem('garagem599_bookings', bookings);
    }
    
    // Update sessionStorage
    sessionStorage.setItem('app_version', APP_VERSION);
    
    // Show brief notification before reload
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = '✨ Nova versão disponível! Atualizando...';
    document.body.appendChild(notification);
    
    // Reload after 1 second
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

export function initVersionCheck() {
  // Only run in production
  if (!import.meta.env.PROD) {
    console.log('[Version Check] Disabled in development mode');
    return;
  }

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('[Version Check] Service Worker registered:', registration.scope);

          // Check for service worker updates periodically
          setInterval(() => {
            registration.update();
          }, CHECK_INTERVAL);

          // Auto-activate new service worker without user confirmation
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[Version Check] New service worker installed, activating...');
                  // Skip waiting and take control immediately
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('[Version Check] Service Worker registration failed:', error);
        });

      // Auto-reload when new service worker takes control
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Version Check] New service worker activated');
        // Clear caches and reload
        if ('caches' in window) {
          caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
          }).then(() => {
            location.reload();
          }).catch(() => {
            location.reload();
          });
        } else {
          location.reload();
        }
      });
    });
  }

  // Check version stored in sessionStorage on page load
  const storedVersion = sessionStorage.getItem('app_version');
  
  if (storedVersion && storedVersion !== APP_VERSION) {
    console.log('[Version Check] Version changed from', storedVersion, 'to', APP_VERSION);
    
    // Clear caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    
    // Clear localStorage except bookings
    const bookings = localStorage.getItem('garagem599_bookings');
    localStorage.clear();
    if (bookings) {
      localStorage.setItem('garagem599_bookings', bookings);
    }
  }
  
  sessionStorage.setItem('app_version', APP_VERSION);

  // Start periodic version checking via version.json
  // Check immediately after 10 seconds, then every 5 minutes
  setTimeout(() => {
    performVersionCheck();
    setInterval(performVersionCheck, CHECK_INTERVAL);
  }, 10000);
}

// Force reload function (can be called manually from console)
export function forceReload() {
  console.log('[Version Check] Force reload initiated');
  
  // Clear all caches
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }

  // Unregister service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }

  // Hard reload
  window.location.reload();
}

// Expose to window for debugging in production
if (typeof window !== 'undefined') {
  (window as any).forceReload = forceReload;
  (window as any).checkVersion = () => {
    console.log('Current version:', APP_VERSION);
    checkForUpdates().then(hasUpdate => {
      console.log('Update available:', hasUpdate);
    });
  };
}
