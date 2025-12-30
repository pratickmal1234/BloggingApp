import express from "express"
import { verifyUser } from "../middleware/hasToken.js"
import { createPost, DeletePost, editPost, getAll, getUser } from "../ccontroller/bloggingController.js"
import { upload } from "../ccontroller/multarControrller.js"
const blogRout = express.Router()

blogRout.post("/post", verifyUser, upload.single("photo"), createPost)
blogRout.get("/getall", getAll)
blogRout.get("/getUser",verifyUser, getUser)
blogRout.put("/edit/:id",verifyUser, editPost)
blogRout.delete("/delete/:id",verifyUser, DeletePost)



// router.get("/dashboard", verifyUser, async (req, res) => {
//     const user = await userSchema.findById(req.userId);
//     res.json({ message: `Welcome ${user.name}`, user });
// });


export default blogRout