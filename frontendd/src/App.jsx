import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";

import { Post } from "./pages/Navbar/Post.jsx";
import Postdata from "./pages/Navbar/Postdata.jsx";
import  MyProfile  from "./pages/MyProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Navbar/Dashbord.jsx";
import  Home  from "./pages/Home.jsx";
import { Logout } from "./pages/Logout.jsx";
import EditPost from "./pages/EditPost.jsx";
import DeletePost from "./pages/DeletePost.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> 
          <Route path="post" element={<Post />} />
          <Route path="postdata" element={<Postdata />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="logout" element={<Logout />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="/dashboard/edit-post/:id" element={<EditPost />} />
          <Route path="/dashboard/delete-post/:id" element={<DeletePost />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
