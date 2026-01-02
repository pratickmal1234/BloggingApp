import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-8 bg-violet-900 pt-9 text-white">
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:px-10">

          {/* 🔹 LEFT : BRAND INFO */}
          <div className="md:w-[316px]">
            <h1 className="text-2xl font-extrabold">
              ✍️ <span className="text-rose-400">Blogging</span> App
            </h1>

            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              A simple and powerful blogging platform where you can
              write posts, share ideas, and connect with readers.
            </p>

            {/* ✅ SOCIAL ICONS */}
            <div className="mt-5 flex gap-4">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaLinkedinIn />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaYoutube />} />
            </div>
          </div>

          {/* 🔹 MIDDLE : CONTACT INFO */}
          <div className="md:w-[316px] space-y-6">

            <ContactItem
              icon={<FaPhoneAlt />}
              title="+91 1800 123 444"
              subtitle="Support Number"
            />

            <ContactItem
              icon={<FaEnvelope />}
              title="support@bloggingapp.com"
              subtitle="Support Email"
            />

            <ContactItem
              icon={<FaMapMarkerAlt />}
              title="Navi Mumbai, Maharashtra, India"
              subtitle="Office Address"
            />
          </div>

          {/* 🔹 RIGHT : QUICK LINKS */}
          <div className="flex w-full flex-col sm:flex-row md:max-w-[341px] gap-10">

            <div>
              <p className="text-lg font-semibold mb-4">Pages</p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/dashboard" className="hover:font-semibold">Home</Link></li>
                <li><Link to="/dashboard/post" className="hover:font-semibold">Create Post</Link></li>
                <li><Link to="/dashboard/postdata" className="hover:font-semibold">All Posts</Link></li>
                <li><Link to="/dashboard/about" className="hover:font-semibold">About</Link></li>
                <li><Link to="/dashboard/contact" className="hover:font-semibold">Contact</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold mb-4">Get the App</p>
              <div className="flex gap-4 sm:flex-col">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-12 cursor-pointer"
                />
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-12 cursor-pointer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 🔻 BOTTOM BAR */}
        <hr className="mt-8 border-white/20" />
        <div className="py-6 text-center text-xs text-white/80">
          © {new Date().getFullYear()} Blogging App — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

/* 🔹 Reusable Components */
function SocialIcon({ icon }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-rose-500 transition cursor-pointer">
      {icon}
    </div>
  );
}

function ContactItem({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-lg text-rose-300">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-white/70">{subtitle}</p>
      </div>
    </div>
  );
}
