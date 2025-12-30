export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-blue-100">
          Learn more about who we are, what we do, and why we do it.
        </p>
      </div>

      {/* Content */}
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">🚀 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to create a simple, powerful and user-friendly
            platform where users can share posts, express thoughts, and
            connect with others. We focus on clean design, fast performance,
            and a great user experience.
          </p>
        </div>

        {/* Right */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">💡 What We Offer</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✅ Easy post creation with images</li>
            <li>✅ Modern dashboard & profile system</li>
            <li>✅ Secure authentication</li>
            <li>✅ Fast & responsive UI</li>
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          👨‍💻 Meet the Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
              alt="Founder"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-gray-500">Founder & Developer</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
              alt="Designer"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Jane Smith</h3>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
              alt="Manager"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Alex Brown</h3>
            <p className="text-sm text-gray-500">Project Manager</p>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-14 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Your App Name. All rights reserved.
        </p>
      </div>
    </div>
  );
}
