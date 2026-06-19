import {client} from '@/sanity/lib/client'
import {defineEnableDraftMode} from 'next-sanity/draft-mode'

const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  throw new Error(
    'Missing SANITY_API_READ_TOKEN. Create a Viewer token at https://www.sanity.io/manage and add it to .env.local',
  )
}

export const {GET} = defineEnableDraftMode({
  client: client.withConfig({token}),
})
