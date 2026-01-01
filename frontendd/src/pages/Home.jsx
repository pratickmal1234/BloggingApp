import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="space-y-10">
      {/* 🔥 Hero / Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome back, {user?.name || "User"} ✍️
        </h1>
        <p className="mt-3 text-blue-100 max-w-2xl">
          Share your thoughts with the world. Create posts, engage with readers,
          and grow your blogging journey from one place.
        </p>

        {/* 🔗 Action Buttons (UNCHANGED LOGIC) */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/dashboard/post")}
            className="px-6 py-2.5 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            ➕ Create Post
          </button>

          <button
            onClick={() => navigate("/dashboard/profile")}
            className="px-6 py-2.5 rounded-lg border border-white text-white hover:bg-white hover:text-blue-600 transition"
          >
            👤 View Profile
          </button>
        </div>
      </div>

      {/* 📊 Blogging Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Posts" value="12" icon="📝" />
        <StatCard title="Total Likes" value="340" icon="❤️" />
        <StatCard title="Comments" value="89" icon="💬" />
        <StatCard title="Readers" value="1.2K" icon="👀" />
      </div>

      {/* 📰 Blog Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About Blogging */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            🧠 About Your Blog
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This platform helps you publish blogs, upload images, receive likes
            and comments, and build your online presence. Everything is designed
            to keep blogging simple and enjoyable.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔔 Recent Activity
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>✍️ You published a new blog post</li>
            <li>💬 Someone commented on your post</li>
            <li>❤️ Your post received new likes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Stat Card */
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
