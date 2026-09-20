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
├── public/                    # Everything served by the website
│   ├── index.html
│   ├── assets/
│   │   ├── css/main.css
│   │   ├── js/main.js
│   │   ├── js/projects.js
│   │   ├── icons/favicon.svg
│   │   └── images/preview.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── tooling/                   # Development dependencies and formatting
│   ├── package.json
│   ├── package-lock.json
│   ├── .prettierrc.json
│   └── .prettierignore
├── docs/
│   └── deployment.md
├── .gitignore
├── vercel.json                # Deploys public/ at the domain root
└── README.md
```

## Local preview

The site is plain HTML, CSS, and JavaScript. It has no build step or API credentials.

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory public
```

Open [localhost:8766](http://localhost:8766). Serve the folder over HTTP rather than opening `index.html` directly, because the scripts use JavaScript modules.

With Node.js installed, `npm --prefix tooling run dev` starts the same preview server.

## Formatting

Install the development formatter once:

```sh
npm --prefix tooling ci
```

Then use:

```sh
npm --prefix tooling run format
npm --prefix tooling run format:check
```

Formatting rules live in `tooling/.prettierrc.json`. Prettier is a development tool only; the deployed site has no runtime package dependencies.

## Editing content

- **Page copy, project cards, writing, recognition:** edit `public/index.html`.
- **Project detail panels:** edit `public/assets/js/projects.js`. Keep the project ID, title, and technology labels consistent with its card in `public/index.html`.
- **Engineering categories and interactions:** edit `public/assets/js/main.js`.
- **Visual design:** edit `public/assets/css/main.css`.

Google Fonts loads with system-font fallbacks. Project descriptions and technology labels are based on the original portfolio. External demos may be offline while their API services are disconnected.

## Deployment

Vercel serves only `public/` as the website, configured by `vercel.json`. See [deployment and domains](docs/deployment.md). The existing social sharing image is retained from the original portfolio.
