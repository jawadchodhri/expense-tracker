const USERS_KEY = "expense_tracker_users";
const SESSION_KEY = "expense_tracker_session";
const INCOME_KEY = "expense_tracker_income";
const EXPENSE_KEY = "expense_tracker_expenses";
const ACCOUNTS_KEY = "expense_tracker_accounts";
const AUTH_COOKIE_NAME = "expense_tracker_auth";
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

// USERS
export function getUsers() {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(USERS_KEY), []);
}

export function saveUsers(users) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

//ACCOUNT
export function getAccounts() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);

  return safeParse(savedAccounts, []);
}

export function saveAccounts(accounts) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

// SESSION
export function getSession() {
  if (typeof window === "undefined") return null;
  return safeParse(localStorage.getItem(SESSION_KEY), null);
}

export function saveSession(user) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user),
  );

  document.cookie =
    AUTH_COOKIE_NAME +
    "=" +
    encodeURIComponent(String(user.id)) +
    "; path=/" +
    "; max-age=" +
    AUTH_COOKIE_MAX_AGE +
    "; SameSite=Lax";
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(SESSION_KEY);

  document.cookie =
    AUTH_COOKIE_NAME +
    "=; path=/; max-age=0; SameSite=Lax";
}

// INCOME
export function getIncome() {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(INCOME_KEY), []);
}

export function saveIncome(income) {
  if (typeof window === "undefined") return;
  localStorage.setItem(INCOME_KEY, JSON.stringify(income));
}

// EXPENSES
export function getExpenses() {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(EXPENSE_KEY), []);
}

export function saveExpenses(expenses) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
}