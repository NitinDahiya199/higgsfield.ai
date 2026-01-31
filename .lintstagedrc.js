const path = require("path");

module.exports = {
  // Web app files - use ESLint config from apps/web
  "apps/web/**/*.{ts,tsx,js,jsx}": (filenames) => {
    // Filter out config files
    const filesToLint = filenames.filter(
      (f) => !f.includes(".eslintrc") && !f.includes("eslint.config")
    );
    if (filesToLint.length === 0) {
      return [`prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`];
    }
    return [
      `npx eslint --fix --config apps/web/eslint.config.mjs ${filesToLint.map((f) => `"${f}"`).join(" ")}`,
      `prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
    ];
  },
  // API files - format only (API has its own lint script: npm run lint)
  // Skipping ESLint here to avoid version conflicts (API uses ESLint v8, root uses v9)
  "apps/api/**/*.{ts,tsx,js,jsx}": (filenames) => {
    // Filter out config files
    const filesToFormat = filenames.filter(
      (f) => !f.includes(".eslintrc") && !f.includes("eslint.config")
    );
    if (filesToFormat.length === 0) return [];
    return [`prettier --write ${filesToFormat.map((f) => `"${f}"`).join(" ")}`];
  },
  // Package files - just format
  "packages/**/*.{ts,tsx,js,jsx}": (filenames) => {
    return [`prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`];
  },
  // Root level files - format only
  "*.{ts,tsx,js,jsx}": (filenames) => {
    return [`prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`];
  },
  // All JSON, MD, YAML files
  "*.{json,md,yml,yaml}": (filenames) => {
    return [`prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`];
  },
};
