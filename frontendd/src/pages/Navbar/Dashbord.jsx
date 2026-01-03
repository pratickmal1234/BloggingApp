import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // 🔥 LOAD USER FROM localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // 🔥 PROFILE UPDATE হলে sidebar auto refresh
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-40 h-full w-64 bg-gray-900 text-white flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* LOGO */}
        <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
          <img
            src="https://tailwindflex.com/images/logo.svg"
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold">Blogging App</span>
        </div>

        {/* NAV */}
        <nav className="mt-6 px-2 space-y-2">
          <Link to="" className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700 rounded-lg">
            🏠 Home
          </Link>
          <Link to="post" className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700 rounded-lg">
            ➕ Post
          </Link>
          <Link to="postdata" className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700 rounded-lg">
            📄 Show All Post
          </Link>
          <Link to="about" className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700 rounded-lg">
            ℹ️ About
          </Link>
          <Link to="contact" className="block px-4 py-2.5 text-gray-300 hover:bg-gray-700 rounded-lg">
            📞 Contact
          </Link>
        </nav>

        {/* 🔥 USER PROFILE (FIXED) */}
        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-800">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={
                user?.profileImage
                  ? `https://bloggingapp-2.onrender.com${user.profileImage}`
                  : "/avatar.png"
              }
              alt="Profile"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.name || "User"}
              </p>
              <Link to="profile" className="text-xs text-gray-400 hover:underline">
                View profile
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
