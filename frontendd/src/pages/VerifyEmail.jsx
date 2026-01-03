import { useState } from "react";
import axios from "axios";

export default function VerifyEmail() {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const token = new URLSearchParams(window.location.search).get("token");
    const handleVerify = async () => {
        if (!token) {
            setMsg("Invalid verification link");
            return;
        }
        try {
            setLoading(true);

            const res = await axios.post( "https://bloggingapp-2.onrender.com/user/tokenVerify",{ token } 
            );

            setMsg(res.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Email Verification</h2>

            <button onClick={handleVerify} disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
            </button>

            {msg && <p>{msg}</p>}
        </div>
    );
}




