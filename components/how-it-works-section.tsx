import {
  ClipboardList,
  MessageSquare,
  Rocket,
} from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Complete the Intake",
    description:
      "Walk through our guided questionnaire to articulate your software idea, target audience, and key features.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Review & Discuss",
    description:
      "Our team reviews your submission and prepares tailored questions for a focused discovery call.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Get Your Plan",
    description:
      "Receive a clear development roadmap with timeline, technology recommendations, and an accurate proposal.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            From idea to actionable plan in three steps
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative rounded-xl border border-border bg-card p-8 transition-colors hover:border-muted-foreground/30"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <item.icon className="size-5 text-foreground" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Step {item.step}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
