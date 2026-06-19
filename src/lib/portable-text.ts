import type {PortableTextBlock} from 'next-sanity'

export type TocHeading = {
  id: string
  text: string
  level: 2 | 3 | 4
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function extractHeadings(body: PortableTextBlock[] = []): TocHeading[] {
  return body
    .filter(
      (block) =>
        block._type === 'block' &&
        block.style &&
        ['h2', 'h3', 'h4'].includes(block.style),
    )
    .map((block) => {
      const text =
        block.children
          ?.map((child) => ('text' in child ? child.text : ''))
          .join('') ?? ''

      const level: 2 | 3 | 4 =
        block.style === 'h2' ? 2 : block.style === 'h3' ? 3 : 4

      return {id: slugify(text), text, level}
    })
    .filter((heading) => heading.text.length > 0)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
