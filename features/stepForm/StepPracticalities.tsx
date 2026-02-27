"use client"

import type { FormData, StepErrors } from "@/types"
import MeetingScheduler from "../MeetingScheduler"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StepPracticalities({
  formData,
  updateField,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: any) => void
  errors: StepErrors
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Almost there — a few practical details
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        These help us prepare for your discovery call.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="budgetRange">Do you have a rough budget in mind?</Label>
          <Select value={formData.budgetRange} onValueChange={(v) => updateField("budgetRange", v)}>
            <SelectTrigger id="budgetRange">
              <SelectValue placeholder="Pick a range (or skip this)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-500k">Under ₱500,000</SelectItem>
              <SelectItem value="500k-1m">₱500,000 - ₱1,000,000</SelectItem>
              <SelectItem value="1m-2.5m">₱1,000,000 - ₱2,500,000</SelectItem>
              <SelectItem value="2.5m-5m">₱2,500,000 - ₱5,000,000</SelectItem>
              <SelectItem value="over-5m">₱5,000,000+</SelectItem>
              <SelectItem value="not-sure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="timeline">When are you hoping to get started?</Label>
          <Select value={formData.timeline} onValueChange={(v) => updateField("timeline", v)}>
            <SelectTrigger id="timeline">
              <SelectValue placeholder="Pick a timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">As soon as possible</SelectItem>
              <SelectItem value="1-3-months">Within 1 - 3 months</SelectItem>
              <SelectItem value="3-6-months">In 3 - 6 months</SelectItem>
              <SelectItem value="flexible">I’m flexible — exploring</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ✅ calendar selection with disabled dates */}
        <MeetingScheduler
          valueDate={formData.meetingDate}
          valueTime={formData.meetingTime}
          onChangeDateAction={(d) => updateField("meetingDate", d)}
          onChangeTimeAction={(t) => updateField("meetingTime", t)}
          errorDate={errors.meetingDate}
          errorTime={errors.meetingTime}
          minDaysFromToday={1}
          maxDaysFromToday={21}
        />

        <div className="flex flex-col gap-2">
          <Label htmlFor="anythingElse">Anything else you’d like us to know?</Label>
          <Textarea
            id="anythingElse"
            placeholder="Inspiration links, concerns, context — anything that helps."
            className="min-h-32"
            value={formData.anythingElse}
            onChange={(e) => updateField("anythingElse", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
