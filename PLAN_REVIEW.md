# movie-rec v2 -- Plan Review for Operator Approval

**Date:** 2026-03-28
**Status:** Phase 1 + Phase 2 research complete. Awaiting approval before Phase 3 (spec merge).

---

## 1. Design Study Highlights (Phase 2)

Studied three reference apps from spottedinprod.com:

### Retro MP3 -- Cover Flow (`/apps/retrompthree/823`)
- iPod Classic emulator by indie dev @sakofchit
- 3D album carousel with spring-based scrubbing, reflections, card-flip transitions
- **Key insight:** The UI is monochrome dark chrome. ALL color comes from album art. The app is a *frame*, not a palette.

### Bop -- Mix It (`/apps/bop/753`) + Pocket DJ (`/apps/bop/701`)
- Social music app by @mauhan_ + @vinylbarshibuya
- Scroll-driven discovery with parallax, drag-to-arrange grid with elastic feedback
- **Key insight:** Skeuomorphism with purpose -- vinyl/DJ metaphors map to real actions (mixing, arranging), not decoration.

### Pool -- Swipe the Duck (`/apps/pool/744`) + Importing (`/apps/pool/835`)
- Photo/AI app by 5-person startup
- Physics-based throw gestures, GPU shader effects (water caustics, ripples)
- **Key insight:** Brand-as-interaction -- the duck is something you *throw*, not a logo. Loading states use shaders to feel premium.

### Common Principles Extracted
1. Content IS the interface (movie posters dominate, UI chrome minimal)
2. Physics-based motion everywhere (spring curves, momentum, throw)
3. Skeuomorphism with purpose (cinema metaphors, not decoration)
4. One signature interaction, perfected
5. Delight in the margins (loading states, transitions, haptics)
6. Color comes from content (neutral shell, posters provide vibrancy)

---

## 2. Proposed Visual Direction

### Color Palette
**Warm Neutral Shell + Content-Driven Color**
- Light mode: #F5F3F0 (off-white) background, #FAFAF7 (vellum) surfaces
- Dark mode: #1C1A17 (warm charcoal) background, #252320 surfaces
- Text: #2C2A27 (warm near-black) / #EDEBE8 (warm off-white)
- Single muted accent -- choose one:
  - Warm coral (#E8705A)
  - Muted sage (#7A9E7E)
  - Dusty slate blue (#6B7F99)
- Movie posters provide ALL vibrancy. The UI is the frame, not the painting.

### Typography
- **Headings:** Instrument Serif (editorial, cinematic, film-journal feel)
- **Body:** Inter (clean, disappears into reading)
- **Metadata:** JetBrains Mono or SF Mono (small, informational)
- iOS proportions: 34px titles, 22px headers, 17px body, 13px captions

### Motion
- Spring-based curves (damping ~0.8), not ease-in-out
- Shared element poster transitions (card to detail)
- Momentum scroll with snap-to-center
- 50-80ms stagger on card load
- Haptic feedback on snap, add-to-watchlist, reveal

### Signature Interaction: "The Film Strip"
Horizontal scrollable strip of movie posters with perspective tilt. Focused movie centered and upright; flanking movies tilt away. Swiping feels like pulling film through a projector gate. The metaphor is cinema, not digital.

### Layout
- Mobile-first, single-column, poster-led
- Bottom navigation (3-4 tabs, thumb-zone friendly)
- Card-based detail sheets (slide up from bottom)
- Edge-to-edge poster content
- No hamburger menus

---

## 3. Seed Batch Movie List (Phase 1)

20 films across 4 tiers, all traced to real human recommendations from Reddit, Letterboxd, and curated horror sites.

### Tier 1 -- Direct Matches (closest to The Divide)
1. **Right at Your Door** (2006) -- Domestic apocalypse in a sealed house after dirty bomb
2. **Hidden** (2015) -- Family in bunker after outbreak (pre-Stranger Things Duffers)
3. **Carriers** (2009) -- Pandemic road movie, moral decay under survival pressure
4. **It Comes at Night** (2017) -- Boarded-up family, trust erodes into paranoia
5. **Await Further Instructions** (2018) -- Family trapped by mysterious barricade, sinister TV instructions

### Tier 2 -- Claustrophobic Single-Location
6. **Coherence** (2013) -- Dinner party reality fracture, single house, improvised
7. **Pontypool** (2008) -- Radio station siege, language virus, cerebral horror
8. **The Platform** (2019) -- Vertical prison, food scarcity as social allegory
9. **Exam** (2009) -- Eight candidates, one room, group dynamics fracture
10. **The Bar** (2017) -- Sniper traps bar patrons, darkly comic locked-room survival

### Tier 3 -- Survival Pressure Cookers
11. **Circle** (2015) -- 50 strangers, group vote kills one every 2 minutes
12. **Would You Rather** (2012) -- Brutal dinner party choices, escalating violence
13. **Fermat's Room** (2007) -- Shrinking room, math puzzles to survive
14. **Level 16** (2018) -- Boarding school captivity, institutional horror
15. **The Incident** (2014) -- Infinite loops, existential claustrophobia (Mexican indie)

### Tier 4 -- Adjacent Deep Cuts
16. **Pandorum** (2009) -- The Divide in space -- amnesia, corridors, something hunting
17. **The Void** (2016) -- Hospital siege, cosmic horror, practical effects
18. **Breathing Room** (2008) -- Locked white room, explosive collars, ultra-indie
19. **The Hole** (2001) -- Teens in WWII bunker, voluntary confinement goes wrong
20. **The Bunker** (2024) -- Nuclear bunker survivors, most direct recent Divide successor

---

## 4. Recommended Next Steps

Pending approval of both tracks:

1. **Phase 3 -- Spec Merge:** Combine design direction + seed batch into a unified technical specification
2. **Expand seed batch:** Scale from 20 to 50-75 films using existing picks as anchor points for deeper discovery
3. **Prototype Film Strip:** Build the signature interaction as an isolated component (motion, gesture, perspective)
4. **Accent color decision:** Present coral/sage/slate options with actual movie poster mockups to see which reads best
5. **No code until design is approved** -- this boundary holds

---

## Files Delivered

| File | Path | Description |
|------|------|-------------|
| Design Study | `design/design-study.md` | Full analysis of 3 reference apps + synthesized principles |
| Movies JSON | `data/movies.json` | Structured data for all 20 films with metadata |
| Seed Batch Summary | `data/seed-batch-summary.md` | Human-readable tiered movie list |
| This File | `PLAN_REVIEW.md` | Consolidated summary for operator review |
