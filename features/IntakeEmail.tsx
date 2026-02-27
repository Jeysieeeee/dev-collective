import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components"

type FormDataEmail = {
  fullName: string
  contactMethod: string
  contactHandle: string
  role: string
  vision: string
  whoIsItFor: string
  biggestChallenge: string
  platforms: string[]
  mustHaves: string
  hasAnything: string
  existingUrl: string
  lookAndFeel: string
  budgetRange: string
  timeline: string
  meetingDate: string
  meetingTime: string
  anythingElse: string
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <Section style={{ marginBottom: 10 }}>
      <Text style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{label}</Text>
      <Text style={{ margin: 0, fontSize: 14, color: "#111827" }}>
        {value?.trim() ? value : "---"}
      </Text>
    </Section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Section style={card}>
      <Heading style={cardTitle}>{title}</Heading>
      {children}
    </Section>
  )
}

export default function IntakeEmail({ data }: { data: FormDataEmail }) {
  const meetingDisplay =
    data.meetingDate && data.meetingTime
      ? `${new Date(data.meetingDate).toDateString()} • ${data.meetingTime}`
      : "Not selected"

  return (
    <Html>
      <Head />
      <Preview>New intake submission from {data.fullName || "a client"}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>Developer Collective — Intake Submission</Heading>
          <Text style={sub}>
            A client submitted the intake form. Here’s the same “Review” summary.
          </Text>

          <Hr style={hr} />

          <Card title="About You">
            <Field label="Name" value={data.fullName} />
            <Field label={`Contact (${data.contactMethod})`} value={data.contactHandle} />
            <Field label="Role" value={data.role} />
          </Card>

          <Card title="Vision & Purpose">
            <Field label="The vision" value={data.vision} />
            <Field label="Who it’s for" value={data.whoIsItFor} />
            <Field label="Biggest challenge" value={data.biggestChallenge} />
          </Card>

          <Card title="What You Need">
            <Field label="Platforms" value={data.platforms?.length ? data.platforms.join(", ") : ""} />
            <Field label="Must-haves" value={data.mustHaves} />
            <Field label="Existing / prototype" value={data.hasAnything} />
            <Field label="Existing link" value={data.existingUrl} />
            <Field label="Look & feel" value={data.lookAndFeel} />
          </Card>

          <Card title="Practicalities">
            <Field label="Budget" value={data.budgetRange} />
            <Field label="Timeline" value={data.timeline} />
            <Field label="Preferred meeting" value={meetingDisplay} />
            <Field label="Other notes" value={data.anythingElse} />
          </Card>

          <Text style={footer}>
            Sent automatically from your intake form.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: "#f6f7fb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "24px 0",
}

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: 14,
  padding: 24,
  maxWidth: 640,
}

const h1: React.CSSProperties = {
  fontSize: 20,
  margin: "0 0 6px 0",
  color: "#111827",
}

const sub: React.CSSProperties = {
  fontSize: 13,
  margin: 0,
  color: "#6b7280",
}

const hr: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
}

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  backgroundColor: "#ffffff",
}

const cardTitle: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
  margin: "0 0 12px 0",
  color: "#6b7280",
}

const footer: React.CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
  marginTop: 16,
}