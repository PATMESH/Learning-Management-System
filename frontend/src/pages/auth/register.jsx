// RegistrationForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import { authService } from "../../api/auth.service";
import { User, Mail, Phone, Lock, Calendar, MapPin, Briefcase, Github, Linkedin, UserPlus } from "lucide-react";
import { InputField } from "../../Components/common/InputFeild";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    profession: "",
    linkedin_url: "",
    github_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.register(formData);

      if (result.success) {
        console.log("Registration successful!");
        navigate("/login", {
          state: { message: "Registration successful! Please sign in to continue." }
        });
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-4">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join our community and start your journey</p>
          </div>

          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <InputField
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    label="Full Name"
                    required
                    placeholder="Enter your full name"
                  />

                  {/* Email */}
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    label="Email Address"
                    required
                    placeholder="Enter your email"
                  />

                  {/* Phone */}
                  <InputField
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    icon={<Phone className="h-5 w-5 text-gray-400" />}
                    label="Phone Number"
                    required
                    placeholder="Enter your phone number"
                  />

                  {/* Password */}
                  <InputField
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    label="Password"
                    required
                    placeholder="Create a strong password"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* DOB */}
                  <InputField
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    icon={<Calendar className="h-5 w-5 text-gray-400" />}
                    label="Date of Birth"
                  />

                  {/* Gender */}
                  <div className="space-y-2">
                    <label htmlFor="gender" className="block font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputField
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    icon={<MapPin className="h-5 w-5 text-gray-400" />}
                    label="Location"
                    placeholder="Enter your location"
                  />

                  <InputField
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    icon={<Briefcase className="h-5 w-5 text-gray-400" />}
                    label="Profession"
                    placeholder="Enter your profession"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputField
                    id="linkedin_url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                    icon={<Linkedin className="h-5 w-5 text-gray-400" />}
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/your-profile"
                  />

                  <InputField
                    id="github_url"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleChange}
                    icon={<Github className="h-5 w-5 text-gray-400" />}
                    label="GitHub"
                    placeholder="https://github.com/your-username"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 ${isLoading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;