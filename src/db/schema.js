// #created_at TEXT DEFAULT (datetime('now'))
// DROP TABLE IF EXISTS giftcards;
// DROP TABLE IF EXISTS users;

export const SQL_SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS giftcards (
    id TEXT PRIMARY KEY,
    name TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    expiration_date DATE NOT NULL,
    user_id TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`;
