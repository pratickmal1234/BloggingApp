import axios from "axios";
import { useEffect, useState } from "react";

// 🕒 time ago
const timeAgo = (date) => {
  if (!date) return "Just now";

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
    if (count > 0) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

export default function Postdata() {
  const [posts, setPosts] = useState({});
  const [commentText, setCommentText] = useState({});
  const [openComments, setOpenComments] = useState({}); // 🔥 NEW

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔄 FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8003/blog/getall",
        { withCredentials: true }
      );

      const map = {};
      res.data.allPost.forEach((p) => (map[p._id] = p));
      setPosts(map);
    } catch (err) {
      console.error("FETCH POST ERROR 👉", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

const handleLike = async (id) => {
  try {
    const res = await axios.put(
      `http://localhost:8003/blog/like/${id}`,
      {},
      { withCredentials: true }
    );

    setPosts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        likes: res.data.likes,
      },
    }));
  } catch (err) {
    console.error(err);
  }
};


  // 💬 COMMENT
  const handleComment = async (id) => {
    if (!commentText[id]) return;

    try {
      const res = await axios.post(
        `http://localhost:8003/blog/comment/${id}`,
        { text: commentText[id] },
        { withCredentials: true }
      );

      setPosts((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          comments: res.data.comments,
        },
      }));

      setCommentText((prev) => ({ ...prev, [id]: "" }));
      setOpenComments((prev) => ({ ...prev, [id]: true }));
    } catch (err) {
      console.error("COMMENT ERROR 👉", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(posts).map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
          >
            {post.photo && (
              <img
                src={post.photo}
                alt="post"
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-4 flex-1 flex flex-col">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-700 mt-1">{post.contain}</p>

              <p className="text-xs text-gray-400 mt-2">
                {timeAgo(post.createdAt)}
              </p>

              {/* LIKE + COMMENT BAR */}
              <div className="flex justify-between border-t mt-3 pt-2 text-sm">
                <button
                  onClick={() => handleLike(post._id)}
                  className="hover:text-red-500"
                >
                  ❤️ Like ({post.likes.length})
                </button>

                <button
                  onClick={() =>
                    setOpenComments((prev) => ({
                      ...prev,
                      [post._id]: !prev[post._id],
                    }))
                  }
                  className="hover:text-blue-600"
                >
                  💬 {post.comments.length} Comments
                </button>
              </div>

              {/* COMMENT INPUT */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded text-sm"
                >
                  Comment
                </button>
              </div>

              {/* COMMENTS (FACEBOOK STYLE) */}
              {openComments[post._id] && (
                <div className="mt-3 max-h-40 overflow-y-auto space-y-2 border-t pt-2">
                  {post.comments.map((c, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 px-3 py-2 rounded text-sm"
                    >
                      {c.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
