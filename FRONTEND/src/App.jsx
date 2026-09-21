import React, { useEffect } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'
import Navbar from './components/NavBar'
import { getCurrentUser } from './api/user.api'
import { login } from './store/slice/authSlice.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user) dispatch(login(data.user))
      })
      .catch(() => {
      })
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App