/**
 * 相关文档
 * cross-env：https://github.com/kentcdodds/cross-env#readme
 * husky：https://github.com/typicode/husky
 * commitlint：https://github.com/conventional-changelog/commitlint#readme
 * 规则列表：https://commitlint.js.org/#/reference-rules
 */
module.exports = {
  // @commitlint/config-conventional：https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
  extends: ["@commitlint/config-conventional"],
  rules: {
    // scope最大长度为8
    "scope-max-length": [2, "always", 8],
    // 类型的枚举配置
    "type-enum": [
      2,
      "always",
      [
        // 构建生产
        "build",
        // 命令||脚本
        "ci",
        // 临时事务
        "chore",
        // 文档
        "docs",
        // 特性||功能
        "feat",
        // 修复
        "fix",
        // 性能
        "perf",
        // 重构
        "refactor",
        // 还原
        "revert",
        // 样式
        "style",
        // 测试相关
        "test",
        // 发布版本
        "release",
      ],
    ],
  },
};
