
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

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = new mongoose.Types.ObjectId(req.userId);

    const post = await bloggingSchema.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(id => id.equals(userId));

    if (alreadyLiked) {
      await bloggingSchema.updateOne(
        { _id: postId },
        { $pull: { likes: userId } }
      );
    } else {

      await bloggingSchema.updateOne(
        { _id: postId },
        { $addToSet: { likes: userId } }
      );
    }

    const updatedPost = await bloggingSchema.findById(postId);

    res.status(200).json({
      liked: !alreadyLiked,
      likes: updatedPost.likes,
    });

  } catch (err) {
    console.log("LIKE ERROR ", err);
    res.status(500).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Empty comment" });
    }

    const updatedPost = await bloggingSchema.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userId: req.userId,
            text,
          },
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      comments: updatedPost.comments,
    });
  } catch (err) {
    console.log("COMMENT ERROR ", err);
    res.status(500).json({ message: err.message });
  }
};




















