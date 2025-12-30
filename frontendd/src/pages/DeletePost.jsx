import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:8003/blog/delete/${id}`,
        { withCredentials: true }
      );

      alert("Post deleted");
      navigate("/dashboard/post");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-6 rounded-xl shadow text-center w-[350px]">
        <h2 className="text-xl font-bold mb-3">
          Delete this post?
        </h2>

        <p className="text-gray-600 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
