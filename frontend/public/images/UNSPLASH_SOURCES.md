# Current Unsplash Image Sources

This document tracks the Unsplash images currently used as placeholders for country pages.

## Regional Hero Images

These are defined in `frontend/src/data/countries/index.ts` → `getRegionalHeroImage()`

| Region | Unsplash ID | Preview URL |
|---|---|---|
| South Asia | `photo-1579684385127-1ef15d508118` | https://unsplash.com/photos/1579684385127-1ef15d508118 |
| Middle East | `photo-1576091160550-2173dba999ef` | https://unsplash.com/photos/1576091160550-2173dba999ef |
| Africa | `photo-1576091160399-112ba8d25d1d` | https://unsplash.com/photos/1576091160399-112ba8d25d1d |
| Western | `photo-1519494026892-80bbd2d6fd0d` | https://unsplash.com/photos/1519494026892-80bbd2d6fd0d |
| Central Asia | `photo-1576091160550-2173dba999ef` | https://unsplash.com/photos/1576091160550-2173dba999ef |

## Country Card Images (OG Images)

These are defined in `frontend/src/data/countries/index.ts` → `getCountryOgImage()`

Country-specific Unsplash IDs are mapped per country. See the `imageSeeds` object in `index.ts`.

## Migration Plan

When ready to use local images:

1. **Download images from Unsplash:**
   - Visit each URL above
   - Download at appropriate size (1920x1080 for heroes, 800x600 for cards)
   - Ensure proper attribution per Unsplash license

2. **Convert to WebP:**
   ```bash
   cd frontend/public/images/heroes
   cwebp -q 80 south-asia.jpg -o south-asia.webp
   ```

3. **Update helper functions:**
   ```typescript
   // Change from:
   'South Asia': 'https://images.unsplash.com/photo-...',
   
   // To:
   'South Asia': '/images/heroes/south-asia.webp',
   ```

4. **Update country metadata (optional):**
   ```typescript
   export const bangladeshMetadata: CountryMetadata = {
     // ...
     heroImage: '/images/heroes/south-asia.webp',
     cardImage: '/images/cards/bangladesh.webp',
   };
   ```

## Recommended Replacements

For better medical tourism relevance, consider these Unsplash searches:

- **Hero backgrounds:**
  - "medical passport visa documents"
  - "hospital modern corridor"
  - "doctor consultation room"
  - "medical tourism India"

- **Card thumbnails:**
  - "doctor patient consultation diverse"
  - "hospital care compassionate"
  - "medical team international"

## License Compliance

All Unsplash images are free to use under the Unsplash License:
- ✅ Free for commercial use
- ✅ No attribution required (but appreciated)
- ❌ Don't compile into a competing service
- ❌ Don't sell unmodified copies

Source: https://unsplash.com/license
