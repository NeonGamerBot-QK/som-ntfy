import { Database } from "bun:sqlite";

export async function createDb(db: Database) {
    db.run(`CREATE TABLE IF NOT EXISTS  projects (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, category VARCHAR(255), readme_link TEXT, demo_link TEXT, repo_link TEXT, slack_id VARCHAR(64), created_at TIMESTAMP NOT NULL DEFAULT NOW(), updated_at TIMESTAMP NOT NULL DEFAULT NOW());`)
db.run(`CREATE TABLE IF NOT EXISTS devlogs (id SERIAL PRIMARY KEY, text TEXT NOT NULL, attachment TEXT, project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE, slack_id VARCHAR(64), created_at TIMESTAMP NOT NULL DEFAULT NOW(), updated_at TIMESTAMP NOT NULL DEFAULT NOW());`)
db.run(`CREATE TABLE IF NOT EXISTS payouts (id UUID PRIMARY KEY, amount NUMERIC NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW(), payable_type VARCHAR(255), slack_id VARCHAR(64));`)
db.run(`CREATE TABLE IF NOT EXISTS payout_responses (slack_id VARCHAR(64) PRIMARY KEY, shells INTEGER DEFAULT 0);`)
}