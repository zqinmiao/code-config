/**
 * @file 检查stylelint 的规则覆盖情况
 */
const path = require("path");
// const fs = require("fs");
const __colors = require("colors");
const stylelintRules = require("stylelint-find-new-rules");
const jsonFormat = require("json-format");

const configPath = path.resolve(__dirname, "../.stylelintrc.js");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
stylelintRules(configPath).then((rules: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deprecated = rules.used.filter((item: any) => item.isDeprecated);

  console.log(`\n使用中的规则存在已废弃的规则：\n ${jsonFormat(deprecated).red}\n请去除\n`);

  // fs.writeFileSync(`${__dirname}/all.json`, jsonFormat(rules));
  // fs.writeFileSync(`${__dirname}/used.json`, jsonFormat(rules.used));
});

export {};
