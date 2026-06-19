import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {client} from './client'

const {projectId, dataset} = client.config()

export function urlFor(source: SanityImageSource) {
  if (!projectId || !dataset) return null
  return createImageUrlBuilder({projectId, dataset}).image(source)
}
