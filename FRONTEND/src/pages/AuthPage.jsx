import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-[var(--ink)]">
            {showLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-[var(--ink-soft)] mt-2">
            {showLogin
              ? 'Log in to manage your shortened links.'
              : 'Sign up to start creating custom short links.'}
          </p>
        </div>
        {showLogin ? <LoginForm state={setShowLogin} /> : <RegisterForm state={setShowLogin} />}
      </div>
    </div>
  )
}

export default AuthPage