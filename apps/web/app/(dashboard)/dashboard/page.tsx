"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0B0D0F]">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-12 pt-24 lg:px-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold text-[#EDEDED] mb-2">Dashboard</h1>
            <p className="text-base text-[#9AA0A6]">
              Welcome back,{" "}
              <span className="text-[#EDEDED] font-medium">
                {user?.name || user?.email || "User"}
              </span>
              ! Ready to create something amazing?
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Total Projects</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-3xl font-semibold text-[#EDEDED]">0</p>
            </div>
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Credits Used</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-semibold text-[#EDEDED]">0</p>
            </div>
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Storage Used</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <p className="text-3xl font-semibold text-[#EDEDED]">0 MB</p>
            </div>
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Account Status</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#B8FF00]">
                {user?.emailVerified ? "Verified" : "Unverified"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Actions */}
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#EDEDED]">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  View Profile
                </Link>
                <button className="flex w-full items-center gap-3 rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-left text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create New Project
                </button>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#EDEDED]">Recent Projects</h2>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <svg
                  className="h-12 w-12 text-[#6F7681] mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p className="text-sm text-[#9AA0A6] mb-2">No projects yet</p>
                <p className="text-xs text-[#6F7681]">Start creating your first project!</p>
              </div>
            </div>

            {/* Account Info */}
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#EDEDED]">Account Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name || "Avatar"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#151A20] border border-[#1F2329]">
                      <span className="text-sm font-medium text-[#EDEDED]">
                        {(user?.name || user?.email || "U")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#EDEDED] truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-[#9AA0A6] truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#1F2329] space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9AA0A6]">Email Status:</span>
                    <span
                      className={`font-medium ${user?.emailVerified ? "text-[#B8FF00]" : "text-[#9AA0A6]"}`}
                    >
                      {user?.emailVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    className="block mt-3 text-center rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-2 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
                  >
                    Manage Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
