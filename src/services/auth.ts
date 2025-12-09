"use client";

import { apiFetch } from "./http";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    skipAuth: true,
  });
  // contoh: simpan token ke localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export async function register(payload: RegisterPayload) {
  const data = await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    skipAuth: true,
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token);
  }
  return data;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

