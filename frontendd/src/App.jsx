import { BrowserRouter, Route, Routes } from 'react-router-dom'


import { VerifyOtp } from './pages/VerifyOtp.jsx'
import { GenetarePassword } from './pages/GenetarePassword.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import  ForgetPassword  from './pages/ForgetPassword.jsx'
import VerifyEmail  from './pages/VerifyEmail.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import  Home  from './pages/Navbar/Home.jsx'
import { Post } from './pages/Navbar/Post.jsx'
import Postdata  from './pages/Navbar/Postdata.jsx'
import { Navbar } from './pages/Navbar/Navbar.jsx'
import { MyProfile } from './pages/MyProfile.jsx'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route path="/veryfiotp" element={<VerifyOtp />} />
      <Route path="/generatepass" element={<GenetarePassword />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/postdata" element={<Postdata />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/profile" element={<MyProfile />} />


    </Routes>
    </BrowserRouter>
    </>
  )
}