import React, { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'

const App = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default App