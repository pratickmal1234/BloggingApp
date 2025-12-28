import { useState, useEffect } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full w-64 bg-gray-900 text-white flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
          <img
            src="https://tailwindflex.com/images/logo.svg"
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">Admin Pro</span>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2 space-y-2">
          {["Post", "Show All Post", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-2.5 rounded-lg text-sm font-medium
              text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
              alt="Profile"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400">View profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile only) */}
        <header className="md:hidden bg-white shadow px-4 py-3 flex items-center">
          <button onClick={() => setOpen(true)}>
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="hidden md:block text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>

          <div className="mt-4 p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              Welcome {user?.name || "User"} 👋
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
