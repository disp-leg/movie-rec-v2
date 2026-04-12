#!/usr/bin/env node
/**
 * sync-engine.mjs
 * Reads content-engine horror-100.json + watched-films.csv + existing movie batches,
 * merges into a single src/data/engine-movies.json matching the Movie type.
 *
 * Run: node scripts/sync-engine.mjs
 * Or:  npm run sync
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const ENGINE_ROOT = resolve(PROJECT_ROOT, "../content-engine");

// --- Paths ---
const HORROR_100_PATH = resolve(ENGINE_ROOT, "horror-100.json");
const WATCHED_CSV_PATH = resolve(ENGINE_ROOT, "watched-films.csv");
const BATCH2_PATH = resolve(PROJECT_ROOT, "data/movies-batch2.json");
const MOVIES_JSON_PATH = resolve(PROJECT_ROOT, "data/movies.json");
const OUTPUT_PATH = resolve(PROJECT_ROOT, "src/data/engine-movies.json");

// --- Helpers ---
function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function makeKey(title, year) {
  return `${normalizeTitle(title)}:${year}`;
}

// --- Load watched CSV ---
function loadWatchedSet() {
  if (!existsSync(WATCHED_CSV_PATH)) {
    console.warn("WARN: watched-films.csv not found at", WATCHED_CSV_PATH);
    return new Set();
  }
  const csv = readFileSync(WATCHED_CSV_PATH, "utf-8");
  const records = parse(csv, { columns: true, skip_empty_lines: true, relax_column_count: true });
  const keys = new Set();
  for (const row of records) {
    const title = row.Name || row.name || "";
    const year = parseInt(row.Year || row.year || "0", 10);
    if (title && year) {
      keys.add(makeKey(title, year));
    }
  }
  console.log(`Loaded ${keys.size} watched films from CSV`);
  return keys;
}

// --- Load engine entries ---
function loadEngineEntries() {
  if (!existsSync(HORROR_100_PATH)) {
    console.warn("WARN: horror-100.json not found at", HORROR_100_PATH);
    return [];
  }
  const raw = JSON.parse(readFileSync(HORROR_100_PATH, "utf-8"));
  const entries = raw.entries || [];
  console.log(`Loaded ${entries.length} entries from horror-100.json`);
  return entries;
}

// --- Load existing batch movies (already in Movie shape) ---
function loadBatchMovies() {
  const movies = [];
  if (existsSync(BATCH2_PATH)) {
    const batch2 = JSON.parse(readFileSync(BATCH2_PATH, "utf-8"));
    if (Array.isArray(batch2)) movies.push(...batch2);
    console.log(`Loaded ${batch2.length} movies from movies-batch2.json`);
  }
  return movies;
}

// --- Load seed batch (nested structure) ---
function loadSeedBatch() {
  if (!existsSync(MOVIES_JSON_PATH)) return [];
  const raw = JSON.parse(readFileSync(MOVIES_JSON_PATH, "utf-8"));
  const seedMovies = raw.movies || [];
  console.log(`Loaded ${seedMovies.length} movies from seed batch`);
  return seedMovies.map((m) => ({
    title: m.title,
    year: m.year,
    director: m.director,
    rating: m.letterboxd_rating ? Math.round(m.letterboxd_rating * 2.5 * 10) / 10 : 5.0,
    genres: m.genre_tags || [],
    categories: (m.dna || []).filter((d) =>
      ["survival", "bunker", "psychological", "post-apocalyptic", "confined", "group-dynamics", "societal-collapse"].includes(d)
    ),
    dna: m.dna || [],
    description: m.why_similar || "",
    letterboxd: { top_positive: "", top_negative: "" },
    whereToWatch: {
      svod: m.streaming?.svod || [],
      vod: [],
      free: m.streaming?.avod || [],
    },
    sources: [],
    tmdbId: null,
  }));
}

// --- Merge engine data onto movies ---
function enrichWithEngine(movies, engineEntries, watchedSet) {
  const engineByKey = new Map();
  for (const entry of engineEntries) {
    engineByKey.set(makeKey(entry.title, entry.year), entry);
  }

  const buildDate = new Date().toISOString().split("T")[0];

  for (const movie of movies) {
    const key = makeKey(movie.title, movie.year);

    // Watched flag
    movie.watchedByRia = watchedSet.has(key);

    // Engine enrichment
    const eng = engineByKey.get(key);
    if (eng) {
      movie.scary = eng.scary;
      movie.production = eng.production;
      movie.extreme = eng.extreme;
      movie.paceScore = eng.pace_score;
      movie.pace = eng.pace;
      movie.whyScary = eng.why_scary;
      movie.scareType = eng.scare_type;
      movie.subGenre = eng.sub_genre;
      movie.wave = eng.wave;
      movie.compositeScore = eng.composite_scare_weighted ?? eng.composite_current;
      movie.defaultVisible = eng.default_visible;
      movie.csvStatus = eng.csv_status;
      movie.addedDate = movie.addedDate || buildDate;
      if (eng.synopsis && (!movie.description || movie.description.length < 20)) {
        movie.description = eng.synopsis;
      }
    }
  }

  return movies;
}

// --- Deduplicate by title+year ---
function deduplicate(movies) {
  const seen = new Map();
  for (const movie of movies) {
    const key = makeKey(movie.title, movie.year);
    if (!seen.has(key)) {
      seen.set(key, movie);
    } else {
      const existing = seen.get(key);
      const countFields = (m) => Object.values(m).filter((v) => v != null && v !== "").length;
      if (countFields(movie) > countFields(existing)) {
        seen.set(key, { ...existing, ...movie });
      } else {
        seen.set(key, { ...movie, ...existing });
      }
    }
  }
  return Array.from(seen.values());
}

// --- Main ---
function main() {
  const watchedSet = loadWatchedSet();
  const engineEntries = loadEngineEntries();
  const seedMovies = loadSeedBatch();
  const batchMovies = loadBatchMovies();

  // Combine: batch movies first (better shape), then seed
  let allMovies = deduplicate([...batchMovies, ...seedMovies]);
  console.log(`${allMovies.length} unique movies after dedup`);

  // Enrich with engine data + watched flags
  allMovies = enrichWithEngine(allMovies, engineEntries, watchedSet);

  // Filter out default_visible=false from engine (subtitle-only)
  allMovies = allMovies.filter((m) => m.defaultVisible !== false);

  console.log(`${allMovies.length} movies after visibility filter`);

  // Ensure output directory exists
  const outputDir = dirname(OUTPUT_PATH);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(allMovies, null, 2));
  console.log(`Wrote ${allMovies.length} movies to ${OUTPUT_PATH}`);
}

main();
