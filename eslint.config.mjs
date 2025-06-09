import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    rules: {
      // 可以在這裡添加針對 TypeScript 文件的特定規則
    },
  },
  {
    ignores: ["node_modules", "dist", "build", ".env", "package-lock.json"],
    files: ["**/*.{js,mjs,cjs}", "eslint.config.mjs"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];