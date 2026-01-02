/**
 * FILE OVERVIEW:
 *   Purpose: TypeScript definitions for Vite and PWA
 *   Key Concepts: TypeScript declarations, Vite environment, Service Worker
 *   Module Type: Type Definitions
 *   @ai_context: Provides type definitions for Vite PWA plugin and service workers
 */

/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onRegistered?: (registration: ServiceWorkerRegistration) => void;
    onRegisterError?: (error: Error) => void;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  }

  export function registerSW(options?: RegisterSWOptions): () => void;
}

declare module 'virtual:pwa-register/react' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onRegistered?: (registration: ServiceWorkerRegistration) => void;
    onRegisterError?: (error: Error) => void;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, (value: boolean) => void];
    offlineReady: [boolean, (value: boolean) => void];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

