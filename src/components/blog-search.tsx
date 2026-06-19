'use client'

import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useEffect, useId, useRef, useState} from 'react'
import {formatDate} from '@/lib/portable-text'
import type {SearchResult} from '@/sanity/queries/search'

type BlogSearchProps = {
  variant?: 'navbar' | 'hero'
  placeholder?: string
  initialQuery?: string
}

export function BlogSearch({
  variant = 'hero',
  placeholder = 'Search Bruno Blog',
  initialQuery = '',
}: BlogSearchProps) {
  const router = useRouter()
  const listboxId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const trimmed = query.trim()

    if (trimmed.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const controller = new AbortController()

    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&limit=6`,
          {signal: controller.signal},
        )
        const data = (await response.json()) as {results: SearchResult[]}
        setResults(data.results ?? [])
        setIsOpen(true)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setResults([])
        }
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const isNavbar = variant === 'navbar'

  return (
    <div ref={containerRef} className={`relative ${isNavbar ? 'w-full max-w-xs' : 'mx-auto w-full max-w-xl'}`}>
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor={`${listboxId}-input`} className="sr-only">
          Search blog posts
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            <SearchIcon />
          </span>
          <input
            id={`${listboxId}-input`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete="list"
            className={
              isNavbar
                ? 'w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#ea580c] focus:bg-white focus:ring-2 focus:ring-[#ea580c]/20'
                : 'w-full rounded-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-base text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/20'
            }
          />
        </div>
      </form>

      {isOpen && query.trim().length >= 2 && (
        <div
          id={listboxId}
          role="listbox"
          className={`absolute z-50 mt-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg ${
            isNavbar ? 'left-0 right-0' : 'left-0 right-0'
          }`}
        >
          {isLoading ? (
            <p className="px-4 py-3 text-sm text-zinc-500">Searching...</p>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((result) => (
                <li key={result._id} role="option">
                  <Link
                    href={`/${result.slug.current}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 transition hover:bg-zinc-50"
                  >
                    <p className="font-medium text-zinc-900">{result.title}</p>
                    {result.author?.name && (
                      <p className="mt-1 text-xs text-zinc-500">
                        {result.author.name} · {formatDate(result.publishedAt)}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-zinc-500">No posts found.</p>
          )}

          {!isLoading && results.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                router.push(`/search?q=${encodeURIComponent(query.trim())}`)
              }}
              className="w-full border-t border-zinc-100 px-4 py-3 text-left text-sm font-medium text-[#ea580c] hover:bg-zinc-50"
            >
              View all results for &ldquo;{query.trim()}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
