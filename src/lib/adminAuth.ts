/**
 * Fake auth for the design phase.
 * Everything token-related goes through this file, so when the backend
 * exists only these functions change (the components stay as they are).
 */
const TOKEN_KEY = "thijar_admin_token";

export function getToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable: ignore */
  }
}

export function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable: ignore */
  }
}

export function isAdminLoggedIn() {
  return getToken() !== null;
}

/** Design phase: accepts any non-empty credentials. Replace with an API call later. */
export async function loginAdmin(email: string, password: string) {
  if (!email.trim() || !password) {
    throw new Error("Enter your email and password.");
  }
  setToken("demo-token");
}