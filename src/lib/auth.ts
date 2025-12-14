/**
 * FILE OVERVIEW:
 *   Purpose: Authentication state management and utilities
 *   Key Concepts: Auth state, login/logout functions
 *   Module Type: Utility
 *   @ai_context: Simple auth store for managing user authentication
 */

export type User = {
  username: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const AUTH_STORAGE_KEY = "clientiq-auth";

function getStoredAuth(): AuthState {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
}

function setStoredAuth(state: AuthState): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

export function getAuth(): AuthState {
  return getStoredAuth();
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  if (email === "admin@clientiq.com" && password === "password") {
    const user: User = {
      username: "admin",
      name: "Admin User",
      email: "admin@clientiq.com",
    };
    setStoredAuth({ user, isAuthenticated: true });
    return { success: true };
  }
  return { success: false, error: "Invalid email or password" };
}

export function logout(): void {
  setStoredAuth({ user: null, isAuthenticated: false });
}

export function isAuthenticated(): boolean {
  return getStoredAuth().isAuthenticated;
}

export function getCurrentUser(): User | null {
  return getStoredAuth().user;
}

