"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Nanti di sini bisa ditambahkan logika kirim email ke backend API.
    // Sekarang kita arahkan dulu ke halaman verifikasi email.
    router.push("/auth/verify-email");
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Bagian kiri: form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        <h1 className="text-3xl font-semibold text-purple-700 mb-3">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-center mb-8 max-w-sm">
          No worries! Enter your email address below, and we’ll send you a link
          to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition"
          >
            Reset Password
          </button>
        </form>

        <a
          href="/login-page/login"
          className="mt-6 text-blue-600 hover:underline text-sm"
        >
          Back to login
        </a>
      </div>

      {/* Bagian kanan: gambar */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80"
          alt="Bird on branch"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
