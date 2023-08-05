import { db } from './connection';

export function initDb() {
  db.run(
    `CREATE TABLE IF NOT EXISTS sound (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL
    );`
  );
}
