/** Resolve a public-dir asset against Vite's base URL so the site works
 *  when hosted under a subpath (e.g. GitHub Pages project sites). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
