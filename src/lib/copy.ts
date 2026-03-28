export const COPY = {
  // Hero zone
  hero: {
    title: "Movie Rec",
    tagline: "26 films for the ones who liked it bleak",
    scrollPrompt: "Scroll down",
  },

  // Collection intro zone (word-by-word scroll reveal)
  intro: {
    line1: "You watched The Divide and wanted more.",
    line2: "We pulled 26 films from the same dark corner.",
  },

  // Featured pick zone
  featured: {
    sectionLabel: "Start here",
  },

  // Browse zone
  browse: {
    heading: "The full list",
  },

  // Typography breaks (editorial dividers between movie clusters)
  breaks: [
    { label: "Sealed in", sublabel: "Bunkers, shelters, and nowhere to go" },
    { label: "Fracture point", sublabel: "When the group turns on itself" },
    { label: "Slow rot", sublabel: "Dread that builds by the frame" },
    { label: "After everything", sublabel: "What remains when the dust settles" },
  ],

  // Category section
  categories: {
    heading: "By mood",
  },

  // Footer
  footer: {
    line1: "A film list, not an algorithm",
    line2: "Seeded from The Divide (2011, dir. Xavier Gens)",
  },

  // Expanded movie detail labels
  detail: {
    letterboxdLabel: "What people said",
    watchLabel: "Where to watch",
    freeTag: "(free)",
  },

  // Behavior / interaction
  actions: {
    save: "Save for later",
    unsave: "Remove",
    saved: "Saved",
    skip: "Not for me",
    markSeen: "Already seen",
    newBadge: "New",
  },

  // Empty states
  empty: {
    noResults: "Nothing here under that filter",
    allSeen: "You've seen all 26. Respect.",
    savedEmpty: "Nothing saved yet",
  },

  // Filter
  filter: {
    showing: "Showing:",
    clearFilter: "Clear",
    allFilms: "All films",
  },
} as const;
