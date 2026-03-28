# Movie Rec v2 -- UX Specification

**Version:** 1.0
**Date:** 2026-03-27
**Design Direction:** poly.app-inspired continuous scroll editorial experience
**Target:** Mobile-first (375px viewport)

---

## Design Philosophy

The page IS the product. One continuous vertical scroll. No screens, no routes, no navigation chrome. Content reveals through scrolling. The experience feels like reading a curated editorial piece about cinema, not using an app.

Hand-drawn sketch accents (wavy underlines, arrows, circles) add human personality without becoming illustration. They are gestural marks, not decorative art.

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Surface | `#1F2029` | Page background, all dark areas |
| Surface Elevated | `#272833` | Expanded movie detail panels, subtle lift |
| Primary Text | `#F4F4F4` | Headings, body text, all readable content |
| Secondary Text | `#9CA3AF` | Year, rating, metadata, dimmed labels |
| Accent | `#D4523E` | Hand-drawn accents, bookmark icon active state, interactive highlights |
| Accent Hover | `#E05E49` | Hover/active state for accent elements |
| Separator | `#2E2F3A` | Thin lines between movies in browse section |
| Poster Overlay | `rgba(31, 32, 41, 0.65)` | Dimming layer over hero poster |
| Scroll Prompt | `#9CA3AF` at 60% opacity | "Scroll to explore" text |

---

## Typography

**Font Family:** Inter (all weights loaded from Google Fonts or self-hosted)

### Scale (mobile-first, 375px viewport)

| Element | Weight | Size | Line Height | Letter Spacing | Notes |
|---------|--------|------|-------------|----------------|-------|
| Hero Title | 800 (ExtraBold) | 48px | 1.05 | -0.02em | App name, largest text on page |
| Hero Tagline | 400 (Regular) | 18px | 1.5 | 0 | Below hero title |
| Section Heading | 700 (Bold) | 36px | 1.15 | -0.015em | Zone intro text, category dividers |
| Scroll-Reveal Text | 700 (Bold) | 32px | 1.2 | -0.01em | Word-by-word reveal in Zone 2 |
| Movie Title | 700 (Bold) | 28px | 1.15 | -0.01em | Individual movie titles in browse |
| Featured Movie Title | 700 (Bold) | 36px | 1.1 | -0.015em | Zone 3 featured pick title |
| Body Text | 400 (Regular) | 16px | 1.6 | 0 | Descriptions, "why similar" text |
| Body Text Large | 400 (Regular) | 18px | 1.6 | 0 | Featured pick description |
| Secondary Text | 400 (Regular) | 14px | 1.5 | 0.01em | Year, rating, genre labels |
| Caption | 400 (Regular) | 12px | 1.4 | 0.02em | Footer text, scroll prompt |
| Category Link | 600 (SemiBold) | 24px | 1.3 | 0 | Zone 5 category names |
| Typography Break | 700 (Bold) | 28px | 1.2 | -0.01em | Editorial dividers within browse |

---

## Spacing System

Base unit: 8px

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Icon internal padding |
| `space-sm` | 8px | Tight gaps, inline spacing |
| `space-md` | 16px | Standard element spacing |
| `space-lg` | 24px | Section internal padding (horizontal) |
| `space-xl` | 32px | Between elements within a zone |
| `space-2xl` | 48px | Between movie entries in browse |
| `space-3xl` | 64px | Between major zones |
| `space-4xl` | 96px | Hero top padding, large zone separations |
| `space-5xl` | 128px | Extra breathing room on hero |

### Horizontal Margins
- Page margin (mobile): 24px left/right
- Full-bleed elements: 0px (edge to edge)
- Reading column max-width: 327px (375 - 48px margins)
- Inset poster variant: 24px margin on one side, 0 on other

---

## Zone Specifications

### Zone 1: Hero
**Viewport:** Full screen height (100vh, minimum 667px)
**Layout:**
- Background: Single movie poster (The Divide or featured film), full-bleed, with `rgba(31, 32, 41, 0.65)` overlay
- Top padding: 128px (space-5xl) from top of viewport
- App name: "MOVIE REC" in Inter ExtraBold 48px, `#F4F4F4`, centered
- Hand-drawn wavy underline accent beneath "REC" in `#D4523E`, approximately 3px stroke, slightly imperfect wave
- Tagline: "Films that share DNA with The Divide" in Inter Regular 18px, `#9CA3AF`, centered, 16px below title
- Bottom of viewport: "Scroll to explore" in Inter Regular 12px, `#9CA3AF` at 60%, centered, 32px from bottom
- Small hand-drawn arrow pointing down below scroll prompt, `#9CA3AF` at 40%

