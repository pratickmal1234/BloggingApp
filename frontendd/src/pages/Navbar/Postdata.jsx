import axios from "axios";
import { useEffect, useState } from "react";

// 🕒 time ago helper
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count > 0) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

export default function Postdata() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  // 🔑 logged in user
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  // 🔄 fetch posts
  const fetchPosts = async () => {
    const res = await axios.get(
      "http://localhost:8003/blog/getAll",
      { withCredentials: true }
    );
    setPosts(res.data.allPost || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔐 owner check
  const isOwner = (postUserId) => {
    return loggedUser?._id === postUserId;
  };

  // 🗑 delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    await axios.delete(
      `http://localhost:8003/blog/delete/${id}`,
      { withCredentials: true }
    );

    setPosts(posts.filter((p) => p._id !== id));
  };

  // ✏️ save edit
  const handleEditSave = async () => {
    await axios.put(
      `http://localhost:8003/blog/update/${editPost._id}`,
      {
        title: editTitle,
        contain: editText,
      },
      { withCredentials: true }
    );

    setPosts((prev) =>
      prev.map((p) =>
        p._id === editPost._id
          ? { ...p, title: editTitle, contain: editText }
          : p
      )
    );

    setEditPost(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Posts 📝</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {post.photo && (
              <img
                src={post.photo}
                alt="post"
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              {/* 🔹 TITLE */}
              <h2 className="text-lg font-bold mb-1">
                {post.title}
              </h2>

              {/* 🔹 CONTENT */}
              <p className="text-gray-700 text-sm mb-2">
                {post.contain}
              </p>

              <p className="text-xs text-gray-400 mb-3">
                {timeAgo(post.createdAt)}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span>❤️ {post.likes || 0}</span>

                {/* 🔐 ONLY OWNER */}
                {isOwner(post.userId) && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditPost(post);
                        setEditTitle(post.title);
                        setEditText(post.contain);
                      }}
                      className="text-blue-600"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✏️ Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>

            {/* Title */}
            <input
              type="text"
              className="w-full border rounded-lg p-3 mb-3"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Post title"
            />

            {/* Content */}
            <textarea
              className="w-full border rounded-lg p-3"
              rows="4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditPost(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
