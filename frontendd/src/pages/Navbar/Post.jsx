import axios from "axios";
import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export function Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  // 🔥 toggle comments per post
  const [openComments, setOpenComments] = useState({});

  // ================= FETCH USER POSTS =================
  const fetchMyPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8003/blog/getUser",
        { withCredentials: true }
      );
      setMyPosts(res.data.allPost || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  // ================= CREATE POST =================
  const handledata = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contain", content);
    formData.append("photo", photo);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8003/blog/post",
        formData,
        { withCredentials: true }
      );

      alert(res.data.message);

      setTitle("");
      setContent("");
      setPhoto(null);
      setPreview(null);
      setShowEmoji(false);

      fetchMyPosts();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= IMAGE URL FIX =================
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:8003${path}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">

      {/* ================= CREATE POST ================= */}
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>

        <form onSubmit={handledata} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border rounded-lg p-4 pr-12"
              rows="4"
              required
            />

            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="absolute right-3 top-3 text-xl"
            >
              😊
            </button>

            {showEmoji && (
              <div className="absolute z-50 top-14 right-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              id="photo"
              hidden
              onChange={(e) => {
                setPhoto(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <label
              htmlFor="photo"
              className="cursor-pointer text-blue-600 font-semibold"
            >
              📷 Upload Photo
            </label>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-4 max-h-60 mx-auto rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      {/* ================= MY POSTS (3 PER ROW) ================= */}
      {myPosts.length === 0 && (
        <p className="text-center text-gray-500">No posts yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPosts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow p-4 flex flex-col">
            <h2 className="font-bold text-lg">{post.title}</h2>

            <p className="text-gray-700 mt-2 whitespace-pre-line">
              {post.contain}
            </p>

            {post.photo && (
              <img
                src={getImageUrl(post.photo)}
                alt="post"
                className="mt-3 rounded-lg max-h-64 w-full object-cover"
              />
            )}

            {/* ❤️ 💬 COUNTS */}
            <div className="flex justify-between mt-4 text-sm text-gray-600 border-t pt-2">
              <span>❤️ {post.likes?.length || 0} Likes</span>

              <button
                onClick={() =>
                  setOpenComments((prev) => ({
                    ...prev,
                    [post._id]: !prev[post._id],
                  }))
                }
                className="hover:text-blue-600"
              >
                💬 {post.comments?.length || 0} Comments
              </button>
            </div>

            {/* 🔽 COMMENTS LIST */}
            {openComments[post._id] && (
              <div className="mt-3 space-y-2 border-t pt-2">
                {post.comments.length === 0 ? (
                  <p className="text-sm text-gray-500">No comments yet</p>
                ) : (
                  post.comments.map((c, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 px-3 py-2 rounded text-sm"
                    >
                      {c.text}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-auto pt-4">
              <button
                onClick={() => navigate(`/dashboard/edit-post/${post._id}`)}
                className="px-4 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => navigate(`/dashboard/delete-post/${post._id}`)}
                className="px-4 py-1 rounded bg-red-500 text-white"
              >
                🗑 Delete
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
