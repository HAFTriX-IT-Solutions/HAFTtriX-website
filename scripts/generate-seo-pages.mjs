import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = 'https://haftrixit.dev'
const pages = JSON.parse(await readFile(join(projectRoot, 'src/data/seoPages.json'), 'utf8'))
const template = await readFile(join(projectRoot, 'dist/index.html'), 'utf8')

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function replaceHeadValue(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Could not find expected head tag: ${pattern}`)
  return html.replace(pattern, replacement)
}

function createPageHtml(route, page) {
  const url = `${siteUrl}${route}`
  let html = template

  html = replaceHeadValue(html, /<title>[^<]*<\/title>/, `<title>${escapeAttribute(page.title)}</title>`)
  html = replaceHeadValue(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttribute(page.description)}" />`)
  html = replaceHeadValue(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  html = replaceHeadValue(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttribute(page.title)}" />`)
  html = replaceHeadValue(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttribute(page.description)}" />`)
  html = replaceHeadValue(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
  html = replaceHeadValue(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`)
  html = replaceHeadValue(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`)
  html = replaceHeadValue(html, /<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${url}" />`)

  return html
}

const sitemapEntries = []
for (const [route, page] of Object.entries(pages)) {
  sitemapEntries.push(`  <url><loc>${siteUrl}${route}</loc></url>`)
  if (route === '/') continue

  const outputDirectory = join(projectRoot, 'dist', route.slice(1))
  await mkdir(outputDirectory, { recursive: true })
  await writeFile(join(outputDirectory, 'index.html'), createPageHtml(route, page))
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  '</urlset>',
  '',
].join('\n')
await writeFile(join(projectRoot, 'dist/sitemap.xml'), sitemap)