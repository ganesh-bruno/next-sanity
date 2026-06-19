import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
if (!dataset) throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-15',
  useCdn: true,
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/studio`,
  },
})
