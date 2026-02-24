import { NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "@react-email/render"
import IntakeEmail from "@/features/IntakeEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // ✅ FIX: await render
    const html = await render(
      IntakeEmail({ data: body })
    )

    await resend.emails.send({
      from: process.env.INTAKE_FROM_EMAIL!,
      to: process.env.INTAKE_NOTIFY_EMAIL!,
      subject: `New Intake: ${body.fullName}`,
      html: html, // now string, not Promise<string>
    })

    return NextResponse.json({ ok: true })

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}