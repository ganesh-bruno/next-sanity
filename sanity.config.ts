'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'
import {resolve} from './src/sanity/presentation/resolve'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Bruno Blog',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        initial: siteUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
