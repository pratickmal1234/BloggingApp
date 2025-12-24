import bloggingSchema from "../model/bloggingSchema.js"




export const createPost = async (req, res) => {
    try {
        const { contain } = req.body;
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

/*export const createPost=async(req,res)=>{
    try {
        const {contain}=req.body
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            })
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/svg"]
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type",
            })
        }

        const imageUrl = `http://localhost:8003/upload/${req.file.filename}`
        const post=await bloggingSchema.create({contain,photo:imageUrl,userId:req.userId})
           return res.status(201).json({
            success: true,
            message: "contain post successfuly",
            post
        })
        
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}*/

export const getAll = async (req, res) => {
    try {
        const allPost = await bloggingSchema.find()
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
        const { contain } = req.body

        const editPost = await bloggingSchema.findByIdAndUpdate({ _id: id, userId: req.userId })
        editPost.contain = contain
        await editPost.save()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}