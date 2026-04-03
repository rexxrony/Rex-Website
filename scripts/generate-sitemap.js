import fs from 'fs'
import { create } from 'xmlbuilder2'

const baseUrl = 'https://www.rexronyjacob.com'
const routes = ['/', '/dev', '/photography']

const urlset = create({ version: '1.0' }).ele('urlset', {
  xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
})

const lastMod = new Date().toISOString()

routes.forEach((route) => {
  const url = urlset.ele('url')
  url.ele('loc').txt(`${baseUrl}${route}`)
  url.ele('lastmod').txt(lastMod)
})

const xml = urlset.end({ prettyPrint: true })
const outputPath = new URL('../public/sitemap.xml', import.meta.url)
fs.mkdirSync(new URL('../public', import.meta.url), { recursive: true })
fs.writeFileSync(outputPath, xml)

console.log(`Sitemap generated with ${routes.length} URLs at ${outputPath.pathname}`)
