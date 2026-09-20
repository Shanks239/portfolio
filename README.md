# Jinshi — The Observatory

A personal portfolio for **Jinshi / Zoomfrez**: engineering projects, creative experiments, and writing connected by an interactive observatory.

**Live site:** [zoomfrez.xyz](https://zoomfrez.xyz/)

## Features

- Five engineering disciplines connected to six project overviews.
- Animated event horizon and reversible singularity mode.
- Project notes that work without live demo APIs.
- Filterable writing, recognition, and contact links.
- Responsive layout, keyboard-accessible dialogs, and reduced-motion support.

## Repository structure

```text
portfolio/
├── index.html                 # Page structure and static content
├── assets/
│   ├── css/
│   │   └── main.css           # Layout, colors, and animation
│   ├── js/
│   │   ├── main.js            # Interactions and accessibility
│   │   └── projects.js        # Project details and illustrations
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       └── preview.jpg        # Social sharing image
├── docs/
│   └── deployment.md         # Hosting and domain setup
├── robots.txt
├── sitemap.xml
├── package.json              # Development commands
└── README.md
```

## Local preview

The site is plain HTML, CSS, and JavaScript. It has no build step or API credentials.

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Open [localhost:8766](http://localhost:8766). Serve the folder over HTTP rather than opening `index.html` directly, because the scripts use JavaScript modules.

With Node.js installed, `npm run dev` starts the same preview server.

## Formatting

Install the development formatter once:

```sh
npm ci
```

Then use:

```sh
npm run format
npm run format:check
```

Formatting rules live in `.prettierrc.json`. Prettier is a development tool only; the deployed site has no runtime package dependencies.

## Editing content

- **Page copy, project cards, writing, recognition:** edit `index.html`.
- **Project detail panels:** edit `assets/js/projects.js`. Keep the project ID, title, and technology labels consistent with its card in `index.html`.
- **Engineering categories and interactions:** edit `assets/js/main.js`.
- **Visual design:** edit `assets/css/main.css`.

Google Fonts loads with system-font fallbacks. Project descriptions and technology labels are based on the original portfolio. External demos may be offline while their API services are disconnected.

## Deployment

Vercel serves the repository root as a static website. See [deployment and domains](docs/deployment.md). The existing social sharing image is retained from the original portfolio.
