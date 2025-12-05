'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import Link from "next/link";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login
    router.push('/dashboard');
  };

  return (
    <main className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Bagian kiri - Form */}
      <section className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-purple-800'}`}>
              Login
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-800" />
              )}
            </button>
          </div>

          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter Email & Password to Access your Account
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className={`w-full p-2 border rounded-md outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'border-gray-300 text-gray-800'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                type="password"
                placeholder="Input Password"
                className={`w-full p-2 border rounded-md outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'border-gray-300 text-gray-800'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                remember me
              </label>
              <a href="/login-page/forget-pass" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-purple-700 text-white py-2 rounded-full mt-2 hover:bg-purple-800 transition"
            >
              Login
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-purple-700 text-purple-700 py-2 rounded-full hover:bg-purple-50 transition"
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
              Continue With Google  
            </button>

            <p className="text-center text-sm mt-4 text-gray-600">
              Haven’t join yet?{' '}
              <a href="/login-page/register" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* Bagian kanan - Gambar */}
      <section className="hidden md:flex w-1/2 relative">
        <Image
          src="/login-bg.jpg"
          alt="Login background"
          fill
          className="object-cover"
        />
      </section>
    </main>
  );
}