**Scroll behavior:** Hero content stays fixed while poster very slowly parallax-scrolls (0.3x speed). At 80vh scroll, hero begins fading out (opacity 1 to 0 over 20vh).

### Zone 2: The Collection Intro
**Height:** ~200vh (scrolls through slowly to enable word-by-word reveal)
**Layout:**
- Horizontal padding: 24px
- Sticky text container centered vertically in viewport
- Text: "26 films you haven't seen. All share DNA with The Divide."
- Inter Bold 32px, `#F4F4F4`, left-aligned
- Each word starts at opacity 0, `#9CA3AF`, and transitions to opacity 1, `#F4F4F4` as user scrolls through the zone
- Words reveal sequentially based on scroll position -- the zone is divided into N equal scroll segments (one per word)
- After all words revealed: hand-drawn arrow pointing down appears with a gentle fade-in, `#D4523E`, positioned 48px below text block
- Arrow is a simple sketchy downward stroke, not a geometric icon

**Scroll behavior:** Text container is `position: sticky; top: 50%; transform: translateY(-50%)`. Words reveal via Intersection Observer or scroll-linked animation.

### Zone 3: Featured Pick
**Height:** Auto (content-driven, approximately 100vh+)
**Layout:**
- 64px top margin from Zone 2
- Poster: full-width, edge-to-edge (375px wide), aspect ratio preserved (typically 2:3 for movie posters, so ~562px tall)
- No border, no border-radius, no shadow -- raw full-bleed image
- Below poster, 24px padding resumes
- Title: Inter Bold 36px, `#F4F4F4`, left-aligned, 24px below poster
- Year: Inter Regular 14px, `#9CA3AF`, 8px below title
- Hand-drawn circle accent around the year, `#D4523E`, loose sketchy style
- Description ("why it's similar"): Inter Regular 18px, `#F4F4F4`, 24px below year, full reading column width (327px)
- Genre labels: Inter Regular 14px, `#9CA3AF`, 16px below description, comma-separated plain text (NOT pills, NOT tags)
- Letterboxd quotes section: 32px below genres
  - Label: "What people say" in Inter SemiBold 14px, `#9CA3AF`
  - Positive quote: Inter Regular 16px, `#F4F4F4`, with a thin `#D4523E` left border (2px, 16px left padding)
  - Negative quote: same style, 16px below

**Scroll behavior:** Poster slides up from 20px below with opacity 0 to final position at opacity 1, spring easing (duration ~600ms, triggered at 20% visibility). Title and text fade in 200ms after poster settles.

### Zone 4: The Browse
**Height:** Auto (content-driven, the longest zone)
**Top margin:** 96px from Zone 3

**Section intro:**
- "The Collection" in Inter Bold 36px, `#F4F4F4`, left-aligned, 24px horizontal padding
- Hand-drawn wavy underline on "Collection" in `#D4523E`
- 48px below heading, movies begin

**Movie entry layouts (varied rhythm):**

Each movie entry is separated by 48px vertical space and a 1px `#2E2F3A` line centered horizontally (width: 327px, auto-centered).

**Layout Variant A -- Full-Bleed Poster (used for movies 1, 5, 9, etc.)**
- Poster: full-width edge-to-edge, aspect ratio 2:3
- Title: Inter Bold 28px, `#F4F4F4`, 24px padding, 16px below poster
- Year + Rating: Inter Regular 14px, `#9CA3AF`, 8px below title (format: "2006 -- 6.0/10")
- Hook: Inter Regular 16px, `#F4F4F4`, 16px below year, one-line "why it's similar"

**Layout Variant B -- Inset Left Poster (used for movies 2, 6, 10, etc.)**
- Poster: 180px wide, left-aligned with 24px left margin, top-aligned with title
- Title + year + hook: right of poster, 16px gap between poster and text
- Title: Inter Bold 28px, `#F4F4F4`
- Year: Inter Regular 14px, `#9CA3AF`, 4px below title
- Hook: Inter Regular 16px, `#F4F4F4`, 12px below year, wraps below poster if needed

**Layout Variant C -- Landscape Crop (used for movies 3, 7, 11, etc.)**
- Poster: full-width, but cropped to 16:9 aspect ratio (375x211px), `object-fit: cover` center
- Title: Inter Bold 28px, `#F4F4F4`, 24px padding, 16px below
- Year + Rating + Hook below, same as Variant A

