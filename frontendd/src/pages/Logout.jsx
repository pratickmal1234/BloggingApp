import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmLogout = async () => {
    setLoading(true);
    setError("");

    try {
      // 🔥 Backend call → cookie destroy
      await axios.delete(
        "https://bloggingapp-2.onrender.com/user/logout",
        { withCredentials: true, }
      );

      // 🔥 localStorage clear BUT token বাদে
      const token = localStorage.getItem("token"); // token save
      localStorage.clear();                         // সব clear
      if (token) localStorage.setItem("token", token); // token ফেরত বসানো

      // চাইলে sessionStorage পুরো clear
      sessionStorage.clear();

      navigate("/login", { replace: true }); // বা যেকোন page
    } catch (err) {
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-4">🚪</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Confirm Logout
        </h1>

        <p className="text-gray-600 mt-2">
          This will end your current session.
        </p>

        {error && (
          <p className="mt-4 text-red-500 text-sm font-semibold">
            {error}
          </p>
        )}

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-2 rounded-lg border border-gray-300
            hover:bg-gray-100 transition font-semibold"
          >
            ❌ Cancel
          </button>

          <button
            onClick={handleConfirmLogout}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-red-500 text-white
            hover:bg-red-600 transition font-semibold"
          >
            {loading ? "Logging out..." : "✅ Yes, Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
