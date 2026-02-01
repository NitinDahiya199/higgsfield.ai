import Link from "next/link";
import { theme } from "@/lib/theme";

export function Footer() {
  return (
    <footer className={`border-t ${theme.borderDefault} py-16`} aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className={`text-lg font-semibold tracking-tight ${theme.textPrimary}`}>
                Higgsfield
              </span>
              <span className={`text-xs ${theme.textMuted}`}>AI</span>
            </div>
            <p className={`text-sm ${theme.textSecondary}`}>
              Production-grade AI infrastructure for engineering teams.
            </p>
          </div>

          <div>
            <h3 className={`mb-4 text-sm font-medium ${theme.textPrimary}`}>Product</h3>
            <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
              <li>
                <Link
                  href="#features"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#docs"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-4 text-sm font-medium ${theme.textPrimary}`}>Company</h3>
            <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
              <li>
                <Link
                  href="#about"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-4 text-sm font-medium ${theme.textPrimary}`}>Support</h3>
            <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
              <li>
                <Link
                  href="#contact"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#status"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="#security"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 border-t ${theme.borderDefault} pt-8 text-center text-sm ${theme.textMuted}`}
        >
          <p>© {new Date().getFullYear()} Higgsfield AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
