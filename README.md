# Jinshi — The Observatory

A static portfolio for Jinshi / Zoomfrez, using the original charcoal, gold, and cream palette. The engineering map connects five disciplines to six projects; projects open in local detail panels so external demos are optional.

## Preview locally

Run `python3 -m http.server 8765` in this folder, then open `http://127.0.0.1:8765`.

There is no build step, package install, API key, or application backend. Fonts load from Google Fonts, with system fallbacks. External project links may require their own running services.

## Files

- `index.html`: all page content and the embedded project data used by the detail panels.
- `styles.css`: responsive layouts, original palette, orbital illustration, and reduced-motion support.
- `script.js`: discipline selection, project dialogs, filtering, writing expansion, and motion controls.
- `favicon.svg`, `preview.jpg`: site identity and social preview assets. The social preview image is retained from the original portfolio.
- `robots.txt`, `sitemap.xml`: search metadata for `https://zoomfrez.xyz/`.

When editing a project, update both its card content and its record in the `project-data` block. Update the corresponding discipline mapping in `script.js` if its classification changes. Writing and recognition links are normal HTML links.

## Deployment and domain

Deploy these files from the existing Vercel project as a static site. No build command is required. Connect `zoomfrez.xyz` to Production in Vercel, add the exact DNS record provided by Vercel in Cloudflare, and verify HTTPS. Only then redirect `portfolio.zoomfrez.xyz` to `zoomfrez.xyz`.

The canonical URL, Open Graph URL, Twitter image URL, sitemap, and robots file already target the root domain. Changing these files does not itself configure DNS or publish the site.

## Content boundaries

Project descriptions, technology labels, writing, and recognition are based on the original portfolio. Runtime availability and individual project implementations have not been independently audited. No project screenshots, performance claims, or technical architecture have been invented.
