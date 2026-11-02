# Exclusive Sole — WEDE5020 Part 3

Student: Rofhiwa Theophilus Tshimomola
Module: WEDE5020
Business: Exclusive Sole - Authentic sneakers, Sandton, SA
Branding: Red/Black/White - Authenticity. Individuality. Exclusive style.

## Pages & Purpose
- `index.html` - hero, featured 3 sneakers, promo to services
- `product.html` - full catalogue with live search + sort + count
- `services.html` - 3 services: global sourcing, verification, showroom
- `aboutus.html` - brand story + founder Rofhiwa Theophilus Tshimomola
- `inquiry.html` - sneaker enquiry with validation
- `contact.html` - general message + Leaflet map Sandton City

## Part 3 Functionality Implemented
- Responsive nav with `aria-current="page"` indication
- Lightbox: click image to enlarge, close via X / backdrop / Escape key
- Catalogue: search by name, sort by name/price, live count, no-results message
- Enquiry: required fields, email regex, phone regex `[0-9+()\s-]{7,20}`, size required, contextual response
- Contact: validation + `mailto:` with subject/body compilation
- Leaflet map centred `-26.1076,28.0567` Sandton City area
- Accessibility: skip link, focus-visible, reduced-motion, aria-live regions

## SEO and Technical Improvements
- Unique title + description + keywords per page
- Semantic headings h1,h2,h3
- Alt text on all images (lightbox-image class)
- Internal linking between catalogue and enquiry (`?shoe=`)
- `robots.txt` and `sitemap.xml` included
- Relative paths for images/css/js (fixed Windows absolute paths from Part 2)
- `_headers` for Netlify security headers

## Important Setup Before Publishing
1. Open `js/main.js` and replace `REPLACE-WITH-YOUR-REAL-EMAIL@example.com` in `CONTACT_EMAIL`
2. Replace `YOUR-DEPLOYED-DOMAIN` in `robots.txt` and `sitemap.xml` with final HTTPS domain
3. Confirm exact showroom/meeting address before inviting customers

## Run Locally
```bash
python -m http.server 8000