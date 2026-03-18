import { getApplication } from "~/server/storage/applications"

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "IDが指定されていません" })
  }

  const application = getApplication(id)
  if (!application) {
    throw createError({ statusCode: 404, statusMessage: "申込が見つかりません" })
  }

  return application
})
