import {
  Shield,
  Zap,
  Target,
  Clock,
} from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Focused Discovery",
    description:
      "Our structured intake ensures every discovery call is productive and focused on what matters.",
  },
  {
    icon: Zap,
    title: "Faster Proposals",
    description:
      "With clear requirements upfront, we deliver accurate estimates and proposals in days, not weeks.",
  },
  {
    icon: Shield,
    title: "No Commitment",
    description:
      "The intake is completely free. Get clarity on your idea before making any financial decisions.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Skip the back-and-forth emails. Our questionnaire captures everything we need in one session.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Why Developer Collective
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for clarity, designed for results
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 bg-card p-8 transition-colors hover:bg-secondary/50"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="size-5 text-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
