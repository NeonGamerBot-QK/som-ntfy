import { Database } from "bun:sqlite";

export async function createDb(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT,
      readme_link TEXT,
      demo_link TEXT,
      repo_link TEXT,
      slack_id TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS devlogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      attachment TEXT,
      project_id INTEGER NOT NULL,
      slack_id TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payouts (
      id TEXT PRIMARY KEY, -- UUIDs stored as TEXT in SQLite
      amount REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      payable_type TEXT,
      slack_id TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payout_responses (
      slack_id TEXT PRIMARY KEY,
      shells INTEGER DEFAULT 0
    );
  `);
}
