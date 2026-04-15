import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RepoPage from './pages/RepoPage';
import VantaBackground from './components/VantaBackground';

export default function App() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen relative overflow-hidden font-sans"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Vanta RINGS Animated Background */}
      <VantaBackground />

      {/* Gradient overlay for text readability */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.35) 40%, rgba(2,6,23,0.7) 100%)'
            : 'linear-gradient(to bottom, rgba(241,245,249,0.5) 0%, rgba(241,245,249,0.3) 40%, rgba(241,245,249,0.6) 100%)',
        }}
      />

      {/* App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/repo/:id" element={<RepoPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="w-full py-6 mt-12 text-center text-sm font-medium" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-primary)', background: 'var(--nav-bg)', backdropFilter: 'blur(12px)' }}>
          <p>Made with ❤️ by Yoga</p>
        </footer>
      </div>
    </div>
  );
}
