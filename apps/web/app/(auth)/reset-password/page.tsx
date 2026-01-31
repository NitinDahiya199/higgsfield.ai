"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    token ? "idle" : "error"
  );
  const [message, setMessage] = useState(token ? "" : "Invalid or missing reset token.");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const error = await response.json();
        setStatus("error");
        setMessage(error.message || "Failed to reset password.");
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
          <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Set new password</h1>
          <p className="mb-6 text-sm text-[#9AA0A6]">Enter your new password below.</p>

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
              <label htmlFor="password" className="block text-sm font-medium text-[#EDEDED] mb-2">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={status === "success"}
                className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 disabled:opacity-50 transition-colors"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-[#6F7681]">Must be at least 8 characters</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#EDEDED] mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={status === "success"}
                className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 disabled:opacity-50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success" || !token}
              className="w-full rounded-lg bg-[#B8FF00] px-4 py-3 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading"
                ? "Resetting..."
                : status === "success"
                  ? "Password reset!"
                  : "Reset password"}
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
