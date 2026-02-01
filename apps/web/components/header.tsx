"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { theme } from "@/lib/theme";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

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
      className={`fixed top-0 left-0 right-0 z-50 border-b ${theme.borderDefault} ${theme.bgOverlay} backdrop-blur-sm`}
      aria-label="Site header"
    >
      <nav
        className="mx-auto flex max-w-9xl items-center justify-between px-6 py-4 lg:px-12"
        aria-label="Main navigation"
      >
        {/* Logo with Explore */}
        <div className="flex items-center gap-3">
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
        </div>

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
          <Link
            href="#assist"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Assist
          </Link>
          <Link
            href="#apps"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Apps
          </Link>
          <Link
            href="#community"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Community
          </Link>
        </div>

        {/* Right Side: Pricing, Login, Sign up / User Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="#pricing"
            className={`hidden text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] lg:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Pricing
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`hidden rounded-sm ${theme.buttonDark} px-4 py-2 text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}] sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`hidden rounded-sm ${theme.buttonDark} px-4 py-2 text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}] sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className={`hidden rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-sm font-medium text-[#EDEDED] transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 sm:inline-block focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`hidden rounded-sm ${theme.buttonDark} px-4 py-2 text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}] sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`hidden rounded-sm bg-[${theme.accent.primary}] px-4 py-2 text-sm font-medium ${theme.textDark} transition-opacity hover:opacity-90 sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
              >
                Sign up
              </Link>
            </>
          )}
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
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t ${theme.borderDefault} ${theme.bgPrimary}`}>
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-3">
            <Link
              href="#image"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Image
            </Link>
            <Link
              href="#video"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Video
            </Link>
            <Link
              href="#edit"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Edit
            </Link>
            <Link
              href="#character"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Character
            </Link>
            <Link
              href="#inpaint"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Inpaint
            </Link>
            <Link
              href="#cinema-studio"
              className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
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
            >
              Motion Control
            </Link>
            <Link
              href="#ai-influencer"
              className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              AI Influencer
              <span
                className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
              >
                Free
              </span>
            </Link>
            <Link
              href="#assist"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Assist
            </Link>
            <Link
              href="#apps"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Apps
            </Link>
            <Link
              href="#community"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Community
            </Link>
            <Link
              href="#pricing"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Pricing
            </Link>
            <div className={`pt-4 space-y-2 border-t ${theme.borderDefault}`}>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`block w-full rounded-sm ${theme.buttonDark} px-4 py-2 text-center text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}]`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className={`block w-full rounded-sm ${theme.buttonDark} px-4 py-2 text-center text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}]`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block w-full rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-center text-sm font-medium text-[#EDEDED] transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`block w-full rounded-sm ${theme.buttonDark} px-4 py-2 text-center text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}]`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={`block w-full rounded-sm bg-[${theme.accent.primary}] px-4 py-2 text-center text-sm font-medium ${theme.textDark} transition-opacity hover:opacity-90`}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
