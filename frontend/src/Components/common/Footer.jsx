import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Master Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Master Courses
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Web Development</li>
            <li className="hover:text-white cursor-pointer">Programming</li>
            <li className="hover:text-white cursor-pointer">
              Machine Learning
            </li>
            <li className="hover:text-white cursor-pointer">
              Project Fundamentals
            </li>
          </ul>
        </div>

        {/* Intermediate Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Intermediate Courses
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Web Development</li>
            <li className="hover:text-white cursor-pointer">Programming</li>
            <li className="hover:text-white cursor-pointer">
              Machine Learning
            </li>
            <li className="hover:text-white cursor-pointer">
              Project Fundamentals
            </li>
          </ul>
        </div>

        {/* Beginner Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Beginner Courses
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Web Development</li>
            <li className="hover:text-white cursor-pointer">Programming</li>
            <li className="hover:text-white cursor-pointer">
              Machine Learning
            </li>
            <li className="hover:text-white cursor-pointer">
              Project Fundamentals
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright + Socials */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 text-white transition"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 text-white transition"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 text-white transition"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;