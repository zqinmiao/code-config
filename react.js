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
     * 规则列表：https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
     * Recommended规则列表：https://github.com/yannickcr/eslint-plugin-react#recommended
     * github地址：https://github.com/yannickcr/eslint-plugin-react
     * 在node_modules中的位置：node_modules/eslint-plugin-react/index.js， configs ——> recommended
     */
    "plugin:react/recommended",
  ],
  plugins: ["react"],
  rules: {},
};
