// https://stylelint.io/
module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-standard"],
  rules: {
    // 禁止使用未知的伪类选择器：https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown
    "selector-pseudo-class-no-unknown": [
      true,
      {
        // 忽略css modules语法
        ignorePseudoClasses: ["global", "local", "pure"],
      },
    ],
    // 禁止使用未知属性：https://stylelint.io/user-guide/rules/property-no-unknown
    "property-no-unknown": [
      true,
      {
        // 忽略css modules语法
        ignoreProperties: ["composes"],
      },
    ],
    // 禁止使用未知规则：https://stylelint.io/user-guide/rules/at-rule-no-unknown
    "at-rule-no-unknown": [
      true,
      {
        // 忽略css modules语法
        ignoreAtRules: ["value"],
      },
    ],
  },
};
