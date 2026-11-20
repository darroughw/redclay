// One-time seed: loads the approved Figma copy and photos (web/src/content/defaults.ts)
// into Sanity, so Kerney starts from the finished site instead of empty forms.
//
//   npx sanity exec scripts/import-defaults.ts --with-user-token
//
// Safe to re-run: every document is created only if it doesn't exist yet, so edits made
// in the Studio are never overwritten. Photos are uploaded once (Sanity dedupes by content).
import {createReadStream} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {defaults} from '../../web/src/content/defaults'
import type {Photo} from '../../web/src/content/types'

const client = getCliClient({apiVersion: '2025-01-01'})
const publicDir = resolve(import.meta.dirname, '../../web/public')
const uploaded = new Map<string, string>()

async function photo(p: Photo) {
  let id = uploaded.get(p.src)
  if (!id) {
    const asset = await client.assets.upload('image', createReadStream(resolve(publicDir, `.${p.src}`)), {
      filename: basename(p.src),
    })
    id = asset._id
    uploaded.set(p.src, id)
    console.log(`  uploaded ${p.src}`)
  }
  return {_type: 'photo', alt: p.alt, asset: {_type: 'reference', _ref: id}}
}

// Arrays of objects need a stable _key per item.
const keyed = <T extends object>(items: T[], type?: string) =>
  items.map((item, i) => ({_key: `k${i}`, ...(type ? {_type: type} : {}), ...item}))

async function main() {
  const d = defaults
  const tx = client.transaction()

  console.log('Business info')
  tx.createIfNotExists({_id: 'business', _type: 'business', ...d.business})

  console.log('Home page')
  tx.createIfNotExists({
    _id: 'homePage',
    _type: 'homePage',
    hero: {...d.hero, photo: await photo(d.hero.photo)},
    problemTiles: keyed(d.problemTiles, 'problemTile'),
    warningSigns: keyed(d.warningSigns, 'warningSign'),
    beforeAfter: {
      ...d.beforeAfter,
      before: await photo(d.beforeAfter.before),
      after: await photo(d.beforeAfter.after),
    },
    steps: keyed(d.steps, 'step'),
    gallery: keyed(await Promise.all(d.gallery.map(photo))),
    galleryTags: d.galleryTags,
    about: {...d.about, photo: await photo(d.about.photo)},
  })

  console.log('Services')
  for (const [i, s] of d.services.entries()) {
    tx.createIfNotExists({
      _id: `service-${s.id}`,
      _type: 'service',
      title: s.title,
      slug: {_type: 'slug', current: s.id},
      summary: s.summary,
      summaryShort: s.summaryShort,
      photo: await photo(s.photo),
      order: i + 1,
    })
  }

  console.log('Reviews')
  for (const [i, r] of d.reviews.entries()) {
    tx.createIfNotExists({_id: `review-seed-${i + 1}`, _type: 'review', ...r, featured: i === 0})
  }

  const result = await tx.commit()
  console.log(`Done: ${result.results.length} documents checked (existing ones left untouched).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
