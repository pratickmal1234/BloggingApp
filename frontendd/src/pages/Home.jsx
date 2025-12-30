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
    <div className="space-y-8">
      {/* 🔥 Welcome Section */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Here’s what’s happening with your account today
          </p>
        </div>

        {/* 🔗 Action Buttons */}
        <div className="mt-4 md:mt-0 flex gap-3">
          <button
            onClick={() => navigate("/dashboard/post")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ➕ Create Post
          </button>

          <button
            onClick={() => navigate("/dashboard/profile")}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            👤 View Profile
          </button>
        </div>
      </div>

      {/* 📊 Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Posts" value="12" icon="📝" />
        <StatCard title="Likes" value="340" icon="❤️" />
        <StatCard title="Comments" value="89" icon="💬" />
        <StatCard title="Followers" value="1.2K" icon="👥" />
      </div>

      {/* 🚀 Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            About This Dashboard
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This dashboard helps you manage your posts, profile and activities
            in one place. You can create posts, view all posts, edit your
            profile and much more with ease.
          </p>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-600">
              ✅ You created a new post
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              ✏️ You updated your profile
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              ❤️ Someone liked your post
            </li>
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
