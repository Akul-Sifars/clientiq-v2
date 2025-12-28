/**
 * FILE OVERVIEW:
 *   Purpose: PWA service worker registration and update management
 *   Key Concepts: Service Worker, Workbox, PWA lifecycle
 *   Module Type: Utility
 *   @ai_context: Handles service worker registration and update detection using vite-plugin-pwa
 */

type UnregisterSW = () => void;

let wb: UnregisterSW | null = null;

export async function registerSW(): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const { registerSW } = await import('virtual:pwa-register');
      wb = registerSW({
        immediate: true,
        onRegistered(registration) {
          console.log('Service worker registered:', registration);
        },
        onRegisterError(error) {
          console.error('Service worker registration error:', error);
        },
        onNeedRefresh() {
          console.log('Service worker needs refresh');
        },
        onOfflineReady() {
          console.log('App ready to work offline');
        },
      });
    } catch (error) {
      console.error('Failed to load PWA registration:', error);
    }
  }
}

export function getWorkbox(): UnregisterSW | null {
  return wb;
}

