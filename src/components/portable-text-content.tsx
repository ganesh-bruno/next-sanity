import {PortableText, type PortableTextBlock} from 'next-sanity'
import type {PortableTextBlockComponent} from '@portabletext/react'
import {slugify} from '@/lib/portable-text'

function getBlockText(value: {children?: Array<{text?: string | null}>}) {
  return value.children?.map((child) => child.text ?? '').join('') ?? ''
}

const heading =
  (Tag: 'h2' | 'h3' | 'h4', className: string): PortableTextBlockComponent =>
  ({children, value}) => {
    const text = getBlockText(value as {children?: Array<{text?: string | null}>})
    return (
      <Tag id={slugify(text)} className={`scroll-mt-24 ${className}`}>
        {children}
      </Tag>
    )
  }

const components = {
  block: {
    h2: heading('h2', 'mt-12 text-2xl font-bold text-zinc-900'),
    h3: heading('h3', 'mt-10 text-xl font-semibold text-zinc-900'),
    h4: heading('h4', 'mt-8 text-lg font-semibold text-zinc-900'),
    normal: ({children}: {children?: React.ReactNode}) => (
      <p className="text-base leading-8 text-zinc-700">{children}</p>
    ),
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-4 border-zinc-900 pl-4 italic text-zinc-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode
      value?: {href?: string}
    }) => (
      <a
        href={value?.href}
        className="font-medium text-[#e0452f] underline-offset-2 hover:underline"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({children}: {children?: React.ReactNode}) => (
      <strong className="font-semibold text-zinc-900">{children}</strong>
    ),
  },
  list: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <ul className="list-disc space-y-3 pl-6 text-base leading-8 text-zinc-700">
        {children}
      </ul>
    ),
    number: ({children}: {children?: React.ReactNode}) => (
      <ol className="list-decimal space-y-3 pl-6 text-base leading-8 text-zinc-700">
        {children}
      </ol>
    ),
  },
}

export function PortableTextContent({value}: {value: PortableTextBlock[]}) {
  return (
    <div className="prose-blog space-y-6">
      <PortableText value={value} components={components} />
    </div>
  )
}
