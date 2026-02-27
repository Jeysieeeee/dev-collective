import { NextResponse } from "next/server"
import { Resend } from "resend"
import IntakeEmail from "@/features/IntakeEmail"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.INTAKE_FROM_EMAIL
    const to = process.env.INTAKE_NOTIFY_EMAIL

    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "RESEND_API_KEY missing" }, { status: 500 })
    }
    if (!from) {
      return NextResponse.json({ ok: false, error: "INTAKE_FROM_EMAIL missing" }, { status: 500 })
    }
    if (!to) {
      return NextResponse.json({ ok: false, error: "INTAKE_NOTIFY_EMAIL missing" }, { status: 500 })
    }

    const body = await req.json()
    const resend = new Resend(apiKey)

    const result = await resend.emails.send({
      from,
      to,
      subject: `New Intake: ${body.fullName || "Client"}`,
      react: IntakeEmail({ data: body }),
    })

    // ✅ This is the key: return Resend response
    return NextResponse.json({
      ok: true,
      messageId: result?.data?.id ?? null,
      result,
    })
  } catch (err: any) {
    console.error("RESEND ERROR:", err)
    return NextResponse.json({ ok: false, error: err?.message || "Send failed" }, { status: 500 })
  }
}