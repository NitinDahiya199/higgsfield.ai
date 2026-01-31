"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function OAuthCallbackPage({ params }: { params: { provider: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      // Use setTimeout to avoid setState in effect
      setTimeout(() => {
        setStatus("error");
        setMessage("Authentication failed. Please try again.");
      }, 0);
      return;
    }

    if (!code) {
      setTimeout(() => {
        setStatus("error");
        setMessage("Missing authorization code.");
      }, 0);
      return;
    }

    let cancelled = false;

    const handleCallback = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/${params.provider}/callback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (cancelled) return;

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }
          await refreshUser();
          setStatus("success");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          const errorData = await response.json();
          setStatus("error");
          setMessage(errorData.message || "Authentication failed.");
        }
      } catch {
        if (cancelled) return;
        setStatus("error");
        setMessage("An error occurred during authentication.");
      }
    };

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [searchParams, params.provider, refreshUser, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0D0F]">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#1F2329] border-t-[#B8FF00]"></div>
            <h1 className="mb-2 text-xl font-semibold text-[#EDEDED]">
              Completing authentication...
            </h1>
            <p className="text-sm text-[#9AA0A6]">Please wait while we sign you in.</p>
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
            <h1 className="mb-2 text-xl font-semibold text-[#EDEDED]">Success!</h1>
            <p className="text-sm text-[#9AA0A6]">Redirecting to dashboard...</p>
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
            <h1 className="mb-2 text-xl font-semibold text-[#EDEDED]">Authentication failed</h1>
            <p className="mb-4 text-sm text-[#9AA0A6]">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="rounded-lg bg-[#B8FF00] px-4 py-2 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 transition-colors"
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
