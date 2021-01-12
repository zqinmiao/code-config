// npm i eslint-plugin-vue -D
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    /**
     * 规则文档：https://eslint.vuejs.org/rules/
     * github: https://github.com/vuejs/eslint-plugin-vue
     * node_modules: node_modules/eslint-plugin-vue/lib/configs/essential.js
     */
    "plugin:vue/essential",
  ],
  plugins: ["vue"],
  rules: {},
};
