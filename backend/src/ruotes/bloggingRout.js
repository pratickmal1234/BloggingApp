import express from "express"
import { verifyUser } from "../middleware/hasToken.js"
import { addComment, createPost, DeletePost, editPost, getAll, getUser, likePost,  } from "../ccontroller/bloggingController.js"
import { upload } from "../ccontroller/multarControrller.js"
import { blogValidateSchema, commentValidateSchema, validateBlog } from "../Validation/BlogValidation.js"
const blogRout = express.Router()

blogRout.post("/post", verifyUser, upload.single("photo"),validateBlog(blogValidateSchema), createPost)
blogRout.get("/getall", getAll)
blogRout.get("/getUser",verifyUser, getUser)
blogRout.put("/edit/:id",verifyUser, editPost)
blogRout.delete("/delete/:id",verifyUser, DeletePost)
blogRout.put("/like/:id", verifyUser, likePost)
blogRout.post("/comment/:id", verifyUser,validateBlog(commentValidateSchema), addComment)


export default blogRout