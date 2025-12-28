import { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'




export function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const da = {
        name: name,
        email: email,
        password: password
      }
      const response = await axios.post("http://localhost:8003/user/register", da, {
        headers: { "Content-type": "application/json" },
      });
      //  const data=await response.jsno();

      if (response.status === 201) {

        alert(response.data.message);

        // navigate("/home");

      }

    } catch (error) {
      alert(
        error.response?.data?.message || error.message
      );
    }
  }
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={name} onChange={(e) => { setName(e.target.value) }}
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              value={email} onChange={(e) => { setEmail(e.target.value) }}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password} onChange={(e) => { setPassword(e.target.value) }}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required=""
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300 "
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>


      {/* <div className="register">
        <h1>Register here</h1>
        <form onSubmit={handlesubmit}>
          <div className="input"><strong>Name</strong> <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required placeholder='Enter name here' /></div>
          <div className="input"><strong>Email</strong> <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required placeholder='Enter email here' /></div>
          <div className="input"><strong>Password</strong> <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required placeholder='Enter password here' /></div>
          <div className="input"><button type='submit'>Submit</button></div>
          <div><p>Login here <Link to="/login">Login</Link></p></div>


        </form>
      </div> */}
    </>
  )

}