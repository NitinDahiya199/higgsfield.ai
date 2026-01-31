"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <a
            href="#image"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Image
          </a>
          <a
            href="#video"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Video
          </a>
          <a
            href="#edit"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Edit
          </a>
          <a
            href="#character"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Character
          </a>
          <a
            href="#inpaint"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Inpaint
          </a>
          <a
            href="#cinema-studio"
            className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Cinema Studio
            <span
              className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
            >
              v1.5
            </span>
          </a>
          <a
            href="#motion-control"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Motion Control
          </a>
          <a
            href="#ai-influencer"
            className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            AI Influencer
            <span
              className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
            >
              Free
            </span>
          </a>
          <a
            href="#assist"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Assist
          </a>
          <a
            href="#apps"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Apps
          </a>
          <a
            href="#community"
            className={`text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Community
          </a>
        </div>

        {/* Right Side: Pricing, Login, Sign up */}
        <div className="flex items-center gap-4">
          <a
            href="#pricing"
            className={`hidden text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] lg:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Pricing
          </a>
          <a
            href="#login"
            className={`hidden rounded-sm ${theme.buttonDark} px-4 py-2 text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}] sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Login
          </a>
          <a
            href="#signup"
            className={`hidden rounded-sm bg-[${theme.accent.primary}] px-4 py-2 text-sm font-medium ${theme.textDark} transition-opacity hover:opacity-90 sm:inline-block focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
          >
            Sign up
          </a>
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
            <a
              href="#image"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Image
            </a>
            <a
              href="#video"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Video
            </a>
            <a
              href="#edit"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Edit
            </a>
            <a
              href="#character"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Character
            </a>
            <a
              href="#inpaint"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Inpaint
            </a>
            <a
              href="#cinema-studio"
              className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Cinema Studio
              <span
                className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
              >
                v1.5
              </span>
            </a>
            <a
              href="#motion-control"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Motion Control
            </a>
            <a
              href="#ai-influencer"
              className={`flex items-center gap-2 text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              AI Influencer
              <span
                className={`rounded-sm bg-[${theme.accent.primary}] px-1.5 py-0.5 text-xs font-semibold ${theme.textDark}`}
              >
                Free
              </span>
            </a>
            <a
              href="#assist"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Assist
            </a>
            <a
              href="#apps"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Apps
            </a>
            <a
              href="#community"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Community
            </a>
            <a
              href="#pricing"
              className={`block text-sm ${theme.textPrimary} transition-colors hover:text-[${theme.accent.primary}] py-2`}
            >
              Pricing
            </a>
            <div className={`pt-4 space-y-2 border-t ${theme.borderDefault}`}>
              <a
                href="#login"
                className={`block w-full rounded-sm ${theme.buttonDark} px-4 py-2 text-center text-sm font-medium ${theme.textPrimary} transition-colors hover:bg-[${theme.button.darkHover}]`}
              >
                Login
              </a>
              <a
                href="#signup"
                className={`block w-full rounded-sm bg-[${theme.accent.primary}] px-4 py-2 text-center text-sm font-medium ${theme.textDark} transition-opacity hover:opacity-90`}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
