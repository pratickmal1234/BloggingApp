import axios from "axios";
import { useState } from "react";

export function Post() {
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState(null);

    const handledata = async (e) => {
        e.preventDefault();
        if(!photo){
            alert("please select image");
            return;
        }

        const formData = new FormData();
        formData.append("contain", content);
        formData.append("photo", photo);

        try {
            const res = await axios.post(
                "http://localhost:8003/blog/post",formData,
                {
                    withCredentials: true,
                    // headers: {
                    //     "Content-Type": "multipart/form-data",
                    // },
                }
            );

            alert(res.data.message);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="post">
            <form onSubmit={handledata}>
                <div>
                    <strong>Content</strong>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <strong>Photo</strong>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}



/*import axios from "axios";
import { useState } from "react";

export function Post() {

    // const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [photo, setPhoto] = useState("")

    const handledata = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8003/blog/post", { content, photo }, {
                headers: { "Content-type": "application/json" },
            });
            // const data=await response.jsno();

            if (response.status === 201) {

                alert(response.data.message);
                // navigate("/dashboard");

            }

        } catch (error) {
            alert(
                error.response?.data?.message || error.message
            );
        }
    }
    return (
        <>
            <div className="post">
                <form onSubmit={handledata}>
                    {/* <div className="input"><strong>Title</strong> <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} required placeholder="Enter title" /></div> }
                    <div className="input"><strong>Content</strong> <input type="text" value={content} onChange={(e) => { setContent(e.target.value) }} required placeholder="Enter content" /></div>
                    <div className="input"><strong>Photo</strong> <input type="file" value={photo} onChange={(e) => { setPhoto(e.target.value) }} required placeholder="Enter photo" /></div>
                    <div className="input"><button type="submit">Submit</button></div>
                </form >
            </div >

        </>
      )
    }*/
