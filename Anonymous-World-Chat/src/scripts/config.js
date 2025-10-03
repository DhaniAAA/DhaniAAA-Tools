window.APP_CONFIG = {
  SUPABASE_URL: 'https://qxaopcsdfytwlxnjfoeo.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YW9wY3NkZnl0d2x4bmpmb2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjcyMDUsImV4cCI6MjA3MjQ0MzIwNX0.YrPshZ8VUe-ag-jUhRD1a4uohrBqH_zrfEzOoytenr4',
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
