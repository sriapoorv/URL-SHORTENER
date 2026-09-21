import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, password, email);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
        <label className="block text-sm font-medium text-[var(--ink)] mb-1.5" htmlFor="name">
          Full name
        </label>
        <input
          className="w-full px-3.5 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          id="name"
          type="text"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--ink)] mb-1.5" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3.5 py-2.5 bg-white border border-[var(--border)] rounded-lg text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
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
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <button
        className="w-full bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center mt-5 text-sm text-[var(--ink-soft)]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => state(true)}
          className="text-[var(--accent)] font-medium hover:text-[var(--accent-dark)]"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;