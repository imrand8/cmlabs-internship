"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Gambar Kiri */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          src="/login-bg.jpg" // ganti dengan path gambar kamu
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Kanan */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-10 bg-white">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
            Sign Up
          </h1>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                placeholder="Company"
                className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job
                </label>
                <input
                  type="text"
                  placeholder="Job"
                  className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Input Password"
                  className="w-full mt-1 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm mt-2 text-gray-600">
              <input type="checkbox" className="mr-2" />
              <span>
                I agree to CMS{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-full mt-4 transition"
            >
              Sign Up
            </button>

            <div className="text-center text-sm mt-4 text-gray-600">
              Already have an account?{" "}
              <Link href="/login-page/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
  type="button"
  className="w-full border border-purple-500 text-purple-700 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-purple-50 transition"
>
  <svg
    className="w-5 h-5"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.18 0 5.8 1.1 7.93 3.06l5.9-5.9C33.63 3.3 29.19 1.5 24 1.5 14.95 1.5 7.13 6.9 3.68 14.91l6.91 5.37C12.11 13.79 17.6 9.5 24 9.5z"
    />
    <path
      fill="#34A853"
      d="M46.1 24.5c0-1.47-.13-2.88-.36-4.25H24v8.51h12.43c-.54 2.82-2.2 5.22-4.67 6.83l7.1 5.53C42.83 37.25 46.1 31.33 46.1 24.5z"
    />
    <path
      fill="#4A90E2"
      d="M10.59 28.28A14.4 14.4 0 019.5 24c0-1.48.25-2.9.7-4.23l-6.91-5.37A22.41 22.41 0 001.5 24c0 3.68.88 7.14 2.4 10.2l6.69-5.92z"
    />
    <path
      fill="#FBBC05"
      d="M24 46.5c6.48 0 11.91-2.13 15.88-5.85l-7.1-5.53c-2.05 1.39-4.69 2.23-8.78 2.23-6.4 0-11.89-4.29-13.41-10.14l-6.91 5.37C7.13 41.1 14.95 46.5 24 46.5z"
    />
  </svg>

  <span>Continue With Google</span>
</button>

          </form>
        </div>
      </div>
    </div>
  );
}
