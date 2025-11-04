"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate login
    setLoginStatus("Login functionality coming soon!");
    
    // Clear message after 3 seconds
    setTimeout(() => setLoginStatus(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-[2.5rem] font-bold font-playfair mb-4 mx-4">
          Welcome Back
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sign in to continue your reading journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-playfair">
            Sign In
          </h2>

          {loginStatus && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
              {loginStatus}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#bccdbc] hover:bg-[#a8b9a8] text-black font-semibold py-3 rounded-lg transition duration-200 mb-4"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Info Section */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-playfair">
              Why Sign In?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">📚</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Track Your Books
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Keep a personalized record of books you&apos;ve read and want to
                    read
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-2xl mr-4">⭐</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Save Your Reviews
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your ratings and reviews will be saved to your account
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-2xl mr-4">❤️</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Sync Favorites
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Access your favorite books from any device
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-2xl mr-4">🔔</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Get Recommendations
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Receive personalized book suggestions based on your taste
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">
              Join the Community
            </h3>
            <p className="text-gray-700 text-sm">
              Connect with fellow book lovers, share your thoughts, and
              discover your next favorite read together! 📖✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

