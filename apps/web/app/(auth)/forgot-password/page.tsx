"use client";

import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Password reset email sent! Please check your inbox.");
      } else {
        const error = await response.json();
        setStatus("error");
        setMessage(error.message || "Failed to send reset email.");
      }
    } catch {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0D0F] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#EDEDED]">
              <svg
                className="h-5 w-5 text-[#0B0D0F]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 4c-2 0-4 2-4 4 0 2 2 3 4 4 2 1 4 2 4 4 0 2-2 4-4 4" />
                <path d="M16 20c2 0 4-2 4-4 0-2-2-3-4-4-2-1-4-2-4-4 0-2 2-4 4-4" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-[#EDEDED]">Higgsfield</span>
          </Link>
        </div>

        <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-8">
          <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Reset password</h1>
          <p className="mb-6 text-sm text-[#9AA0A6]">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {status === "success" && (
            <div className="mb-6 rounded-lg border border-[#B8FF00]/20 bg-[#B8FF00]/10 px-4 py-3 text-sm text-[#B8FF00]">
              {message}
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#EDEDED] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "success"}
                className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 disabled:opacity-50 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full rounded-lg bg-[#B8FF00] px-4 py-3 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "Email sent!"
                  : "Send reset link"}
            </button>

            <Link
              href="/login"
              className="block text-center text-sm text-[#B8FF00] hover:text-[#B8FF00]/80 transition-colors"
            >
              Back to login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
