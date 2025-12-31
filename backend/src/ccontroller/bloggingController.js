
import bloggingSchema from "../model/bloggingSchema.js"



export const createPost = async (req, res) => {
  try {
    const { title, contain } = req.body;
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type",
      });
    }

    const imageUrl = `http://localhost:8003/upload/${req.file.filename}`;

    const post = await bloggingSchema.create({
      title,
      contain,
      photo: imageUrl,
      userId: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const allPost = await bloggingSchema.find().sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      message: "all post fetch successfuly",
      allPost
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const getUser = async (req, res) => {
  try {
    const allPost = await bloggingSchema.find({ userId: req.userId })
    return res.status(200).json({
      success: true,
      message: "all post fetch successfuly",
      allPost
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const editPost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, contain } = req.body

    const editPost = await bloggingSchema.findByIdAndUpdate({ _id: id, userId: req.userId })
    editPost.contain = contain
    editPost.title = title
    await editPost.save()
    return res.status(200).json({
      success: true,
      message: " post update successfuly",
      editPost
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export const DeletePost = async (req, res) => {
  try {
    const { id } = req.params
    const delpost = await bloggingSchema.findByIdAndDelete({
      _id: id, userId: req.userId
    })
    if (delpost) {
      return res.status(200).json({
        success: true,
        message: " post deleted successfuly",
        delpost
      })
    } else {
      return res.status(400).json({
        success: false,
        message: " post  not  deleted",

      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}




import mongoose from "mongoose";



// ❤️ LIKE / UNLIKE (ANY USER → ANY POST)
export const likePost = async (req, res) => {
  try {
    const post = await bloggingSchema.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.userId.toString();

    const index = post.likes.findIndex(
      (id) => id.toString() === userId
    );

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    res.status(200).json({
      liked: index === -1,
      likes: post.likes,
    });
  } catch (err) {
    console.log("LIKE ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};

// 💬 COMMENT (ANY USER → ANY POST)
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Empty comment" });
    }

    const post = await bloggingSchema.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      userId: req.userId,
      text,
    });

    await post.save();

    res.status(200).json({
      comments: post.comments,
    });
  } catch (err) {
    console.log("COMMENT ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};

















