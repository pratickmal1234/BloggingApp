import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Blogging App
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              A simple place to share ideas, stories and connect with readers
              around the world.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/dashboard/post" className="hover:text-white">Create Post</Link></li>
              <li><Link to="/dashboard/postdata" className="hover:text-white">All Posts</Link></li>
              <li><Link to="/dashboard/about" className="hover:text-white">About</Link></li>
              <li><Link to="/dashboard/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Connect
            </h3>
            <div className="flex gap-4 text-xl">
              <span className="hover:text-white cursor-pointer">🌐</span>
              <span className="hover:text-white cursor-pointer">📘</span>
              <span className="hover:text-white cursor-pointer">📸</span>
              <span className="hover:text-white cursor-pointer">🐦</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 text-center text-sm text-gray-400 py-4 px-4">
        © {new Date().getFullYear()} Blogging App · Privacy · Terms · Help
      </div>
    </footer>
  );
}
