# Country Page Images

This directory contains images for country landing pages (Phase 5.3).

## Directory Structure

```
images/
├── heroes/          # Hero background images (1920x1080, WebP)
│   ├── south-asia.webp
│   ├── middle-east.webp
│   ├── africa.webp
│   ├── western.webp
│   └── central-asia.webp
│
└── cards/           # Country card thumbnails (800x600, WebP)
    ├── bangladesh.webp
    ├── uae.webp
    ├── nigeria.webp
    └── ... (31 total)
```

## Image Specifications

### Hero Images (Regional)
- **Dimensions:** 1920x1080 (16:9 aspect ratio)
- **Format:** WebP (fallback: JPG)
- **Quality:** 80%
- **Max file size:** 200KB
- **Theme:** Medical tourism (passport, documents, hospital, consultation)
- **Usage:** Background for country page hero sections

### Card Images (Country-specific)
- **Dimensions:** 800x600 (4:3 aspect ratio)
- **Format:** WebP (fallback: JPG)
- **Quality:** 80%
- **Max file size:** 100KB
- **Theme:** Doctor consultation, hospital care, compassionate care
- **Usage:** Thumbnails for country directory cards

## Current Status

**Temporary:** Currently using Unsplash URLs via the `getRegionalHeroImage()` and `getCountryOgImage()` helper functions.

**Next steps:**
1. Download curated images from Unsplash/Pexels
2. Convert to WebP using Squoosh.app or `cwebp`
3. Place in appropriate directories
4. Update country metadata to reference local paths

## Recommended Sources

### Free Stock Photos
- **Unsplash:** https://unsplash.com/s/photos/hospital-consultation
- **Pexels:** https://www.pexels.com/search/medical%20consultation/
- **Pixabay:** https://pixabay.com/images/search/hospital/

### Search Terms
- "hospital consultation modern"
- "doctor patient consultation"
- "medical passport documents"
- "hospital corridor India"
- "medical tourism"

## Conversion Tools

### Online
- **Squoosh:** https://squoosh.app/ (free, browser-based)

### CLI
```bash
# Convert single image
cwebp -q 80 input.jpg -o output.webp

# Batch convert all JPGs in directory
for file in *.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

## Flag Icons

Country flags are served via **Flagpack CDN** (no local files needed):
```
https://flagpack.xyz/flags/4x3/{ISO_CODE}.svg
```

Example: `https://flagpack.xyz/flags/4x3/BD.svg` for Bangladesh
