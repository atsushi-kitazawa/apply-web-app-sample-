import { listApplications } from "~/server/storage/applications"

export default defineEventHandler(() => {
  return {
    items: listApplications()
  }
})
