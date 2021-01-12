module.exports = {
  /**
   * 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。
   * 如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。
   * 为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下
   * 设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
   */
  root: true,
  // 相关文档：https://cn.eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  // 命令行的 --fix 选项用来自动修复规则所报告的问题（目前，大部分是对空白的修复），在elint官网上会有一个扳手的图标。
  /**
   * eslint 官网规则：https://cn.eslint.org/docs/rules/
   * 使用 "extends": "eslint:recommended" 来启用推荐的规则，eslint 官网推荐的规则都带有一个√标记。
   * node_modules中的位置：node_modules/eslint/conf/eslint-recommended.js
   */
  extends: "eslint:recommended",
  // 相关文档：https://cn.eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": ["error", { varsIgnorePattern: "^__", argsIgnorePattern: "^__" }],
  },
  /**
   * overrides 要谨慎使用。如下，如果为空，会造成所有规则不能匹配文件
   * 相关文档（如何工作的）：https://cn.eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns
   */
  // overrides: [
  //   {
  //     extends: ["./typescript"],
  //     files: ["**/*.ts", "**/*.tsx"],
  //   },
  //   {
  //     extends: ["./vue"],
  //     files: ["**/*.vue"],
  //   },
  //   {
  //     extends: ["./index"],
  //     files: ["**/*.js"],
  //   },
  // ],
};
