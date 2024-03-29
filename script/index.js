import {parse} from "node-html-parser";
import {glob} from "glob";
import urlRegex from 'url-regex'
import fs from 'fs'

const vitePluginDnsPrefetch = ({
   limit = 20,
   excludeDnsPrefetchUrl = []
                               }) => {
  const urlPattern = /(https?:\/\/[^/]*)/i
  const urls = new Set()

  async function searchDomain() {
    const files = await glob('dist/**/*.{html,css,js}', {ignore: 'node_modules/**'});
    for (const file of files) {
      const source = fs.readFileSync(file, 'utf-8')
      const matches = source.match(urlRegex({strict: true}))
      if (matches) {
        matches.forEach(url => {
          const match = url.match(urlPattern)
          if (match && match[1] && !excludeDnsPrefetchUrl.includes(match[1])) {
            urls.add(match[1])
            if (urls.size >= limit) {
              return
            }
          }
        })
      }
    }
  }

  async function insertLinks() {
    const files = await glob('dist/**/*.html')
    let links = '\n';
    links = links += [...urls].map(url => `\t<link rel="dns-prefetch" href="${url}" />`).join('\n');
    for (const file of files) {
      const html = fs.readFileSync(file, 'utf-8')
      const root = parse(html);
      const head = root.querySelector('head')
      head.insertAdjacentHTML('afterbegin', links);
      fs.writeFileSync(file, root.toString())
    }

  }

  return {
    name: 'vitePluginDnsPrefetch',
    async closeBundle() {
      await searchDomain()
      await insertLinks()
    }
  }
}


export default vitePluginDnsPrefetch
