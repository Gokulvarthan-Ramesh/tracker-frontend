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
  { name: 'Study',     path: '/study',     icon: LuBookOpen },
  { name: 'Workout',   path: '/workout',    icon: LuDumbbell },
  { name: 'Meals',     path: '/meals',      icon: LuUtensilsCrossed },
  { name: 'Weight',    path: '/weight',     icon: LuScale },
];

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMobile = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-gray-950 text-gray-100">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 260 : 78,
          transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
        }}
        className={`
          relative z-40 h-full
          bg-gradient-to-b from-gray-900/98 via-gray-900/95 to-gray-950/98
          backdrop-blur-xl border-r border-gray-800/40
          flex flex-col overflow-hidden
          shadow-2xl shadow-black/30
          ${mobileMenuOpen
            ? 'fixed inset-y-0 left-0 translate-x-0 w-72'
            : 'fixed -translate-x-full'}
          md:static md:translate-x-0 md:shadow-none
        `}
      >
        {/* Logo + collapse toggle */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800/50">
          <Link to="/" className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-pink-900/50 flex-shrink-0">
              <span className="text-white font-bold text-2xl tracking-tight">G</span>
            </div>

            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.24 }}
                  className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-pink-200/80 bg-clip-text text-transparent"
                >
                  GVTracker
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/5 text-gray-400 hover:text-gray-100 transition-colors flex-shrink-0"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? (
              <LuChevronLeft className="w-5 h-5" />
            ) : (
              <LuChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[0.94rem] font-medium
                  transition-all duration-250 ease-out
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-pink-600/20 via-pink-600/10 to-transparent text-pink-300 border-l-4 border-pink-500/80 shadow-md shadow-pink-900/20 scale-[1.015]'
                    : 'text-gray-300 hover:bg-white/6 hover:text-gray-100 hover:shadow-sm hover:scale-[1.01]'
                  }
                `}
              >
                <Icon
                  className={`
                    w-5.5 h-5.5 flex-shrink-0 transition-colors duration-200
                    ${isActive(item.path) ? 'text-pink-400' : 'text-gray-400 group-hover:text-gray-200'}
                  `}
                />

                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!sidebarOpen && (
                  <div
                    className="
                      absolute left-full ml-3 px-4 py-2.5
                      bg-gray-900/95 backdrop-blur-md border border-gray-700/60
                      rounded-xl text-sm font-medium text-gray-100
                      opacity-0 group-hover:opacity-100 pointer-events-none
                      transition-all duration-200 shadow-2xl shadow-black/60
                      whitespace-nowrap max-w-[220px] overflow-hidden text-ellipsis
                      z-50
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
        <div className="px-3 pb-5 pt-2 border-t border-gray-800/50">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="
              w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl
              text-red-400/90 hover:bg-red-950/40 hover:text-red-300
              transition-all duration-200 font-medium
            "
          >
            <LuLogOut className="w-5.5 h-5.5 flex-shrink-0" />

            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="
          bg-gray-900/85 backdrop-blur-xl border-b border-gray-800/50
          px-5 sm:px-7 lg:px-9 py-4 flex items-center justify-between
          shrink-0 relative z-20
        ">
          <div className="flex items-center gap-5">
            <button
              className="md:hidden p-2.5 -ml-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
              onClick={toggleMobile}
              aria-label="Toggle menu"
            >
              <LuMenu className="w-6.5 h-6.5" />
            </button>

            <h1 className="
              text-xl sm:text-2xl font-bold tracking-tight
              bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent
            ">
              {navItems.find((i) => i.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline text-gray-300/90 text-sm font-medium">
              Gokulvarthan
            </span>
            <div className="
              w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden
              ring-2 ring-pink-500/40 ring-offset-2 ring-offset-gray-950
              shadow-lg shadow-pink-900/20 transition-all hover:scale-105 hover:ring-pink-500/60
            ">
              <img
                src="https://i.pravatar.cc/128?u=gokulvarthan"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="
          flex-1 overflow-y-auto overflow-x-hidden
          bg-gradient-to-br from-gray-950 via-gray-950/98 to-gray-900/90
        ">
          <div className="
            mx-auto w-full
            px-5
            py-6 sm:py-8 lg:py-10
          ">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent mb-6 lg:mb-8" />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;