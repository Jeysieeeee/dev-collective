"use client"
import { CalendarDays } from "lucide-react"
import { addDays, isBefore, startOfDay, format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  valueDate: Date | null
  valueTime: string
  onChangeDate: (d: Date | null) => void
  onChangeTime: (t: string) => void
  errorDate?: string
  errorTime?: string

  // rules
  blockedWeekdays?: number[]
  blockedDates?: Date[]
  minDaysFromToday?: number
  maxDaysFromToday?: number
  timeSlots?: string[]
}

export default function MeetingScheduler({
  valueDate,
  valueTime,
  onChangeDate,
  onChangeTime,
  errorDate,
  errorTime,
  blockedWeekdays = [0, 6], // default block Sat+Sun
  blockedDates = [],
  minDaysFromToday = 1, // earliest tomorrow
  maxDaysFromToday = 21, // next 3 weeks
  timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
}: Props) {
  const today = startOfDay(new Date())
  const minDate = addDays(today, minDaysFromToday)
  const maxDate = addDays(today, maxDaysFromToday)

  const disabled = (date: Date) => {
    const d = startOfDay(date)

    if (isBefore(d, minDate)) return true
    if (isBefore(maxDate, d)) return true

    if (blockedWeekdays.includes(d.getDay())) return true

    if (blockedDates.some((bd) => startOfDay(bd).getTime() === d.getTime())) return true

    return false
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <CalendarDays className="size-4 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Set a meeting with us</p>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Pick a preferred date and time for a short discovery call. We’ll confirm the slot.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>
            Preferred date <span className="text-destructive">*</span>
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={`justify-start ${errorDate ? "border-destructive" : ""}`}
              >
                {valueDate ? format(valueDate, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={valueDate ?? undefined}
                onSelect={(d) => onChangeDate(d ?? null)}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {errorDate && <p className="text-xs text-destructive">{errorDate}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label>
            Preferred time <span className="text-destructive">*</span>
          </Label>

          <Select value={valueTime} onValueChange={onChangeTime}>
            <SelectTrigger className={`${errorTime ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errorTime && <p className="text-xs text-destructive">{errorTime}</p>}
        </div>
      </div>
    </div>
  )
}
