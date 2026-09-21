import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto animate-fade-up">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Your links</h1>
          <p className="text-[var(--ink-soft)] mt-1">Create and track all your shortened URLs.</p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] shadow-sm rounded-2xl p-6 sm:p-8 mb-6">
          <UrlForm />
        </div>

        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage