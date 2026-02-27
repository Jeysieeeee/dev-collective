import { StepErrors, FormData } from "./types"

export function validateStep(step: number, formData: FormData): StepErrors {
  const errors: StepErrors = {}

  switch (step) {
    case 1:
      if (!formData.fullName.trim()) errors.fullName = "We need something to call you!"
      if (!formData.contactMethod) {
        errors.contactMethod = "Please choose how you'd like us to reach you."
      } else if (!formData.contactHandle.trim()) {
        errors.contactHandle = "We need your contact details to follow up."
      } else if (
        formData.contactMethod === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactHandle.trim())
      ) {
        errors.contactHandle = "That doesn't look like a valid email. Mind checking?"
      }
      if (!formData.role) errors.role = "Pick the option that best describes you."
      break

    case 2:
      if (!formData.vision.trim())
        errors.vision = "Even a rough idea is great — just tell us what you're imagining."
      break

    case 3:
      if (!formData.mustHaves.trim())
        errors.mustHaves =
          "What are the must-have things your app should do? Even a short list helps."
      break

    case 4:
      if (!formData.meetingDate) errors.meetingDate = "Please pick a preferred meeting date."
      if (!formData.meetingTime) errors.meetingTime = "Please pick a preferred meeting time."
      break
  }

  return errors
}