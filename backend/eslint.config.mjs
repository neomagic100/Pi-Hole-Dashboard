import globals from "globals";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js", "**/*.test.js"],
    languageOptions: { sourceType: "commonjs" },
    plugins: { jest: pluginJest },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
    settings: {
      jest: {
        version: 29,
        globalAliases: {
          describe: ["context"],
          fdescribe: ["fcontext"],
          xdescribe: ["xcontext"]
        }
      },
    },
  },
  {
    languageOptions: { globals: globals.node }
  },
];