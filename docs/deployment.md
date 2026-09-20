# Deployment and domains

## Vercel

This is a static website with no build step. The existing Vercel project is connected to `Shanks239/portfolio`; production updates come from `main`.

- Serve the repository root.
- Use the **Other** framework preset if configuring a new project.
- Leave the build command empty. No compiled output directory is needed.
- `assets/` must deploy alongside `index.html`.
- Node.js and Prettier are only used for local development and formatting.

After deployment, check the homepage, project dialogs, writing filters, motion controls, and the browser console. Confirm that the CSS, JavaScript modules, favicon, and social sharing image load successfully.

## Primary domain

The canonical URL, social metadata, sitemap, and robots file use `https://zoomfrez.xyz/`. The root domain was verified serving the Observatory when this document was added.

Domain configuration is managed outside this repository:

1. Connect `zoomfrez.xyz` to Production in the existing Vercel project.
2. In Cloudflare, use the exact DNS record provided by Vercel. Keep unrelated subdomains and mail records unchanged.
3. Verify the domain and HTTPS certificate in Vercel.
4. Once the root domain works, configure `portfolio.zoomfrez.xyz` to redirect to `zoomfrez.xyz` in Vercel.

The social preview image is at `/assets/images/preview.jpg`. Its metadata URLs are updated alongside the asset path.

## References

- [Vercel: Add a domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel: Domain redirects](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting)
