# Khan Tours and Medical Solution — Business Card

## Overview

A print-ready business card for **Khan Tours and Medical Solution**, combining medical and travel services in a single cohesive layout. Built as a self-contained HTML file with inline SVG icons and CSS styling.

## File Structure

```
buscard/
├── example/
│   └── business-card-frontside.png   (reference image)
├── index.html                         (main business card)
└── README.md                          (this file)
```

## How to Use

### View the Card
1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
2. The card renders at 1050 × 600 px (equivalent to 3.5 × 2 inches at 300 DPI).

### Export as PNG
1. Open `index.html` in Chrome.
2. Right-click → "Inspect" → Toggle device toolbar (Ctrl+Shift+M).
3. Set custom dimensions: 1050 × 600.
4. Take a screenshot, or use a browser extension like "GoFullPage".

### Export as PDF (Print-Ready)
1. Open `index.html` in browser.
2. Click the **Print / Export PDF** button below the card.
3. In the print dialog:
   - Set paper size to custom (3.5 × 2 inches) or A4.
   - Set margins to "None".
   - Enable "Background graphics".
   - Save as PDF.

### Transparent Background
- Click the **Toggle Transparent BG** button to switch between solid and semi-transparent backgrounds.

## Design Specifications

### Card Dimensions
- **Size:** 3.5 × 2 inches (standard business card, landscape)
- **Resolution:** 300 DPI (1050 × 600 px)

### Color Palette

| Element      | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| Blue        | `#003366` | Headers, icons, footer bar     |
| Yellow      | `#FFD700` | Divider, name, airplane        |
| White       | `#FFFFFF` | Background (bottom), text      |
| Red         | `#FF0000` | Medical cross, accents         |
| Gold        | `#CFAE60` | Ribbon banner                  |

### Typography

| Element      | Font           | Weight   |
|-------------|----------------|----------|
| Headers      | Montserrat     | Bold/800 |
| Body text    | Open Sans      | Regular/600 |
| Brand name   | Pacifico       | Regular (cursive) |
| Contact name | Pacifico       | Regular (cursive) |

### Sections

1. **Top:** Globe with red cross logo, "Khan" in cursive, gold ribbon banner, airplane + skyline
2. **Middle Left:** Medical Services (Hospital Appointment, Medical Transport, Healthcare Assistance)
3. **Middle Right:** Travel Services (Air & Bus Ticket, Hotel Booking, Tour Package, Airport Pickup & Drop)
4. **Center:** Contact name (Masum Khan), WhatsApp number, address
5. **Bottom:** Payment options (Bank Transfer, bKash, Nagad) + "Money Transfer Done Here" footer

## Fonts

Loaded via Google Fonts CDN:
- [Montserrat](https://fonts.google.com/specimen/Montserrat)
- [Open Sans](https://fonts.google.com/specimen/Open+Sans)
- [Pacifico](https://fonts.google.com/specimen/Pacifico)

## Tech Stack

- HTML5
- CSS3 (gradients, flexbox, drop shadows, `@media print`)
- Inline SVG (all icons — no icon library needed)
- Google Fonts (CDN)
