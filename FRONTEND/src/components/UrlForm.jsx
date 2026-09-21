import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [customSlug, setCustomSlug] = useState('')
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result = await createShortUrl(url, customSlug)
      setShortUrl(result)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-[var(--ink)] mb-1.5">
          Your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com/your-long-link"
          required
          className="w-full px-3.5 py-2.5 bg-white border border-[var(--border)] rounded-lg font-mono text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
        />
      </div>

      {isAuthenticated && (
        <div>
          <label htmlFor="customSlug" className="block text-sm font-medium text-[var(--ink)] mb-1.5">
            Custom slug <span className="text-[var(--ink-soft)] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="my-link"
            className="w-full px-3.5 py-2.5 bg-white border border-[var(--border)] rounded-lg font-mono text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Shortening…' : 'Shorten URL'}
      </button>

      {error && (
        <div className="p-3 bg-[var(--danger-soft)] border border-[var(--danger)]/20 text-[var(--danger)] text-sm rounded-lg">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="pt-2 animate-fade-up">
          <h2 className="text-sm font-medium text-[var(--ink-soft)] mb-2">Your shortened URL</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 px-3.5 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--accent-soft)] font-mono text-sm text-[var(--accent-dark)] min-w-0"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shrink-0 ${
                copied
                  ? 'bg-[var(--mint)] text-white'
                  : 'bg-[var(--ink)] text-white hover:bg-black'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default UrlForm