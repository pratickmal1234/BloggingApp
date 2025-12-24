import { useState } from "react"
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom'

export function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8003/user/login", { email, password }, {
        withCredentials:true,
        headers: { "Content-type": "application/json" },
      });

      if (response.status === 200) {

        alert(response.data.message);
        // navigate("/dashboard");
        navigate("/navbar")

      }

    } catch (error) {
      alert(
        error.response?.data?.message || error.message
      );
    }

  }
  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handlelogin}>
          <div className="input"><strong>Email</strong> <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required placeholder="Enter email" /></div>
          <div className="input"><strong>Password</strong> <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required placeholder="Enter password" /></div>
          <div className="input"><button type="submit">Submit</button></div>
          <div><p> <Link to="/forget">forget password</Link></p></div>
          <div><p>Create an account <Link to="/">Register</Link></p></div>
        </form>
      </div>
    </>
  )
}