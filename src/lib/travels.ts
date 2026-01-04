/**
 * Travel data parsing and management
 * 
 * Multilingual File Convention:
 * - Italian (default): [slug].md (e.g., cambogia-2025.md)
 * - English: [slug].en.md (e.g., cambogia-2025.en.md)
 * - Slug must be identical across all language versions
 * - Common fields (slug, date, coverImage, tags, coords, map, gallery, etc.) must be identical
 * - Translated fields (title, description, content, duration, map.points[].description) should be localized
 * 
 * See MARKDOWN_I18N_CONVENTION.md for complete documentation.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkBreaks from "remark-breaks";
import { CONTINENT_TAGS, isContinentTag } from "@/config/continents";
import { visitedCities } from "@/config/visitedCities";
import { isNonEmptyString, isValidNumber, isObject } from "./typeGuards";

export interface TravelCoords {
  lat: number;
  lng: number;
}

export interface TravelMapPoint {
  name: string;
  description?: string;
  lat: number;
  lng: number;
}

export interface TravelMapData {
  gpx?: string;
  kml?: string;
  kmz?: string;
  points?: TravelMapPoint[];
}

export interface TravelTimelineItem {
  city: string;
  km?: number;
}

export interface Travel {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  description: string;
  coverImage: string;
  tags: string[];
  location: string;
  duration: string;
  content: string;
  gallery?: string[];
  coords?: TravelCoords;
  heroTitleVariant: "light" | "dark";
  map?: TravelMapData;
  totalKilometers?: number;
  timeline?: TravelTimelineItem[];
}

const travelsDirectory = path.join(process.cwd(), "src", "content", "travels");
let travelCache: Travel[] | null = null;

/**
 * Builds the travel cache by reading all Markdown files.
 * 
 * Note: Currently processes all .md files. Future implementation should:
 * - Filter by locale (e.g., only .md for Italian, .en.md for English)
 * - Group files by base slug to handle multilingual versions
 * - Validate common fields consistency across language versions
 * 
 * File naming convention:
 * - [slug].md → Italian (default)
 * - [slug].en.md → English
 * See MARKDOWN_I18N_CONVENTION.md for details.
 */
function buildCache(): Travel[] {
  const files = fs.readdirSync(travelsDirectory);
  const travels = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      // TODO: Extract locale from filename (e.g., .en.md → 'en', .md → 'it')
      // TODO: Extract base slug (remove locale extension)
      const slug = file.replace(/\.md$/, "");
      return parseTravelFromFile(slug);
    });

  travelCache = sortTravelsByDate(travels);
  return travelCache;
}

function ensureCache(): Travel[] {
  if (!travelCache) {
    return buildCache();
  }

  return travelCache;
}

/**
 * Parses a travel Markdown file into a Travel object.
 * 
 * Common fields (must be identical across language versions):
 * - slug, date, endDate, coverImage, tags, location, coords, map, gallery,
 *   heroTitleVariant, totalKilometers, timeline
 * 
 * Translated fields (should be localized):
 * - title, description, content, duration, map.points[].description
 * 
 * @param slug - Base slug of the travel (without locale extension)
 */
