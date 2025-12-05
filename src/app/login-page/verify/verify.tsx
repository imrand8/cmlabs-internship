import React from "react";

export default function VerifyEmail() {
  return (
    <div className="flex h-screen bg-white">
      {/* Kiri: konten */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-16">
        {/* Avatar / icon */}
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-6" />

        <h1 className="text-2xl font-semibold text-purple-700 mb-2">
          Check your email
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-sm">
          We sent a password reset link to your email <br />
          <span className="font-medium text-purple-700">user@email.com</span>
          <br />
          It will expire within <strong>5 minutes</strong>. Please check your
          inbox.
        </p>

        <button
          className="w-full max-w-sm bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition"
          onClick={() => window.open("https://mail.google.com", "_blank")}
        >
          Open Gmail
        </button>

        <p className="text-gray-500 mt-4">
          Didn’t receive the email?{" "}
          <a
            href="/forgot-password"
            className="text-purple-600 hover:underline"
          >
            Click here to resend
          </a>
        </p>

        <button
          type="button"
          className="mt-6 text-purple-600 hover:underline"
          onClick={() => (window.location.href = "/login")}
        >
          Back to log in
        </button>
      </div>

      {/* Kanan: gambar */}
      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80"
          alt="Bird"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