**Layout Variant D -- Text-First (used for movies 4, 8, 12, etc.)**
- No poster visible initially
- Title: Inter Bold 28px, `#F4F4F4`, 24px padding
- Year: Inter Regular 14px, `#9CA3AF`, 4px below
- Hook: Inter Regular 16px, `#F4F4F4`, 12px below year
- Poster appears only on tap/expand (see Interaction section)

**Scroll behavior per entry:** Each movie entry fades in from opacity 0 and translates up 16px, triggered when 15% of the element enters the viewport. Stagger: 100ms between poster and text elements. Spring easing, 500ms duration.

### Zone 4.5: Typography Breaks
**Placement:** After every 4-5 movies within the browse section
**Layout:**
- 64px top and bottom margin
- Large text: Inter Bold 28px, `#F4F4F4`, centered
- Category name (e.g., "Bunker Films", "Survival Stories", "Psychological Descent")
- Hand-drawn accent: circle around the text, or wavy underline, or brackets -- vary per break
- Accent color: `#D4523E`
- Optional: secondary line below in Inter Regular 14px, `#9CA3AF` (e.g., "Films about what happens when the door closes")

**Scroll behavior:** Text scales from 0.9 to 1.0 and opacity 0 to 1, 400ms, triggered at 30% visibility.

### Zone 5: Categories
**Top margin:** 96px from last browse entry
**Layout:**
- Section label: "Browse by theme" in Inter Regular 14px, `#9CA3AF`, 24px left padding
- 24px below, category links listed vertically:
  - "Post-Apocalyptic" -- Inter SemiBold 24px, `#F4F4F4`
  - "Survival" -- same
  - "Psychological" -- same
  - "Bunker / Isolation" -- same
  - "Societal Collapse" -- same
- Each category: 20px vertical spacing between
- Hand-drawn brackets `[ ]` around each category name in `#D4523E`, sketchy style
- Or: alternating accents -- underline on first, circle on second, arrow on third, etc.

**Interaction:** Tap a category to smooth-scroll up to the browse section, which re-renders showing only movies matching that category. A subtle `#D4523E` dot appears next to the active filter. Tap "All" (shown at top of filtered view) to reset.

**Scroll behavior:** Category links slide in from left, staggered 80ms apart, 400ms duration, spring easing.

### Zone 6: Footer
**Top margin:** 96px from categories
**Bottom padding:** 64px
**Layout:**
- Centered text block
- Line 1: "Curated for Riamont" in Inter Regular 14px, `#9CA3AF`
- Line 2: "Based on The Divide (2011)" in Inter Regular 12px, `#9CA3AF` at 60%
- 24px between lines
- Small hand-drawn squiggle decoration above text, `#D4523E` at 40%, purely decorative

---

## Interaction Specifications

### Movie Expand (Tap to Reveal)
**Trigger:** Tap anywhere on a movie entry (poster or text area)
**Animation:**
- Content below the entry pushes down with spring animation (400ms, slight overshoot)
- Expanded panel slides in from 0 height to auto height
- Opacity 0 to 1 over first 300ms

**Expanded content:**
- 24px horizontal padding, 24px top padding
- Background: `#272833` (elevated surface)
- Full description: Inter Regular 16px, `#F4F4F4`, full reading column
- 24px below: Letterboxd reviews section
  - "Letterboxd takes" label: Inter SemiBold 14px, `#9CA3AF`
  - Positive review: 16px below, Inter Regular 16px, `#F4F4F4`, thin `#D4523E` left border
  - Negative review: 16px below positive, same style
- 24px below: Where to watch
  - "Watch on" label: Inter SemiBold 14px, `#9CA3AF`
  - Service names listed as plain text: Inter Regular 16px, `#F4F4F4`
  - Free services get "(free)" suffix in `#9CA3AF`
- 24px bottom padding

**Bookmark icon:**
- Appears top-right of expanded panel, 16px from top, 24px from right
- Simple bookmark outline icon, 20x20px, `#9CA3AF` default
- Tap: fills with `#D4523E`, brief scale animation (1.0 to 1.2 to 1.0, 200ms)
- Saved state persists in localStorage

**Collapse:** Tap the entry again, or scroll more than 100px past it. Reverse of expand animation, 300ms.

### Scroll-Linked Animations
**Implementation:** Use CSS `scroll-timeline` where supported, with IntersectionObserver fallback.
**Performance:** All animated properties are `transform` and `opacity` only (compositor-friendly). No layout-triggering animations.
**Reduced motion:** Respect `prefers-reduced-motion: reduce`. When active, all elements render at final state immediately, no animations.

