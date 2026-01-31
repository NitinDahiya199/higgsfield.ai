"use client";

import { SignupForm } from "@/components/auth/signup-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";

export default function SignupPage() {
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
          <h1 className="mb-2 text-2xl font-semibold text-[#EDEDED]">Create account</h1>
          <p className="mb-6 text-sm text-[#9AA0A6]">
            Start creating amazing content with AI-powered tools.
          </p>

          <OAuthButtons />
          <div className="my-6">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
