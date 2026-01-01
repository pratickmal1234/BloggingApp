import React, { useState } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

const EditProfile = ({ isOpen, onClose, profile, refreshProfile }) => {
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    bio: profile.bio || "",
    dob: profile.dob || "",
    gender: profile.gender || "",
  });

  const [showEmoji, setShowEmoji] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:8003/user/profile",
        formData,
        { withCredentials: true }
      );

      refreshProfile();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // ✅ Emoji click handler
  const handleEmojiClick = (emojiData) => {
    setFormData({
      ...formData,
      bio: formData.bio + emojiData.emoji,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-xl relative">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />

          {/* ✅ BIO WITH EMOJI */}
          <div className="relative">
            <textarea
              className="w-full border p-2 rounded pr-10"
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />

            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="absolute right-2 bottom-2 text-xl"
            >
              😊
            </button>

            {/* Emoji Picker */}
            {showEmoji && (
              <div className="absolute bottom-12 right-0 z-50">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  height={350}
                />
              </div>
            )}
          </div>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={formData.dob}
            onChange={(e) =>
              setFormData({ ...formData, dob: e.target.value })
            }
          />

          <select
            className="w-full border p-2 rounded"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* ✅ BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
