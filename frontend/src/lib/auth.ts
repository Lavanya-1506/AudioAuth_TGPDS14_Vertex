export type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const USER_KEY = "audioauth_user";
const SESSION_KEY = "audioauth_session";

export const getStoredUser = (): StoredUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const saveUser = (user: StoredUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const setSession = (email: string) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, createdAt: Date.now() }));
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const hasSession = (): boolean => {
  return Boolean(localStorage.getItem(SESSION_KEY));
};
