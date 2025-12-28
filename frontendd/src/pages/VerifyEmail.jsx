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

            const res = await axios.post( "http://localhost:8003/user/tokenVerify",{ token } 
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







/*import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "./api.jsx";
// import api from "../services/api";

export  function VerifyEmail() {
    const [params] = useSearchParams();
    const token = params.get("token");

    useEffect(() => {
        const verifyemail = async () => {
            try {
                if (!token) {
                    alert("Invalid verification link");
                    return;
                }

                const res = await api.get(`/user/verify-email?token=${token}`);
                alert(res.data.message);
            } catch (error) {
                alert(
                    error?.response?.data?.message || "Email verification failed"
                );
            }
        };

        verifyemail();
    }, [token]);

    return <h2>Verifying your email...</h2>;
}*/





/*import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "./api.jsx";
// import api from "../services/api.jsx";

export function VerifyEmail() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get("token");

    useEffect(() => {
        if (token) {
            api.get(`/user/verifyemail?token=${token}`)
                .then((res) => {
                    alert(res.data.message);
                    navigate("/login");
                })
                .catch((err) => {
                    alert(err.response?.data?.message || "Verification failed");
                });
        }
    }, [token]);

    return <h3>Verifying your email...</h3>;
}*/