import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "https://bloggingapp-2.onrender.com/user/profile",
        { withCredentials: true }
      );
      setProfile(res.data.user);
       localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= IMAGE UPLOAD =================
  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(key, file);

    try {
      await axios.put(
        "https://bloggingapp-2.onrender.com/user/profile",
        formData,
        { withCredentials: true }
      );
      fetchProfile();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    navigate("/dashboard/logout");
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <section className="bg-[#f0f2f5] min-h-screen">
      {/* ================= COVER ================= */}
      {/* ================= COVER ================= */}
      <div
        className="relative h-[320px] bg-gray-300 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: profile.coverImage
            ? `url(https://bloggingapp-2.onrender.com${profile.coverImage})`
            : "none",
        }}
      >
        {/* DARK OVERLAY (Facebook-style) */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* EDIT COVER BUTTON */}
        <label className="absolute right-6 bottom-6 z-10 bg-white px-4 py-2 rounded-lg shadow cursor-pointer text-sm font-semibold flex items-center gap-2">
          ✏️ Edit Cover
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e, "coverImage")}
          />
        </label>
      </div>


      {/* ================= PROFILE CARD ================= */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-white rounded-xl shadow -mt-24 p-6 flex flex-col md:flex-row gap-6 items-center md:items-end">

          {/* PROFILE IMAGE */}
          <div className="relative">
            <img
              src={
                profile.profileImage
                  ? `https://bloggingapp-2.onrender.com${profile.profileImage}`
                  : "/avatar.png"
              }
              className="w-44 h-44 rounded-full border-4 border-white object-cover"
            />
            <label className="absolute bottom-2 right-2 bg-gray-100 p-2 rounded-full shadow cursor-pointer">
              📷
              <input
                type="file"
                hidden
                onChange={(e) => handleImageChange(e, "profileImage")}
              />
            </label>
          </div>

          {/* NAME & BIO */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-600 mt-1">{profile.bio || "No bio yet"}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => setOpenEdit(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="bg-white rounded-xl shadow mt-6 p-6 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">About</h2>

          <div className="space-y-2 text-gray-700">
            <p>🎂 <span className="font-semibold">DOB:</span> {profile.dob || "Not set"}</p>
            <p>🚻 <span className="font-semibold">Gender:</span> {profile.gender || "Not set"}</p>
            <p>📧 <span className="font-semibold">Email:</span> {profile.email}</p>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <EditProfile
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        profile={profile}
        refreshProfile={fetchProfile}
      />
    </section>
  );
};

export default MyProfile;
