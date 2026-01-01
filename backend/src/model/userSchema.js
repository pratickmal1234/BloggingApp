import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      type: String, 
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String, 
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
