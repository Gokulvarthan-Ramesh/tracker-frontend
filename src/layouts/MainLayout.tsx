// src/layouts/MainLayout.tsx
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  LuLayoutDashboard,
  LuBookOpen,
  LuDumbbell,
  LuUtensilsCrossed,
  LuScale,
  LuLogOut,
  LuMenu,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LuLayoutDashboard },
  { name: 'Study', path: '/study', icon: LuBookOpen },
  { name: 'Workout', path: '/workout', icon: LuDumbbell },
  { name: 'Meals', path: '/meals', icon: LuUtensilsCrossed },
  { name: 'Weight', path: '/weight', icon: LuScale },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-950 to-slate-950 text-gray-100">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
      <motion.aside
        animate={{
          width: sidebarOpen ? 280 : 80,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`
          group/sidebar
          fixed md:static inset-y-0 left-0 z-50
          flex flex-col
          bg-gradient-to-b from-gray-900/80 to-gray-950/90
          backdrop-blur-2xl border-r border-white/5
          shadow-2xl shadow-black/40
          transition-all duration-400
          ${mobileMenuOpen ? 'translate-x-0 w-80' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex-center shadow-lg shadow-violet-900/40 flex-shrink-0 ring-1 ring-violet-500/30">
              <span className="text-white font-black text-2.5xl tracking-tighter">G</span>
            </div>

            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent"
                >
                  GVTracker
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/8 text-gray-400 hover:text-white transition-colors"
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? <LuChevronLeft size={20} /> : <LuChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium
                  transition-all duration-300 ease-out
                  ${
                    active
                      ? 'bg-gradient-to-r from-violet-600/20 via-fuchsia-600/15 to-transparent text-white border-l-4 border-violet-500/80 shadow-lg shadow-violet-900/20 scale-[1.02]'
                      : 'text-gray-300 hover:bg-white/6 hover:text-white hover:shadow-sm'
                  }
                `}
              >
                <Icon
                  size={22}
                  className={`
                    flex-shrink-0 transition-colors
                    ${active ? 'text-violet-400' : 'text-gray-400 group-hover:text-gray-200'}
                  `}
                />

                <AnimatePresence mode="wait">
                  {sidebarOpen && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.22 }}
                      className="flex-1"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip when collapsed */}
                {!sidebarOpen && (
                  <div
                    className="
                      pointer-events-none absolute left-full ml-4 px-4 py-2.5
                      bg-gray-900/95 backdrop-blur-lg border border-white/8 rounded-xl
                      text-sm font-medium text-white
                      opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0
                      transition-all duration-250 shadow-xl shadow-black/60
                      whitespace-nowrap z-50
                    "
                  >
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="
              w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
              text-red-400/90 hover:bg-red-950/30 hover:text-red-300
              transition-all duration-300 font-medium
            "
          >
            <LuLogOut size={22} className="flex-shrink-0" />

            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* ─── MAIN AREA ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="
          bg-gray-900/70 backdrop-blur-xl border-b border-white/5
          px-5 sm:px-7 lg:px-10 py-4 flex items-center justify-between
          shadow-sm shrink-0 z-20
        ">
          <div className="flex items-center gap-5">
            <button
              className="md:hidden p-2.5 -ml-2.5 rounded-xl hover:bg-white/8 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <LuMenu size={26} />
            </button>

            <h1 className="
              text-xl sm:text-2xl font-extrabold tracking-tight
              bg-gradient-to-r from-white via-gray-200 to-violet-200/90
              bg-clip-text text-transparent
            ">
              {navItems.find((i) => i.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-5 sm:gap-7">
            <span className="hidden md:block text-gray-300/90 text-sm font-medium">
              Gokulvarthan
            </span>

            <div className="
              w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden
              ring-2 ring-violet-500/40 ring-offset-2 ring-offset-gray-950
              shadow-lg shadow-violet-900/30 hover:scale-105 hover:ring-violet-500/70
              transition-all duration-300
            ">
              <img
                src="https://i.pravatar.cc/128?u=gokulvarthan"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="
          flex-1 overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-950 to-slate-950/90
          scrollbar-thin scrollbar-thumb-gray-700/40 scrollbar-track-transparent
        ">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-4 lg:px-4 py-4 lg:py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}