
import { User } from '@/types';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const TOKEN_KEY = 'tm_auto_admin_token';

export const login = (username: string, password: string, rememberMe: boolean = false): User | null => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const expiresIn = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 7 days or 1 day
    const expires_at = Date.now() + expiresIn;
    const token = btoa(`${username}:${Date.now()}`);
    
    const user: User = {
      username,
      token,
      expires_at
    };
    
    localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(TOKEN_KEY);
  if (!stored) return null;
  
  try {
    const user: User = JSON.parse(stored);
    if (Date.now() > user.expires_at) {
      logout();
      return null;
    }
    return user;
  } catch {
    logout();
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
