const USERS_KEY = "expense_tracker_users";
const SESSION_KEY = "expense_tracker_session";
const INCOME_KEY = "expense_tracker_income";
const EXPENSE_KEY = "expense_tracker_expenses";
const ACCOUNTS_KEY = "expense_tracker_accounts";

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getUserStorageKey(baseKey) {
  if (typeof window === "undefined") {
    return null;
  }

  const session = safeParse(localStorage.getItem(SESSION_KEY), null);

  if (!session || session.id === undefined) {
    return null;
  }

  return baseKey + "_" + session.id;
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

  const userKey = getUserStorageKey(ACCOUNTS_KEY);

  if (!userKey) {
    return [];
  }

  return safeParse(localStorage.getItem(userKey), []);
}

export function saveAccounts(accounts) {
  if (typeof window === "undefined") {
    return;
  }

  const userKey = getUserStorageKey(ACCOUNTS_KEY);

  if (!userKey) {
    return;
  }

  localStorage.setItem(userKey, JSON.stringify(accounts));
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

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}

// INCOME
export function getIncome() {
  if (typeof window === "undefined") {
    return [];
  }

  const userKey = getUserStorageKey(INCOME_KEY);

  if (!userKey) {
    return [];
  }

  return safeParse(localStorage.getItem(userKey), []);
}

export function saveIncome(income) {
  if (typeof window === "undefined") {
    return;
  }

  const userKey = getUserStorageKey(INCOME_KEY);

  if (!userKey) {
    return;
  }

  localStorage.setItem(userKey, JSON.stringify(income));
}

// EXPENSES
export function getExpenses() {
  if (typeof window === "undefined") {
    return [];
  }

  const userKey = getUserStorageKey(EXPENSE_KEY);

  if (!userKey) {
    return [];
  }

  return safeParse(localStorage.getItem(userKey), []);
}

export function saveExpenses(expenses) {
  if (typeof window === "undefined") {
    return;
  }

  const userKey = getUserStorageKey(EXPENSE_KEY);

  if (!userKey) {
    return;
  }

  localStorage.setItem(userKey, JSON.stringify(expenses));
}
