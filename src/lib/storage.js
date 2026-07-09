const USERS_KEY = "expense_tracker_users";
const SESSION_KEY = "expense_tracker_session";

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}