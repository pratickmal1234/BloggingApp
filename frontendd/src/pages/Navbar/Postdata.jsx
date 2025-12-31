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

// 👍 Facebook style reactions
const reactions = ["👍", "❤️", "😂", "😮", "😢", "😡"];
const emojis = ["😀", "😂", "😍", "😎", "😭", "🔥", "👍", "❤️"];

export default function Postdata() {
  const [posts, setPosts] = useState({});
  const [commentText, setCommentText] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [showReactions, setShowReactions] = useState({});
  const [selectedReaction, setSelectedReaction] = useState({});
  const [showEmoji, setShowEmoji] = useState({});

  // 🔄 FETCH POSTS
  const fetchPosts = async () => {
    const res = await axios.get(
      "http://localhost:8003/blog/getall",
      { withCredentials: true }
    );
    const map = {};
    res.data.allPost.forEach((p) => (map[p._id] = p));
    setPosts(map);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ❤️ LIKE
  const handleLike = async (id) => {
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
  };

  // 💬 COMMENT
  const handleComment = async (id) => {
    if (!commentText[id]) return;

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
    setShowEmoji((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(posts).map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow overflow-hidden">
            {post.photo && (
              <img src={post.photo} className="w-full h-52 object-cover" />
            )}

            <div className="p-4">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-700">{post.contain}</p>
              <p className="text-xs text-gray-400 mt-1">
                {timeAgo(post.createdAt)}
              </p>

              {/* 👍 LIKE BAR */}
              <div className="relative mt-3 flex justify-between border-t pt-2 text-sm">
                <div
                  onMouseEnter={() =>
                    setShowReactions({ ...showReactions, [post._id]: true })
                  }
                  onMouseLeave={() =>
                    setShowReactions({ ...showReactions, [post._id]: false })
                  }
                  className="relative"
                >
                  <button
                    onClick={() => handleLike(post._id)}
                    className="hover:text-blue-600"
                  >
                    {selectedReaction[post._id] || "❤️"} Like ({post.likes.length})
                  </button>

                  {showReactions[post._id] && (
                    <div className="absolute -top-10 left-0 bg-white shadow rounded-full px-2 py-1 flex gap-2">
                      {reactions.map((r) => (
                        <span
                          key={r}
                          onClick={() => {
                            setSelectedReaction({
                              ...selectedReaction,
                              [post._id]: r,
                            });
                            handleLike(post._id);
                          }}
                          className="cursor-pointer text-xl hover:scale-125 transition"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() =>
                    setOpenComments({
                      ...openComments,
                      [post._id]: !openComments[post._id],
                    })
                  }
                >
                  💬 {post.comments.length} Comments
                </button>
              </div>

              {/* 💬 COMMENT INPUT */}
              <div className="mt-3 relative">
                <input
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Write a comment..."
                />

                <button
                  onClick={() =>
                    setShowEmoji({
                      ...showEmoji,
                      [post._id]: !showEmoji[post._id],
                    })
                  }
                  className="absolute right-2 top-2"
                >
                  😀
                </button>

                {showEmoji[post._id] && (
                  <div className="absolute bg-white border rounded p-2 flex gap-2 mt-1 z-10">
                    {emojis.map((e) => (
                      <span
                        key={e}
                        className="cursor-pointer"
                        onClick={() =>
                          setCommentText({
                            ...commentText,
                            [post._id]:
                              (commentText[post._id] || "") + e,
                          })
                        }
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleComment(post._id)}
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
                >
                  Comment
                </button>
              </div>

              {/* COMMENTS */}
              {openComments[post._id] && (
                <div className="mt-3 space-y-2 border-t pt-2">
                  {post.comments.map((c, i) => (
                    <div key={i} className="bg-gray-100 px-3 py-2 rounded text-sm">
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
