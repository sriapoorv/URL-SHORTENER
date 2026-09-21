import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-[var(--ink)] tracking-tight">
            Long links, short work.
          </h1>
          <p className="text-[var(--ink-soft)] mt-3">
            Paste any URL. Get a link short enough to say out loud.
          </p>
        </div>

        {/* Signature moment: the long URL visibly compresses into the short one */}
        <div className="flex items-center gap-3 mb-8 px-1 overflow-hidden">
          <span className="font-mono text-xs text-[var(--ink-soft)]/50 truncate flex-1 text-right">
            https://example.com/blog/2026/how-to-actually-finish-side-projects
          </span>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="shrink-0 text-[var(--accent)]">
            <path d="M1 7H21M21 7L15 1M21 7L15 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-sm font-medium text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-md shrink-0">
          short-url.com/f9k2
          </span>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] shadow-sm rounded-2xl p-6 sm:p-8">
          <UrlForm />
        </div>
      </div>
    </div>
  )
}

export default HomePage