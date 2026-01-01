import multer from "multer";
import path from "path"

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination: "upload",
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
//     }
// })

// export const upload = multer({ storage: storage })




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../upload")); 
    // 🔥 same folder যেটা static serve হচ্ছে
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage });
