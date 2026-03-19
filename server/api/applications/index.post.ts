import { createApplication } from "~/server/storage/applications"

interface CreateApplicationBody {
  name?: string
  namekana?: string
  email?: string
  phone?: string
  plan?: "basic" | "standard" | "premium"
  message?: string
}

export default defineEventHandler(async (event) => {
  const body = (await readBody<CreateApplicationBody>(event)) || {}

  if (!body.name || !body.namekana || !body.email || !body.phone || !body.plan) {
    throw createError({ statusCode: 400, statusMessage: "必須項目が不足しています" })
  }

  const application = createApplication({
    name: body.name,
    namekana: body.namekana,
    email: body.email,
    phone: body.phone,
    plan: body.plan,
    message: body.message ?? ""
  })

  setResponseStatus(event, 201)
  return application
})
