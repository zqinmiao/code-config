// npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    /**
     * 规则列表：https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/README.md#supported-rules
     * 规则源码地址：https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs/recommended.ts
     * plugin: 包名 (省略了前缀）plugin:@typescript-eslint/recommended，全称为：@typescript-eslint/eslint-plugin/recommended
     * node_modules中的位置在：node_modules/@typescript-eslint/eslint-plugin/dist/configs/recommended.js
     */
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^__", argsIgnorePattern: "^__" }],
    "@typescript-eslint/no-var-requires": "off",
  },
};
