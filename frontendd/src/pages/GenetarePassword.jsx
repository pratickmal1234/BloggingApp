import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'



export function GenetarePassword() {
    const [newpass, setNewpass] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8001/login", { password }, {
                headers: { "Content-type": "application/json" },
            });
            // const data=await response.jsno();

            if (response.status === 201) {

                alert(response.data.message);
                navigate("/generatepass");
            }

        } catch (error) {
            alert(
                error.response?.data?.message || error.message
            );
        }

    }
    return (
        <>
            <div className="Genatrate Password">
                <h1>Genatrate Password</h1>
                <form onSubmit={handlelogin}>
                    <div className="input"><strong>Password</strong> <input type="password" value={newpass} onChange={(e) => { setNewpass(e.target.value) }} required placeholder="Enter password" /></div>
                    <div className="input"><strong>Conform Password</strong> <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required placeholder="Enter password" /></div>
                    <div className="input"><button type="submit">ok</button></div>

                </form>
            </div>
        </>
    )
}