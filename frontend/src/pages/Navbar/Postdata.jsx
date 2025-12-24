import axios from "axios";
import { useEffect, useState } from "react";

function Postdata() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8003/blog/getAll",
                    { withCredentials: true }
                );

                setPosts(res.data.allPost); // 👈 IMPORTANT
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>All Posts</h2>

            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
                        <p>{post.contain}</p>

                        <img
                            src={post.photo}
                            alt="post"
                            width="200"
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export default Postdata;