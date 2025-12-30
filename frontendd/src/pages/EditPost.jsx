import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [contain, setContain] = useState("");
  const [loading, setLoading] = useState(false);

  // load old data
  useEffect(() => {
    const loadPost = async () => {
      const res = await axios.get(
        `http://localhost:8003/blog/getUser`,
        { withCredentials: true }
      );

      const post = res.data.allPost.find((p) => p._id === id);
      if (post) {
        setTitle(post.title);
        setContain(post.contain);
      }
    };

    loadPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8003/blog/edit/${id}`,
        { title, contain },
        { withCredentials: true }
      );

      navigate("/dashboard/post");
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded"
          rows="4"
          value={contain}
          onChange={(e) => setContain(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
