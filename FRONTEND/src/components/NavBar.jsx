import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice.js';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
    } catch (err) {
      // Even if the server call fails, clear local session so the UI stays honest.
      console.error('Logout request failed:', err.message);
    } finally {
      dispatch(logout());
      setLoggingOut(false);
      navigate({ to: '/' });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur border-b border-[var(--border)] sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <Link to="/" className="font-display font-semibold text-lg text-[var(--ink)] tracking-tight">
            URL Shortener
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden sm:inline text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
                >
                  Dashboard
                </Link>
                <span className="hidden sm:inline text-sm text-[var(--ink-soft)]">
                  {user?.name || user?.email || 'Account'}
                </span>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="bg-white border border-[var(--border)] hover:border-[var(--danger)] hover:text-[var(--danger)] text-[var(--ink)] px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loggingOut ? 'Logging out…' : 'Log out'}
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;