"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { theme } from "@/lib/theme";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 border-b ${theme.borderDefault} ${theme.bgOverlay} backdrop-blur-sm`}
      aria-label="Dashboard header"
    >
      <nav
        className="mx-auto flex max-w-9xl items-center justify-between px-6 py-4 lg:px-12"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-sm bg-[${theme.colors.white}]`}
          >
            <svg
              className={`h-5 w-5 ${theme.black}`}
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
          <span className={`text-sm font-medium ${theme.textPrimary}`}>Explore</span>
        </Link>

        {/* Main Navigation Menu */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          <Link
            href="#image"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Image
          </Link>
          <Link
            href="#video"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Video
          </Link>
          <Link
            href="#edit"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Edit
          </Link>
          <Link
            href="#character"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Character
          </Link>
          <Link
            href="#inpaint"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Inpaint
          </Link>
          <Link
            href="#cinema-studio"
            className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Cinema Studio
            <span
              className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
            >
              v1.5
            </span>
          </Link>
          <Link
            href="#motion-control"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Motion Control
          </Link>
          <Link
            href="#ai-influencer"
            className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            AI Influencer
            <span
              className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
            >
              Free
            </span>
          </Link>
        </div>

        {/* Right Side: User Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className={`hidden rounded-sm ${theme.buttonDark} px-4 py-2 text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}] sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Dashboard
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-[#151A20]"
              aria-label="User menu"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "Avatar"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#151A20] border border-[#1F2329]">
                  <span className="text-xs font-medium text-[#EDEDED]">
                    {(user?.name || user?.email || "U")[0].toUpperCase()}
                  </span>
                </div>
              )}
              <svg
                className="h-4 w-4 text-[#9AA0A6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-sm border border-[#1F2329] bg-[#151A20] shadow-lg">
                  <div className="p-3 border-b border-[#1F2329]">
                    <p className="text-sm font-medium text-[#EDEDED] truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-[#9AA0A6] truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-[#EDEDED] transition-colors hover:bg-[#111418]"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-[#EDEDED] transition-colors hover:bg-[#111418]"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden rounded-sm p-2 ${theme.textPrimary} transition-colors hover:bg-[${theme.button.dark}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t ${theme.borderDefault} ${theme.bgPrimary}`}>
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-3">
            <Link
              href="#image"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Image
            </Link>
            <Link
              href="#video"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Video
            </Link>
            <Link
              href="#edit"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Edit
            </Link>
            <Link
              href="#character"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Character
            </Link>
            <Link
              href="#inpaint"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inpaint
            </Link>
            <Link
              href="#cinema-studio"
              className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cinema Studio
              <span
                className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
              >
                v1.5
              </span>
            </Link>
            <Link
              href="#motion-control"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Motion Control
            </Link>
            <Link
              href="#ai-influencer"
              className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Influencer
              <span
                className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
              >
                Free
              </span>
            </Link>
            <div className={`pt-4 space-y-2 border-t ${theme.borderDefault}`}>
              <Link
                href="/dashboard"
                className={`block w-full rounded-sm ${theme.buttonDark} px-4 py-2 text-center text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}]`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className={`block w-full rounded-sm ${theme.buttonDark} px-4 py-2 text-center text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}]`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className={`block w-full rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-center text-sm font-medium text-[#EDEDED] transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
