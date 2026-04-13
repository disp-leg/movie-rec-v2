# UNCUT — UX Improvement Proposals

**Date:** 2026-04-11
**Author:** movie-rec node
**Context:** UNCUT is a Next.js static app (hero + browse rows + detail overlay + tab bar) with a localStorage behavior model (save / skip / seen / expand + DNA-tag similarity ranking). The content engine at `~/active-projects/content-engine/` owns `horror-100.json` (ranked horror DB with scary/production/extreme/pace/nudity/depravity + sub_genre + synopsis + why_scary + scare_type + language + streaming + mpaa_rating + csv_status + composite scores + default_visible) and `watched-films.csv` (4,793 entries from Ria's Letterboxd). UNCUT's current `Movie` type is much thinner than the engine schema — most of the proposals below close that gap and turn static rows into a living feed.

---

## 1. Intensity Dials — tune the feed by scary / extreme / pace

**Problem.** The feed is one global list. Some nights Ria wants a slow-burn 6/10 scare; other nights a fast-paced 9. Today the only way to filter is by skipping individual titles, which wastes signals.

**Implementation sketch.** Add a compact dial panel at the top of the browse view (collapses into the tab bar on scroll) with three sliders: Scare (1–10), Extreme (1–10), Pace (slow → fast). Dials persist to localStorage alongside `BehaviorState`. `rankMovies()` takes the dial values as inputs and filters + re-weights before returning. Dial state also biases the hero pick.

**Content-engine coordination.** Requires `scary`, `extreme`, `pace_score`, `composite_scare_weighted` to flow into UNCUT's `Movie` type. Add a `src/lib/engineSync.ts` that imports the engine JSON at build time and maps engine fields → `Movie` (schema-mapped, not cloned). Filter applied: `scary ≥ dial.scare - 1 && extreme ≤ dial.extreme + 1 && pace_score matches`.

**Effort:** 6h

---

## 2. "Why it's scary" detail cards

**Problem.** The detail overlay shows a generic description and Letterboxd quotes. It doesn't tell the user *why the movie works* — the single thing that drives the decision to press play.

**Implementation sketch.** Add a pinned section to `DetailOverlay.tsx` titled "Why it hits" that renders `why_scary` + `scare_type` from the engine, styled as a bold pull-quote. Below it, a row of three chip readouts: Scare · Extreme · Pace, each with a filled dot bar (1–10). Keep existing Letterboxd quotes beneath.

**Content-engine coordination.** New fields on `Movie`: `whyScary: string`, `scareType: string`, `scary/production/extreme/pace_score: number`. Map from `horror-100.json` entries. These are already authored in the DB — zero new writing work.

**Effort:** 3h

---

## 3. Ria's Watched Ledger — hide-by-default with a "show seen" toggle

**Problem.** Ria has 4,793 watched films in Letterboxd. UNCUT surfaces movies she's already seen because it only knows what *she marked seen in this app* (a near-empty set). Every watched-film impression is a wasted row.

**Implementation sketch.** At build time, join `watched-films.csv` against the movie list by `(title, year)` normalized match. Matched rows get `watchedByRia: true`. By default they're filtered out of the feed. Add a "Already seen" row at the bottom of Browse that's collapsed by default — taps expand to show the ledger for nostalgia / re-recommendation signaling. Saving a watched film still records the save.

**Content-engine coordination.** Read `watched-films.csv` directly in a build script (`scripts/sync-watched.mjs`). Mirror the engine's `csv_status` field: `ELIGIBLE | WATCHED | REVIEWED`. Flag any unmatched titles to a `data/unmatched-watched.txt` so the content engine can improve its canonicalization.

**Effort:** 5h

---

## 4. Live Content Pipeline — show what's new this week

**Problem.** The app feels static. Ria opens it, sees the same rows, closes it. The content engine is *continuously* adding vetted films but UNCUT has no surface for freshness.

**Implementation sketch.** Add a "Fresh from the crypt" hero strip above the main rows that shows films added to `horror-100.json` in the last 14 days, animated in with a small "NEW" pulse (GSAP). Add a build timestamp + "N new this week" badge in the tab bar. Use the existing `isFresh` logic in `behavior.ts` — it already looks for `addedDate` but nothing writes it today.

**Content-engine coordination.** The engine entries already carry a `wave` field (e.g. `"G-scare"`). Add a `first_seen_iso` field on engine write, then project into `Movie.addedDate`. Requires one line change in the engine's write script and the existing freshness UI lights up automatically.

**Effort:** 4h

---

## 5. Streaming reality check — only show what's actually watchable

**Problem.** The current "where to watch" section lists theoretical platforms. Half the time the film isn't actually streaming anywhere she's subscribed to, so the save→watch conversion collapses.

**Implementation sketch.** Add a settings sheet accessible from the tab bar where Ria picks her active services (Netflix, Shudder, Max, Prime, AppleTV+, etc.). Persist to localStorage. In Browse, films available on a subscribed service get a subtle green "▸ Netflix" affordance at the bottom-right of the poster. A "Only streaming" toggle in the dial panel (Proposal 1) hard-filters the feed.

**Content-engine coordination.** Engine's `streaming` field is already a free-text hint (`"Netflix"`, `"Shudder / AMC+"`). Parse into a normalized `streamingServices: string[]` during engine-sync. Flag entries with stale/missing streaming data back to the engine via `data/streaming-gaps.json` so the content pipeline can refresh.

**Effort:** 7h

---

## 6. Mood Rooms — curated entry points instead of one giant feed

**Problem.** The single flat browse is overwhelming on mobile. Ria knows her mood but doesn't know which title fits it. Current `categories` field exists but isn't leveraged as *rooms* — just as tags.

**Implementation sketch.** Replace the default browse view with 6 Mood Rooms as full-bleed mobile cards that GSAP-animate on tap into a filtered feed: **Possession**, **Found Footage**, **Slow Dread**, **Home Invasion**, **Cosmic**, **Festival 2023-26**. Each room is a fixed filter over `sub_genre` / `scare_type` / `wave`. A "Shuffle" room shuffles the hero.

**Content-engine coordination.** Rooms are defined in a new `src/lib/rooms.ts` as predicates against engine fields: Possession = `sub_genre contains "possession"`, Slow Dread = `pace === "slow" && scary ≥ 7`, Festival = `wave contains "festival"`. Zero engine changes. Adding a room is a one-line commit.

**Effort:** 8h

---

## 7. Anti-recommendation — "Not for you tonight"

**Problem.** Skip is a dead-end signal today: `rankMovies()` just drops skipped items to the bottom. No explanation, no learning loop, no dignity for the skip. Ria feels like she's fighting the feed instead of teaching it.

**Implementation sketch.** On skip, show a 3-option micro-sheet: "Too slow", "Too gory", "Seen it". Record the reason into `MovieSignals.skipReason`. Feed the reason back into ranking: "Too slow" skips on 2+ movies → demote `pace === "slow"` globally for the session. "Too gory" → demote `extreme ≥ 8`. "Seen it" → mark `seen: true` AND write to a pending `ria-corrections.csv` so the content engine can patch `watched-films.csv`.

**Content-engine coordination.** Produces a feedback loop *back* into the content engine. The `ria-corrections.csv` file is picked up by the engine's CSV maintenance script and merged into `watched-films.csv`. Closes the loop so the app gets smarter AND the engine's ground truth improves.

**Effort:** 6h

---

## 8. Taste Profile — the engine already has one; show it

**Problem.** The content engine maintains `taste-profile.md` and `taste-profile-notes.md` — a rich editorial document of what Ria likes and why. UNCUT never shows it. Meanwhile the app has no "about me" surface, so onboarding feels cold.

**Implementation sketch.** Add a Profile tab that renders the taste profile as a scrollable editorial layout: pull quotes from the profile notes, DNA tag cloud of her top 10 saved tags (computed from `BehaviorState`), a "films that shaped the taste" row pinned from the profile, and a live count: "47 saved · 12 watched · 4,793 lifetime". Elite typography — treat it as a magazine spread.

**Content-engine coordination.** Build-time pull of `taste-profile.md` → parsed into sections → shipped as a JSON blob. DNA tags are reconciled against the engine's `sub_genre` + `scare_type` fields so the tag cloud matches the engine's own vocabulary. Updates to the profile in the engine auto-ship on next build.

**Effort:** 5h

---

## 9. Intent-aware Hero — the big recommendation picks itself

**Problem.** The hero is currently a static featured pick. It doesn't react to time of day, recent behavior, or unwatched saved items. It's the most valuable pixel in the app and it's the least alive.

**Implementation sketch.** Rewrite `HeroSection.tsx` to pick dynamically at mount based on: (a) time of day — after 9pm, boost `scary ≥ 8`; before 9pm, boost `scary 6–7`; (b) unwatched saved items — if Ria has saved ≥3 unwatched films, rotate them through the hero first; (c) fresh arrivals — new wave entries get a guaranteed hero slot once. Cross-fade between picks on a 12-second timer (pausable on hover/tap) with GSAP.

**Content-engine coordination.** Uses `scary`, `composite_scare_weighted`, `wave`, and the `first_seen_iso` from Proposal 4. No new engine fields. The hero rotation is 100% derived from engine data + local behavior — no server, no config.

**Effort:** 6h

---

## 10. Share-a-scare — one-tap shareable poster card

**Problem.** Ria watches a film she loves and wants to send it to a friend. Right now she'd have to screenshot the detail overlay, which looks like an app chrome screenshot. There's no social object.

**Implementation sketch.** Add a "Share" button to the detail overlay that renders a canvas-based poster card (1080×1920, story-native) with the poster, title, year, director, a single pull-quote from `why_scary`, and a "via UNCUT" mark. Tap → native share sheet. On iOS, shares as image; on desktop, downloads. Uses the existing poster URL and engine metadata — no backend.

**Content-engine coordination.** Pulls `why_scary`, `director`, `year`, `production`, and `scary` from the engine entry. Also bumps a `shareCount` in local state which, at a future date, could feed back into the engine as a popularity signal (`data/share-log.jsonl` batched on next build).

**Effort:** 5h

---

## Summary

| # | Proposal | Effort | Primary Axis |
|---|---|---|---|
| 1 | Intensity Dials | 6h | Personalization |
| 2 | "Why it's scary" cards | 3h | Engine integration |
| 3 | Ria's Watched Ledger | 5h | Engine integration |
| 4 | Live Content Pipeline | 4h | Liveliness |
| 5 | Streaming reality check | 7h | Discovery |
| 6 | Mood Rooms | 8h | Mobile / Discovery |
| 7 | Anti-recommendation | 6h | Personalization / Feedback loop |
| 8 | Taste Profile tab | 5h | Engine integration |
| 9 | Intent-aware Hero | 6h | Liveliness |
| 10 | Share-a-scare | 5h | Mobile / Social |

**Total effort:** 55 hours. Proposals 2, 3, 4, 8 are the highest-leverage engine-integration wins and can land as a single 17-hour first wave. Proposals 1, 6, 9 form a second wave (20h) that transforms the browse model. Proposals 5, 7, 10 are the polish wave (18h).

**Cross-cutting prerequisite:** A shared build-time script (`scripts/sync-engine.mjs`) that reads `~/active-projects/content-engine/horror-100.json` + `watched-films.csv` and emits `src/data/movies.generated.json`. Every proposal above assumes this exists. It's a 2h job and should land before wave 1.
