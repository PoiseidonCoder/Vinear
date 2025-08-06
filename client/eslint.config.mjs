import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import pluginJs from "@eslint/js";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import eslintPluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      tailwindcss: eslintPluginTailwind,
      react: eslintPluginReact,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          semi: true,
          trailingComma: "none",
          tabWidth: 4,
          endOfLine: "auto",
          useTabs: false,
          singleQuote: true,
          printWidth: 150,
          jsxSingleQuote: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "tailwindcss/classnames-order": "warn",
      "react/forbid-elements": [
        "error",
        [
          { element: "a", message: "Use <Link> from next/link instead" },
          { element: "img", message: "Use <Image> from next/image instead" },
          { element: "script", message: "Use next/script instead" },
        ],
      ],
    },
  },
  {
    ignores: ["**/node_modules/", "**/.next/", "**/dist/"],
  },
];

export default config;
