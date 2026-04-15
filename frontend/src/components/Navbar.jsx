import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-primary)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--primary-600), var(--accent-500))',
              boxShadow: '0 0 20px var(--primary-glow)',
            }}
          >
            <div className="absolute inset-0 bg-white opacity-20 transform -rotate-45 translate-x-4 -translate-y-4 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10">
              {/* Stack/Repo Layers */}
              <path d="M21 8L12 13L3 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12L12 17L3 12" stroke="white" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 16L12 21L3 16" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Code/Learn node */}
              <circle cx="12" cy="7" r="2.5" fill="white"/>
            </svg>
          </motion.div>
          <span
            className="text-xl sm:text-2xl font-black tracking-tight transition-all duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Repo<span style={{ color: 'var(--primary-500)' }}>Academy</span>
          </span>
        </Link>

        {/* Nav items + Theme Toggle */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 p-1 rounded-2xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <Link
              to="/"
              className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300"
              style={{
                color: location.pathname === '/' ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
            >
              {location.pathname === '/' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'var(--glass-hover)',
                    border: '1px solid var(--border-hover)',
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">Explore</span>
            </Link>
            <a
              href="https://github.com/YOGARATHNAM-S"
              target="_blank"
              rel="noreferrer"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="hidden sm:inline">GitHub</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            onClick={toggleTheme}
            className="theme-toggle"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
