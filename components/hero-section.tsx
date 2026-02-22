import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-14">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs text-muted-foreground">
            Now accepting new projects
          </span>
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Turn Your Software Idea Into a Clear Development Plan
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Developer Collective helps you organize your app idea, define
          requirements, and prepare for a productive discovery call.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/intake">
            <Button
              size="lg"
              className="group rounded-full px-8 text-base font-medium"
            >
              Start Your Intake
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-medium"
            >
              See How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
