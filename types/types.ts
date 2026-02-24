export type FormData = {
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

  // ✅ calendar selection
  meetingDate: Date | null
  meetingTime: string

  anythingElse: string
}

export type StepErrors = Record<string, string>