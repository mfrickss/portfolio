import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  { ignores: ["docs/**", "dist/**", "output/**", "tmp/**", "release-archives/**"] },
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: js.configs.recommended.rules,
  },
  {
    files: ["src/**/*.{js,jsx}", "tests/ui/*.jsx"],
    languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh, react },
    settings: { react: { version: "detect" } },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/jsx-uses-vars": "error",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: ["*.{js,mjs}", "scripts/**/*.mjs", "tests/**/*.mjs"],
    languageOptions: { globals: globals.node },
  },
  { files: ["tests/ui/*.spec.mjs"], languageOptions: { globals: globals.browser } },
];