function parseTravelFromFile(slug: string): Travel {
  // TODO: Support locale parameter to load [slug].[locale].md files
  const filePath = path.join(travelsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processedContent = remark().use(remarkBreaks).use(html).processSync(content);

  if (!data.title || !data.date || !data.description || !data.coverImage) {
    throw new Error(`Missing mandatory fields in travel ${slug}`);
  }

  return {
    slug: data.slug ?? slug,
    title: data.title,
    date: data.date,
    endDate: data.endDate,
    description: data.description,
    coverImage: data.coverImage,
    tags: Array.isArray(data.tags) ? data.tags : [],
    location: data.location ?? "",
    duration: data.duration ?? "",
    gallery: Array.isArray(data.gallery) ? data.gallery : undefined,
    coords: parseCoords(data.coords),
    content: processedContent.toString(),
    heroTitleVariant: parseHeroTitleVariant(data.heroTitleVariant),
    map: parseMap(data.map),
    totalKilometers: normalizeNumber(data.totalKilometers),
    timeline: parseTimeline(data.timeline),
  } satisfies Travel;
}

function parseCoords(rawCoords: unknown): Travel["coords"] {
  if (!isObject(rawCoords)) {
    return undefined;
  }

  const lat = normalizeNumber(rawCoords.lat);
  const lng = normalizeNumber(rawCoords.lng);

  if (lat === undefined || lng === undefined) {
    return undefined;
  }

  return { lat, lng };
}

function normalizeNumber(value: unknown): number | undefined {
  if (isValidNumber(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function parseHeroTitleVariant(value: unknown): Travel["heroTitleVariant"] {
  if (value === "dark") {
    return "dark";
  }

  return "light";
}

function parseMap(rawMap: unknown): Travel["map"] {
  if (!isObject(rawMap)) {
    return undefined;
  }

  const gpx = isNonEmptyString(rawMap.gpx) ? rawMap.gpx : undefined;
  const kml = isNonEmptyString(rawMap.kml) ? rawMap.kml : undefined;
  const kmz = isNonEmptyString(rawMap.kmz) ? rawMap.kmz : undefined;

  const pointsRaw = rawMap.points;
  const points = Array.isArray(pointsRaw)
    ? pointsRaw
        .map(parseMapPoint)
        .filter((point): point is TravelMapPoint => Boolean(point))
    : undefined;

  if (!gpx && !kml && !kmz && (!points || points.length === 0)) {
    return undefined;
  }

  return {
    gpx,
    kml,
    kmz,
    points,
  };
}

function parseMapPoint(rawPoint: unknown): TravelMapPoint | undefined {
  if (!isObject(rawPoint)) {
    return undefined;
  }

  const lat = normalizeNumber(rawPoint.lat);
  const lng = normalizeNumber(rawPoint.lng);
  const name = isNonEmptyString(rawPoint.name) ? rawPoint.name.trim() : undefined;

  if (lat === undefined || lng === undefined || !name) {
    return undefined;
  }

  const description = isNonEmptyString(rawPoint.description) 
    ? rawPoint.description.trim() 
    : undefined;

  return {
    name,
    description,
    lat,
    lng,
  };
}

function parseTimeline(rawTimeline: unknown): Travel["timeline"] {
  if (!Array.isArray(rawTimeline) || rawTimeline.length === 0) {
    return undefined;
  }

  const timeline = rawTimeline
    .map(parseTimelineItem)
    .filter((item): item is TravelTimelineItem => Boolean(item));

  if (timeline.length === 0) {
    return undefined;
  }

  return timeline;
}

function parseTimelineItem(rawItem: unknown): TravelTimelineItem | undefined {
  if (!isObject(rawItem)) {
    return undefined;
  }

  const city = isNonEmptyString(rawItem.city) ? rawItem.city.trim() : undefined;

  if (!city) {
    return undefined;
  }

  const km = normalizeNumber(rawItem.km);

  return {
    city,
    km,
  };
}

export async function getAllTravels(): Promise<Travel[]> {
  return ensureCache();
}

export async function getTravelBySlug(slug: string): Promise<Travel> {
  const travels = ensureCache();
  const travel = travels.find((item) => item.slug === slug);

  if (!travel) {
    throw new Error(`Travel with slug ${slug} not found`);
  }

  return travel;
}

export function getAllTags(): string[] {
  const travels = ensureCache();
  const tags = new Set<string>();
  travels.forEach((travel) => {
    travel.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getTravelsByTag(tag: string): Travel[] {
  const travels = ensureCache();
  const normalized = tag.toLowerCase();
  return travels.filter((travel) =>
    travel.tags.some((travelTag) => travelTag.toLowerCase() === normalized)
  );
}

export function sortTravelsByDate(travels: Travel[]): Travel[] {
  return [...travels].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return bDate - aDate;
  });
}

export interface TravelStats {
  countriesVisited: number;
  continentsVisited: number;
  kilometersWalked: number;
  brokenShoes: number;
}

export function getTravelStats(): TravelStats {
  const travels = ensureCache();
  
  // Paesi visitati (dalla location dei travels + dalle città visitate)
  const countries = new Set<string>();
  travels.forEach((travel) => {
    if (travel.location && travel.location.trim()) {
      countries.add(travel.location.trim());
    }
  });
  // Aggiungi paesi dalle città visitate
  visitedCities.forEach((city) => {
    countries.add(city.country);
  });
  
  // Continenti visitati (dai tags dei travels + dalle città visitate)
  const continents = new Set<string>();
  travels.forEach((travel) => {
    travel.tags.forEach((tag) => {
      if (isContinentTag(tag)) {
        continents.add(tag);
      }
    });
  });
  // Aggiungi continenti dalle città visitate
  visitedCities.forEach((city) => {
    if (city.continent && isContinentTag(city.continent)) {
      continents.add(city.continent);
    }
  });
  
  // Km percorsi nei cammini (solo viaggi con tag "Cammini")
  const kilometersWalked = travels
    .filter((travel) => 
      travel.tags.some((tag) => tag.toLowerCase() === "cammini") &&
      travel.totalKilometers !== undefined
    )
    .reduce((sum, travel) => sum + (travel.totalKilometers || 0), 0);
  
  return {
    countriesVisited: countries.size,
    continentsVisited: continents.size,
    kilometersWalked: Math.round(kilometersWalked),
    brokenShoes: 4,
  };
}
