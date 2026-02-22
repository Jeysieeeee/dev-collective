"use client"

import Link from "next/link"
import { Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="size-5 text-foreground" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Developer Collective
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link href="/intake">
            <Button size="sm" className="rounded-full px-4">
              Start Your Intake
            </Button>
          </Link>
        </nav>
        <Link href="/intake" className="md:hidden">
          <Button size="sm" className="rounded-full px-4">
            Start Intake
          </Button>
        </Link>
      </div>
    </header>
  )
}
