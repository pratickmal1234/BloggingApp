import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔐 AUTH INFO
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // 🔑 LOGIN STATUS
    token: {
      type: String,
      default: null,
    },
    isLoged: {
      type: Boolean,
      default: false,
    },
    isVarifyed: {
      type: Boolean,
      default: false,
    },

    // 🧑 PROFILE INFO (NEW)
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    dob: {
      type: String, // date চাইলে Date করতে পারো
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },

    // 🖼 IMAGES
    profileImage: {
      type: String, // base64 / cloud url
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
