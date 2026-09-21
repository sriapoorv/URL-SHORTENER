import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--accent)] border-t-transparent"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-[var(--danger-soft)] border border-[var(--danger)]/20 text-[var(--danger)] text-sm px-4 py-3 rounded-xl">
        Couldn't load your URLs: {error.message}
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-2xl">
        <svg className="w-10 h-10 mx-auto text-[var(--ink-soft)]/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 010 5.656l-4 4a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.5 1.5" />
        </svg>
        <p className="font-medium text-[var(--ink)]">No links yet</p>
        <p className="text-sm text-[var(--ink-soft)] mt-1">Shorten your first URL above to see it here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {urls.urls.slice().reverse().map((url) => (
        <div
          key={url._id}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 sm:px-5 py-3.5 flex items-center gap-4 hover:border-[var(--accent)]/40 transition-colors"
        >
          <div className="min-w-0 flex-1">
            <a
              href={`https://short-url.com/${url.short_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-dark)] hover:underline"
            >
            short-url.com/{url.short_url}
            </a>
            <p className="text-xs text-[var(--ink-soft)] truncate mt-0.5">{url.full_url}</p>
          </div>

          <span className="hidden sm:inline-flex shrink-0 text-xs font-medium text-[var(--mint)] bg-[var(--mint-soft)] px-2.5 py-1 rounded-full">
            {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
          </span>

          <button
            onClick={() => handleCopy(`https://short-url.com/${url.short_url}`, url._id)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              copiedId === url._id
                ? 'bg-[var(--mint)] text-white'
                : 'bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-dark)]'
            }`}
          >
            {copiedId === url._id ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default UserUrl