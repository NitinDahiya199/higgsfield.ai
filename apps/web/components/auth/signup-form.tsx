"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      router.push("/verify-email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
        <label htmlFor="name" className="block text-sm font-medium text-[#EDEDED] mb-2">
          Name (optional)
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 transition-colors"
          placeholder="John Doe"
        />
      </div>

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
          minLength={8}
          className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 transition-colors"
          placeholder="••••••••"
        />
        <p className="mt-1 text-xs text-[#6F7681]">Must be at least 8 characters</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#EDEDED] mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20 transition-colors"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-start">
        <input
          id="terms"
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-[#1F2329] bg-[#151A20] text-[#B8FF00] focus:ring-2 focus:ring-[#B8FF00]/20"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-[#9AA0A6]">
          I agree to the{" "}
          <Link href="/terms" className="text-[#B8FF00] hover:text-[#B8FF00]/80">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#B8FF00] hover:text-[#B8FF00]/80">
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#B8FF00] px-4 py-3 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-[#9AA0A6]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#B8FF00] hover:text-[#B8FF00]/80 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
