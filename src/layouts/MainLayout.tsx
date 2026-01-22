import{ useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Study", path: "/study" },
  { name: "Workout", path: "/workout" },
  { name: "Meals", path: "/meals" },
  { name: "Weight", path: "/weight" },
];

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md w-64 flex-shrink-0 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:translate-x-0 md:block`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Tracker</h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block p-2 rounded-md hover:bg-gray-200 transition ${location.pathname === item.path
                    ? "bg-gray-200 font-semibold"
                    : "text-gray-700"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-2">
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="text-lg font-medium text-gray-800">
            {navItems.find((i) => i.path === location.pathname)?.name || "Tracker"}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, User</span>
            <img
              src="https://i.pravatar.cc/32"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
