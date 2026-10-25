#!/usr/bin/env node
/**
 * Downloads all portfolio images from Google Sites into public/images/.
 * Run with:  npm run images
 *
 * Google may rate-limit direct downloads (HTTP 403). If an image fails,
 * wait a while and re-run this script — it skips files that already exist.
 * You can also open each failing URL in your browser and save it manually.
 */
import { readFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const manifest = JSON.parse(readFileSync(new URL('./images.json', import.meta.url), 'utf8'))

const UAS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) Firefox/125.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function download(entry) {
  const dest = entry.dest
  if (existsSync(dest) && statSync(dest).size > 1000) {
    console.log(`[skip]  ${dest}`)
    return true
  }
  mkdirSync(dirname(dest), { recursive: true })
  for (let attempt = 1; attempt <= 8; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 45000)
    try {
      const res = await fetch(entry.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': UAS[attempt % UAS.length],
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          Referer: 'https://sites.google.com/',
        },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length <= 1000) throw new Error('Empty/bot response')
      writeFileSync(dest, buf)
      console.log(`[ok]    ${dest} (${buf.length} bytes)`)
      return true
    } catch (err) {
      console.log(`[retry${attempt}] ${dest} — ${err.message}`)
      await sleep(4000 + attempt * 2500)
    } finally {
      clearTimeout(timer)
    }
  }
  console.log(`[FAIL]  ${dest}`)
  return false
}

let ok = 0
let fail = 0
for (const entry of manifest) {
  if (await download(entry)) ok++
  else fail++
  await sleep(800)
}
console.log(`\nDone. ${ok} ok, ${fail} failed.`)
if (fail > 0) {
  console.log('\nSome images failed. This is Google rate-limiting.')
  console.log('Wait ~30 minutes and run `npm run images` again.')
  console.log('The site gracefully shows placeholders for missing images.')
}
