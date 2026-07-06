import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
    <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl text-black font-bold text-center mb-6">URL Shortener</h1>
      <UrlForm/>
    </div>
  </div>
  )
}

export default HomePage