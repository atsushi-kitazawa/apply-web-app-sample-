import Database from "better-sqlite3"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) {
    return db
  }

  const dataDir = join(process.cwd(), "data")
  mkdirSync(dataDir, { recursive: true })
  const dbPath = join(dataDir, "applications.db")

  db = new Database(dbPath)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      namekana TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      plan TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)

  return db
}
