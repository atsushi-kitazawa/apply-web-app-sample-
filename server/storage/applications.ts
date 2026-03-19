import { getDb } from "~/server/db"

export type ApplicationStatus = "received" | "reviewing" | "approved" | "rejected"

export interface Application {
  id: string
  name: string
  namekana: string
  email: string
  phone: string
  plan: "basic" | "standard" | "premium"
  message: string
  status: ApplicationStatus
  createdAt: string
}

interface ApplicationRow {
  id: string
  name: string
  namekana: string
  email: string
  phone: string
  plan: "basic" | "standard" | "premium"
  message: string
  status: ApplicationStatus
  created_at: string
}

function mapRow(row: ApplicationRow): Application {
  return {
    id: row.id,
    name: row.name,
    namekana: row.namekana,
    email: row.email,
    phone: row.phone,
    plan: row.plan,
    message: row.message,
    status: row.status,
    createdAt: row.created_at
  }
}

export function listApplications(): Application[] {
  const db = getDb()
  const rows = db
    .prepare(
      "SELECT id, name, namekana, email, phone, plan, message, status, created_at FROM applications ORDER BY created_at DESC"
    )
    .all() as ApplicationRow[]

  return rows.map(mapRow)
}

export function getApplication(id: string): Application | undefined {
  const db = getDb()
  const row = db
    .prepare(
      "SELECT id, name, namekana, email, phone, plan, message, status, created_at FROM applications WHERE id = ?"
    )
    .get(id) as ApplicationRow | undefined

  return row ? mapRow(row) : undefined
}

export function createApplication(
  input: Omit<Application, "id" | "status" | "createdAt">
): Application {
  const db = getDb()
  const application: Application = {
    id: `app_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    status: "received",
    createdAt: new Date().toISOString(),
    ...input
  }

  db.prepare(
    "INSERT INTO applications (id, name, namekana, email, phone, plan, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(
    application.id,
    application.name,
    application.namekana,
    application.email,
    application.phone,
    application.plan,
    application.message,
    application.status,
    application.createdAt
  )

  return application
}
