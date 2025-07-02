-- USERS TABLE
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- CLOUD ACCOUNTS TABLE
CREATE TABLE cloud_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT NOT NULL,
  account_name TEXT NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- SECURITY EVENTS TABLE
CREATE TABLE security_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cloud_account_id INTEGER,
  event_type TEXT NOT NULL,
  severity TEXT CHECK(severity IN ('low', 'medium', 'high')) NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cloud_account_id) REFERENCES cloud_accounts(id)
);
