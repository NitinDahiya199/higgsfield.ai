"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

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
          className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#EDEDED] mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 transition-colors"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-[#1F2329] bg-[#151A20] text-[#B8FF00] focus:ring-2 focus:ring-[#B8FF00]/20"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-[#9AA0A6]">
            Remember me
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-[#B8FF00] hover:text-[#B8FF00]/80 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#B8FF00] px-4 py-3 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-[#9AA0A6]">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#B8FF00] hover:text-[#B8FF00]/80 transition-colors">
          Sign up
        </Link>
      </p>
    </form>
  );
}
