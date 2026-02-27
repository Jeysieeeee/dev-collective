"use client"

import { useEffect, useMemo } from "react"
import { CalendarDays } from "lucide-react"
import { addDays, format, isBefore, startOfDay } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  valueDate: Date | null
  valueTime: string
  onChangeDateAction: (d: Date | null) => void
  onChangeTimeAction: (t: string) => void
  errorDate?: string
  errorTime?: string
  blockedWeekdays?: number[]
  blockedDates?: Date[]
  minDaysFromToday?: number
  maxDaysFromToday?: number
  weekdayTimeSlots?: string[]
  weekendTimeSlots?: string[]
}

function toStandardTime(hour24: number) {
  const period = hour24 >= 12 ? "PM" : "AM"
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return `${hour12}:00 ${period}`
}

function buildHourlySlots(startHour: number, endHour: number) {
  const slots: string[] = []
  for (let hour = startHour; hour <= endHour; hour += 1) {
    slots.push(toStandardTime(hour))
  }
  return slots
}

export default function MeetingScheduler({
  valueDate,
  valueTime,
  onChangeDateAction,
  onChangeTimeAction,
  errorDate,
  errorTime,
  blockedWeekdays = [],
  blockedDates = [],
  minDaysFromToday = 1,
  maxDaysFromToday = 21,
  weekdayTimeSlots = buildHourlySlots(9, 19),
  weekendTimeSlots = buildHourlySlots(0, 23),
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

  const availableTimeSlots = useMemo(() => {
    if (!valueDate) return weekdayTimeSlots
    const day = valueDate.getDay()
    const isWeekend = day === 0 || day === 6
    return isWeekend ? weekendTimeSlots : weekdayTimeSlots
  }, [valueDate, weekdayTimeSlots, weekendTimeSlots])

  useEffect(() => {
    if (!valueTime) return
    if (!availableTimeSlots.includes(valueTime)) onChangeTimeAction("")
  }, [availableTimeSlots, onChangeTimeAction, valueTime])

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <CalendarDays className="size-4 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Set a meeting with us</p>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Weekdays: 9:00 AM to 7:00 PM. Weekends: available 24 hours. We&apos;ll confirm your slot.
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
                onSelect={(d) => onChangeDateAction(d ?? null)}
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

          <Select value={valueTime} onValueChange={onChangeTimeAction}>
            <SelectTrigger className={`${errorTime ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.map((t) => (
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
