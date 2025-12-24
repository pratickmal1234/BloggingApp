import express from "express"
import { verifyUser } from "../middleware/hasToken.js"
import { createPost, getAll } from "../ccontroller/bloggingController.js"
import { upload } from "../ccontroller/multarControrller.js"
const blogRout = express.Router()

blogRout.post("/post", verifyUser, upload.single("photo"), createPost)
blogRout.get("/getall", getAll)
// router.get("/dashboard", verifyUser, async (req, res) => {
//     const user = await userSchema.findById(req.userId);
//     res.json({ message: `Welcome ${user.name}`, user });
// });


export default blogRout