export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">About Our Blogging Platform</h1>
        <p className="text-lg text-blue-100">
          A place where ideas turn into stories and voices find their audience.
        </p>
      </div>

      {/* Content */}
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">📝 Our Purpose</h2>
          <p className="text-gray-600 leading-relaxed">
            This blogging platform is built to help users share their thoughts,
            experiences, and creativity with the world. Whether it’s personal
            stories, technical blogs, or daily updates — this platform gives
            you the freedom to express yourself easily and beautifully.
          </p>
        </div>

        {/* Right */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-3">✨ Platform Features</h2>
          <ul className="space-y-3 text-gray-600">
            <li>✅ Create, edit, and delete blog posts</li>
            <li>✅ Upload images for posts and profiles</li>
            <li>✅ Like and comment on posts</li>
            <li>✅ Secure login & profile management</li>
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          👥 Behind the Platform
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12"
              alt="Developer"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Lead Developer</h3>
            <p className="text-sm text-gray-500">
              Backend & Frontend Architecture
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
              alt="UI Designer"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">UI/UX Designer</h3>
            <p className="text-sm text-gray-500">
              User Experience & Visual Design
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
              alt="Content Manager"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">Content Manager</h3>
            <p className="text-sm text-gray-500">
              Content Strategy & Moderation
            </p>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-14 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Blogging App. Built with passion for writers
          and readers.
        </p>
      </div>
    </div>
  );
}
