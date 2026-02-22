import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-12 text-center md:p-16">
        <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Ready to bring your idea to life?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
          Complete our guided intake form and take the first step toward turning
          your vision into a real product.
        </p>
        <Link href="/intake">
          <Button
            size="lg"
            className="group rounded-full px-8 text-base font-medium"
          >
            Start Your Intake
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
