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
                <a
                  href="#features"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-4 text-sm font-medium ${theme.textPrimary}`}>Company</h3>
            <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
              <li>
                <a
                  href="#about"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-4 text-sm font-medium ${theme.textPrimary}`}>Support</h3>
            <ul className={`space-y-3 text-sm ${theme.textSecondary}`}>
              <li>
                <a
                  href="#contact"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#status"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className={`transition-colors hover:text-[${theme.text.primary}] focus:outline-none focus:ring-2 focus:ring-[${theme.accent.primary}] focus:ring-offset-2 focus:ring-offset-[${theme.background.primary}]`}
                >
                  Security
                </a>
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
