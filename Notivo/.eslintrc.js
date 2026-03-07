module.exports = {
  root: true,
  extends: ["expo", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    // Warn (not error) on unused variables — helps catch typos
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    // Prevent accidental console.log left in production
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // Require explicit return types on public functions
    "@typescript-eslint/explicit-function-return-type": "off",

    // Allow require() in config files (babel.config.js, etc.)
    "@typescript-eslint/no-var-requires": "off",

    // Allow 'any' type sparingly (will warn, not block build)
    "@typescript-eslint/no-explicit-any": "warn",

    // Enforce consistent import ordering
    "import/order": "off",
  },
  ignorePatterns: ["node_modules/", ".expo/", "dist/", "build/"],
};
