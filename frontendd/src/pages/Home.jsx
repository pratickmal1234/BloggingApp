import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 load logged-in user
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // 🔹 load last 4 posts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://bloggingapp-2.onrender.com/blog/getall");
      if (res.data.success) {
        setPosts(res.data.allPost.slice(0, 4));
      }
    } catch (error) {
      console.log(error);
    }
  };

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

        {/* 🔗 Action Buttons (NO CHANGE) */}
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

      {/* 📰 Latest Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📰 Latest Blog Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={
                    post.photo.startsWith("http")
                      ? post.photo
                      : `https://bloggingapp-2.onrender.com${post.photo}`
                  }
                  alt={post.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {post.contain}
                  </p>

                  <div className="mt-3 text-xs text-gray-500 flex justify-between">
                    <span>❤️ {post.likes.length}</span>
                    <span>💬 {post.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
