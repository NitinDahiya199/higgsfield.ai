/**
 * Theme Configuration
 * Centralized color system for the Higgsfield.ai design system
 *
 * Usage in components:
 * - For Tailwind classes: Use theme.white, theme.black, etc. (e.g., className={theme.white})
 * - For inline styles: Use theme.background.primary, theme.text.primary, etc.
 */

export const theme = {
  // Background Colors
  background: {
    primary: "#0B0D0F", // Main dark background
    secondary: "#111418", // Secondary dark background
    tertiary: "#151A20", // Tertiary dark background (cards, elevated surfaces)
    overlay: "#0B0D0F/95", // Semi-transparent overlay for header
  },

  // Text Colors
  text: {
    primary: "#EDEDED", // Main white text
    secondary: "#9AA0A6", // Gray text (body, descriptions)
    muted: "#6F7681", // Lighter gray text (labels, captions)
    dark: "#0B0D0F", // Dark text (for light backgrounds)
  },

  // Border Colors
  border: {
    default: "#1F2329", // Default border color
  },

  // Accent Colors
  accent: {
    primary: "#B8FF00", // Acid green accent (primary CTA, highlights)
    secondary: "#7C8BFF", // Purple/blue accent (secondary actions)
  },

  // Button Colors
  button: {
    dark: "#1F2329", // Dark button background
    darkHover: "#2A2F36", // Dark button hover state
  },

  // Semantic Colors - Tailwind class strings for easy use
  white: "text-[#EDEDED]",
  black: "text-[#0B0D0F]",
  green: "text-[#B8FF00]",
  purple: "text-[#7C8BFF]",

  // Background Tailwind classes
  bgPrimary: "bg-[#0B0D0F]",
  bgSecondary: "bg-[#111418]",
  bgTertiary: "bg-[#151A20]",
  bgOverlay: "bg-[#0B0D0F]/95",

  // Text Tailwind classes
  textPrimary: "text-[#EDEDED]",
  textSecondary: "text-[#9AA0A6]",
  textMuted: "text-[#6F7681]",
  textDark: "text-[#0B0D0F]",

  // Border Tailwind classes
  borderDefault: "border-[#1F2329]",

  // Accent Tailwind classes
  accentPrimary: "text-[#B8FF00]",
  accentSecondary: "text-[#7C8BFF]",

  // Button Tailwind classes
  buttonDark: "bg-[#1F2329]",
  buttonDarkHover: "hover:bg-[#2A2F36]",

  // Additional semantic mappings
  colors: {
    white: "#EDEDED",
    black: "#0B0D0F",
    gray: {
      light: "#6F7681",
      medium: "#9AA0A6",
      dark: "#1F2329",
    },
    green: "#B8FF00",
    purple: "#7C8BFF",
  },
} as const;
