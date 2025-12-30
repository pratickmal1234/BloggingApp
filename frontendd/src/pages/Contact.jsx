import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! 💌");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mt-3">
          We'd love to hear from you. Please fill out the form below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-8">
        {/* Left Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch 📞</h2>
          <p className="text-gray-600 mb-6">
            Have questions or feedback? Reach out and we’ll respond as soon as possible.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 Address: Dhaka, Bangladesh</p>
            <p>📧 Email: support@example.com</p>
            <p>📱 Phone: +880 1234 567 890</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Write your message..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-900 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
