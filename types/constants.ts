export const STEPS = [
  { id: 1, label: "About You" },
  { id: 2, label: "Vision & Purpose" },
  { id: 3, label: "What You Need" },
  { id: 4, label: "Practicalities" },
  { id: 5, label: "Review" },
] as const

export const CONTACT_METHODS = [
  { value: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { value: "telegram", label: "Telegram", placeholder: "@yourhandle", type: "text" },
  { value: "wechat", label: "WeChat", placeholder: "Your WeChat ID", type: "text" },
  { value: "viber", label: "Viber", placeholder: "Your Viber number", type: "tel" },
] as const

export const ROLE_OPTIONS = [
  {
    value: "technical-partner",
    label: "Looking for a technical partner to bring my idea to life",
  },
  {
    value: "business-owner",
    label: "A business owner who wants to digitize operations or launch a new revenue stream",
  },
  {
    value: "custom-software",
    label: "Looking for a team that will build custom software to replace spreadsheets and manual work",
  },
  {
    value: "exploring",
    label: "Exploring whether a software product makes sense for my use case",
  },
] as const

export const PLATFORM_OPTIONS = [
  { value: "Web App", description: "Accessed through a browser" },
  { value: "iPhone App", description: "Available on iPhones" },
  { value: "Android App", description: "Available on Android phones" },
  { value: "Both Mobile", description: "iPhone and Android" },
  { value: "Not Sure", description: "We can help you decide" },
] as const

export const INITIAL_DATA = {
  fullName: "",
  contactMethod: "",
  contactHandle: "",
  role: "",

  vision: "",
  whoIsItFor: "",
  biggestChallenge: "",

  platforms: [],
  mustHaves: "",
  hasAnything: "",
  existingUrl: "",
  lookAndFeel: "",

  budgetRange: "",
  timeline: "",

  meetingDate: null,
  meetingTime: "",

  anythingElse: "",
}
