import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-[var(--border)] shadow-sm rounded-2xl p-8">
      {error && (
        <div className="mb-5 p-3 bg-[var(--danger-soft)] border border-[var(--danger)]/20 text-[var(--danger)] text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--ink)] mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3.5 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          id="email"
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--ink)] mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3.5 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          id="password"
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-center mt-5 text-sm text-[var(--ink-soft)]">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => state(false)}
          className="text-[var(--accent)] font-medium hover:text-[var(--accent-dark)]"
        >
          Create one
        </button>
      </p>
    </form>
  );
};

export default LoginForm;