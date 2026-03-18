export type ApplicationStatus = "received" | "reviewing" | "approved" | "rejected"

export interface Application {
  id: string
  name: string
  email: string
  phone: string
  plan: "basic" | "standard" | "premium"
  message: string
  status: ApplicationStatus
  createdAt: string
}

const applications: Application[] = []

export function listApplications(): Application[] {
  return [...applications].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  )
}

export function getApplication(id: string): Application | undefined {
  return applications.find((app) => app.id === id)
}

export function createApplication(input: Omit<Application, "id" | "status" | "createdAt">): Application {
  const application: Application = {
    id: `app_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    status: "received",
    createdAt: new Date().toISOString(),
    ...input
  }
  applications.push(application)
  return application
}
