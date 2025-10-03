window.APP_CONFIG = {
  SUPABASE_URL: "https://your-project-id.supabase.co",
  SUPABASE_ANON_KEY: "paste-your-public-anon-key",
  defaultRooms: [
    { id: "default-happy", name: "Happy", description: "Share your wins and bright moments." },
    { id: "default-vent", name: "Curhat Sedih", description: "Let it out in a supportive space." },
    { id: "default-serious", name: "Diskusi Serius", description: "Thoughtful debates, respectful tones." }
  ],
  rateLimit: {
    maxMessages: 10,
    intervalMs: 30000
  },
  contentFilters: {
    blockedPatterns: ["spam", "scam", "click here"],
    replacement: "[content removed]"
  },
  admin: {
    token: "change-me",
    privilegedAliases: ["Admin", "Moderator"]
  }
};