### Category Filtering
**Trigger:** Tap a category in Zone 5
**Behavior:**
1. Smooth scroll to top of Zone 4 (600ms, ease-out)
2. Current movie entries fade out (200ms)
3. Filtered entries fade in with stagger (each 80ms apart, 300ms fade)
4. A filter indicator appears at top of Zone 4: "Showing: [Category]" in Inter Regular 14px, `#9CA3AF`, with an "x" to clear
5. Zone 4 heading updates: "The Collection" becomes "[Category] Films"

---

## Hand-Drawn Accent Placement Guide

Accents are SVG paths with slight imperfection built in (varying stroke width, not perfectly smooth curves). They should feel like someone quickly sketched them with a felt-tip pen.

| Location | Type | Color | Details |
|----------|------|-------|---------|
| Hero: under "REC" | Wavy underline | `#D4523E` | 3px stroke, extends 10px past word on each side, 2-3 waves |
| Hero: below scroll prompt | Downward arrow | `#9CA3AF` at 40% | Simple stroke, 24px tall, slight curve |
| Zone 2: after all words reveal | Downward arrow | `#D4523E` | Sketchy, 32px tall, pointing to next section |
| Zone 3: around year | Circle | `#D4523E` | Loose oval, doesn't close perfectly, 2px stroke |
| Zone 4 heading: under "Collection" | Wavy underline | `#D4523E` | Same style as hero accent |
| Zone 4.5 breaks | Varies | `#D4523E` | Circle, brackets, underline -- rotate per break |
| Zone 5: around categories | Brackets | `#D4523E` | Hand-drawn `[` and `]`, slightly uneven |
| Zone 6: above footer text | Squiggle | `#D4523E` at 40% | Small horizontal squiggle, ~60px wide |

**Stroke characteristics:**
- Stroke width: 2-3px, varies slightly along path
- Stroke linecap: round
- No fill, stroke only
- Path should include slight tremor (add small random offsets to control points)
- SVG `stroke-dasharray` can simulate pen-lift gaps on longer accents

---

## Responsive Notes

This spec is mobile-first at 375px. For larger viewports:

- **Up to 428px (large phones):** Scale typography by 1.05x, maintain same layout
- **429px-768px (tablets):** Increase horizontal margins to 48px, max reading column 672px centered, poster max-width 672px
- **769px+ (desktop):** Max content width 720px centered, generous whitespace on sides, poster max-width 720px. Browse Variant B can show poster at 240px wide. Consider 2-up layout for browse only if viewport exceeds 1200px.

Font sizes do NOT scale with viewport -- they remain fixed at the specified pixel values. Only margins and max-widths adapt.

---

## Performance Budget

- First contentful paint: under 1.5s on 4G
- Hero poster: load as `<img loading="eager">` with LQIP (low-quality image placeholder, 20px wide blurred)
- All other posters: `<img loading="lazy">` with LQIP
- Inter font: subset to Latin, load 400 and 700 weights initially, load 600 and 800 after first paint
- Scroll animations: 60fps minimum, use `will-change: transform, opacity` on animated elements
- Total page weight target: under 2MB initial, lazy-load posters as needed

---

## Accessibility

- All poster images get descriptive `alt` text: "[Movie Title] ([Year]) movie poster"
- Scroll-reveal text is present in DOM from load (just visually hidden via opacity) -- screen readers read full content
- Bookmark toggle uses `role="button"` with `aria-pressed` state
- Expanded movie details use `aria-expanded` on trigger element
- Color contrast: `#F4F4F4` on `#1F2029` = 13.5:1 (AAA). `#9CA3AF` on `#1F2029` = 5.4:1 (AA). `#D4523E` on `#1F2029` = 4.2:1 (meets AA for large text, used only for accents, never for readable body text)
- Skip link at top of page: "Skip to collection" jumps to Zone 4
- Focus indicators: 2px `#D4523E` outline with 2px offset on all interactive elements

---

## Technical Implementation Notes

- Single HTML page, no routing
- CSS custom properties for all color and spacing tokens
- Scroll-linked animations via CSS `scroll-timeline` with JS IntersectionObserver fallback
- Movie data loaded from JSON file, rendered client-side
- localStorage for bookmark persistence
- Category filtering is client-side DOM manipulation (show/hide with animation)
- No framework required -- vanilla HTML/CSS/JS is sufficient for this scope
