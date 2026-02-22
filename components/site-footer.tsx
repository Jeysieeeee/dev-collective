import { Code2 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Code2 className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Developer Collective
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} Developer Collective. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
