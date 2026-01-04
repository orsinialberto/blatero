# Markdown Multilingual File Convention

This document defines the naming convention and structure for multilingual Markdown travel files.

## Overview

The blog supports multiple languages for travel posts. Each travel can have translations in different languages, with Italian as the default language.

## File Naming Convention

### Policy

- **Default language (Italian)**: `[slug].md` (e.g., `cambogia-2025.md`)
- **English translation**: `[slug].en.md` (e.g., `cambogia-2025.en.md`)
- **Future languages**: `[slug].[locale].md` (e.g., `cambogia-2025.es.md` for Spanish)

### Rules

1. The `slug` must be **identical** in all language versions of the same travel
2. The base filename (before the locale extension) must match the slug
3. The locale extension (`.en`, `.es`, etc.) is placed before the `.md` extension
4. If no locale extension is present, the file is considered Italian (default)

### Examples

```
cambogia-2025.md          → Italian (default)
cambogia-2025.en.md       → English
cambogia-2025.es.md       → Spanish (future)
```

## Frontmatter Structure

### Common Fields (Not Translated)

These fields must be **identical** across all language versions of the same travel:

- `slug` - Unique identifier for the travel (must match filename base)
- `date` - Start date of the travel (ISO format: `YYYY-MM-DD`)
- `endDate` - End date of the travel (optional, ISO format: `YYYY-MM-DD`)
- `coverImage` - URL to the cover image
- `tags` - Array of tags (e.g., `["Cambogia", "Asia", "ZainoInSpalla"]`)
- `location` - Location/country name (used for filtering, not displayed)
- `coords` - Geographic coordinates (`lat`, `lng`)
- `map` - Map configuration:
  - `gpx`, `kml`, `kmz` - Track file paths
  - `points[].name` - Point names (geographic identifiers)
  - `points[].lat`, `points[].lng` - Point coordinates
- `gallery` - Array of image URLs
- `heroTitleVariant` - Hero title variant (`"light"` or `"dark"`)
- `totalKilometers` - Total kilometers traveled (number)
- `timeline[].city` - City names in timeline (geographic identifiers)
- `timeline[].km` - Kilometers for timeline items

**Rationale**: These fields represent shared metadata, geographic data, or technical configuration that should remain consistent across languages.

### Translated Fields

These fields should be **translated** in each language version:

- `title` - Travel title
- `description` - Short description/summary
- `content` - Main Markdown content (body of the post)
- `duration` - Duration string (e.g., `"14 giorni"` → `"14 days"`)
- `map.points[].description` - Descriptions for map points

**Rationale**: These fields contain user-facing text that should be localized.

## Example Structure

### Italian File (`cambogia-2025.md`)

```yaml
---
title: "Cambogia"
slug: "cambogia-2025"
date: "2025-06-02"
endDate: "2025-06-15"
description: "Viaggio in Cambogia sulle tracce di una civiltà antica e leggendaria"
coverImage: "https://res.cloudinary.com/..."
heroTitleVariant: "light"
tags:
  - Cambogia
  - Asia
  - ZainoInSpalla
location: "Cambogia"
duration: "14 giorni"
coords:
  lat: 13.3633
  lng: 103.8564
map:
  points:
    - name: "Phnom Penh"
      lat: 11.5564
      lng: 104.9282
      description: "Capitale e punto di partenza del viaggio"
    - name: "Siem Reap"
      lat: 13.3633
      lng: 103.8564
      description: "Accesso ad Angkor Wat e ai templi Khmer"
gallery:
  - "https://res.cloudinary.com/..."
totalKilometers: 1200
timeline:
  - city: "Phnom Penh"
    km: 0
  - city: "Siem Reap"
    km: 300
---

## Introduzione

La Cambogia è uno di quei paesi che ti sorprendono...
```

### English File (`cambogia-2025.en.md`)

```yaml
---
title: "Cambodia"
slug: "cambogia-2025"                    # ← Same slug
date: "2025-06-02"                       # ← Same date
endDate: "2025-06-15"                    # ← Same endDate
description: "Journey through Cambodia following the traces of an ancient and legendary civilization"
coverImage: "https://res.cloudinary.com/..."  # ← Same coverImage
heroTitleVariant: "light"                # ← Same variant
tags:                                    # ← Same tags
  - Cambogia
  - Asia
  - ZainoInSpalla
location: "Cambogia"                     # ← Same location
duration: "14 days"                      # ← Translated
coords:                                  # ← Same coords
  lat: 13.3633
  lng: 103.8564
map:                                     # ← Same map structure
  points:
    - name: "Phnom Penh"                 # ← Same name (geographic identifier)
      lat: 11.5564                       # ← Same coordinates
      lng: 104.9282
      description: "Capital and starting point of the journey"  # ← Translated
    - name: "Siem Reap"                  # ← Same name
      lat: 13.3633                       # ← Same coordinates
      lng: 103.8564
      description: "Gateway to Angkor Wat and Khmer temples"  # ← Translated
gallery:                                 # ← Same gallery URLs
  - "https://res.cloudinary.com/..."
totalKilometers: 1200                    # ← Same number
timeline:                                # ← Same timeline structure
  - city: "Phnom Penh"                   # ← Same city names
    km: 0
  - city: "Siem Reap"
    km: 300
---

## Introduction

Cambodia is one of those countries that surprises you...
```

## Validation Rules

When implementing the parsing logic, ensure:

1. **Slug Consistency**: All language versions of the same travel must have the same `slug` value
2. **Filename-Slug Match**: The base filename must match the `slug` field
3. **Common Fields Match**: Common fields (date, coverImage, tags, etc.) should be validated to match across language versions
4. **Required Fields**: All required fields must be present in each language version:
   - `title`, `slug`, `date`, `description`, `coverImage`

## Implementation Notes

- The parsing logic in `src/lib/travels.ts` will need to be updated to:
  - Detect language from filename pattern
  - Group files by base slug
  - Validate consistency of common fields
  - Load appropriate language version based on user locale

## Future Extensions

When adding support for additional languages:

1. Follow the same naming pattern: `[slug].[locale].md`
2. Use standard locale codes (ISO 639-1): `.en`, `.es`, `.fr`, `.de`, etc.
3. Ensure all common fields remain identical
4. Translate all user-facing fields appropriately

## Migration Path

For existing Italian-only files:

1. No changes required - they continue to work as default (Italian)
2. When creating translations, add the `.en.md` (or other locale) version
3. Ensure the slug matches exactly between versions

---

**Last Updated**: January 2025  
**Version**: 1.0.0
