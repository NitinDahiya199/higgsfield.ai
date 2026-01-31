"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const verifyEmail = async () => {
      setStatus("loading");
      try {
        const response = await fetch(`${API_URL}/api/auth/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (cancelled) return;

        if (response.ok) {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          const errorData = await response.json();
          setStatus("error");
          setMessage(errorData.message || "Verification failed. Please try again.");
        }
      } catch {
        if (cancelled) return;
        setStatus("error");
        setMessage("An error occurred. Please try again.");
      }
    };

    verifyEmail();

    return () => {
      cancelled = true;
    };
  }, [token, router]);

  const resendEmail = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Verification email sent! Please check your inbox.");
      } else {
        const errorData = await response.json();
        setStatus("error");
        setMessage(errorData.message || "Failed to send verification email.");
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

        <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-8 text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#1F2329] border-t-[#B8FF00]"></div>
              <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Verifying email...</h1>
              <p className="text-sm text-[#9AA0A6]">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B8FF00]/20">
                <svg
                  className="h-6 w-6 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Email verified!</h1>
              <p className="mb-6 text-sm text-[#9AA0A6]">{message}</p>
              <p className="text-xs text-[#6F7681]">Redirecting to login...</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Verification failed</h1>
              <p className="mb-6 text-sm text-[#9AA0A6]">{message}</p>
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20"
                  />
                </div>
                <button
                  onClick={resendEmail}
                  className="w-full rounded-lg bg-[#B8FF00] px-4 py-3 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 transition-colors"
                >
                  Resend verification email
                </button>
                <Link
                  href="/login"
                  className="block text-sm text-[#B8FF00] hover:text-[#B8FF00]/80 transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </>
          )}

          {status === "idle" && !token && (
            <>
              <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Verify your email</h1>
              <p className="mb-6 text-sm text-[#9AA0A6]">
                Please check your email for a verification link, or enter your email to resend it.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/20"
                />
                <button
                  onClick={resendEmail}
                  className="w-full rounded-lg bg-[#B8FF00] px-4 py-3 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 transition-colors"
                >
                  Resend verification email
                </button>
                <Link
                  href="/login"
                  className="block text-sm text-[#B8FF00] hover:text-[#B8FF00]/80 transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
