const fs = require("fs");
const jsonFormat = require("json-format");
const colors = require("colors");
const prompts = require("prompts");

interface IMeta {
  type: string;
  docs: {
    recommended: boolean;
  };
  deprecated: boolean;
}

interface IRule {
  name: string;
  meta?: IMeta;
}

/**
 * CLIEngine 类在7.0版本已经废弃，未来可能删除，官方文章：https://eslint.org/docs/user-guide/migrating-to-7.0.0#deprecate-cliengine
 * getRules() 方法在7.0版本中还未实现，在未实现之前，依然用require("eslint").CLIEngine.getRules()
 */
const CLIEngine = require("../node_modules/eslint").CLIEngine;
const cli = new CLIEngine();

const nowPackageJson = require("../node_modules/eslint/package.json");

// 所有规则map结构
const rulesMap = cli.getRules();

/**
 * @description 规则object转成数组
 */
function rulesObjectToArr(ruleObject: { [key: string]: { meta: IMeta } }) {
  return Object.entries(ruleObject).map(([key, value]) => {
    return { name: key, ...value };
  });
}

// 所有规则object结构
const rulesObj = Object.fromEntries(rulesMap.entries());

// 所有规则列表
const ruleList = rulesObjectToArr(rulesObj);

interface Ilinter {
  /** linter的名称 */
  name: string;
  /** linter的版本 */
  version: string;
  /** linter的规则 */
  rules: IRule[];
}

function checkPackageInstall() {
  const eslintExist = fs.existsSync("./node_modules/eslint");
  const tsPluginExist = fs.existsSync("./node_modules/@typescript-eslint/eslint-plugin");

  const reactPluginExist = fs.existsSync("./node_modules/eslint-plugin-react");

  const vuePluginExist = fs.existsSync("./node_modules/eslint-plugin-vue");

  return eslintExist && tsPluginExist && reactPluginExist && vuePluginExist;
}

/**
 * @description 检查规则的覆盖情况
 * @param now 现在的信息
 * @param latest 最新的信息
 */
function checkCoverage(now: Ilinter, latest: Ilinter) {
  // 当前推荐规则
  const nowRules = now.rules.filter(item => item.meta?.docs.recommended);
  const nowList = nowRules.map(item => item.name);

  // 最新版本中废弃的规则
  const deprecatedLatestRules = latest.rules.filter(item => item.meta?.deprecated).map(item => item.name);

  // 最新版本中推荐的规则
  const recommendedLatestRules = latest.rules.filter(item => item.meta?.docs.recommended);
  // 规则名称数组
  const recommendedLatestList = recommendedLatestRules.map(item => item.name);

  // 当前使用的规则中存在的废弃规则，建议去除
  const deprecated = nowRules.filter(item => deprecatedLatestRules.includes(item.name));

  // 当前使用的规则，已不在推荐规则中，建议去除
  const nonexistent = nowRules.filter(item => !recommendedLatestList.includes(item.name));

  // 缺少的推荐规则，建议添加
  const lose = recommendedLatestRules.filter(item => !nowList.includes(item.name));

  consoleInfo(now, latest, deprecated, "当前使用的规则中存在的废弃规则，建议去除");

  consoleInfo(now, latest, nonexistent, "当前使用的规则，已不在推荐规则中，建议去除");

  consoleInfo(now, latest, lose, "缺少的推荐规则，建议升级包并添加");
}

/**
 * @description 打印出提示消息
 * @param now 现在的信息
 * @param latest 最新的信息
 * @param list 规则列表
 * @param message 提示消息
 */
function consoleInfo(now: Ilinter, latest: Ilinter, list: IRule[], message: string) {
  console.log(`\n${colors.blue(now.name)}当前版本「${colors.blue(now.version)}」，最新版本「${colors.blue(
    latest.version,
  )}」\n${colors.yellow(message)}\n
  ${jsonFormat(list).green}\n`);
}

/**
 * @description 检查ESLint
 */
function checkESLint() {
  const latestCLIEngine = require("eslint").CLIEngine;
  const latestCli = new latestCLIEngine();

  const latestPackageJson = require("eslint/package.json");

  // 所有规则map结构
  const latestRulesMap = latestCli.getRules();

  // 所有规则object结构
  const latestRulesObj = Object.fromEntries(latestRulesMap.entries());

  // 所有规则列表
  const latestRuleList = rulesObjectToArr(latestRulesObj);

  const now = {
    name: nowPackageJson.name,
    version: nowPackageJson.version,
    rules: ruleList,
  };

  const latest = {
    name: latestPackageJson.name,
    version: latestPackageJson.version,
    rules: latestRuleList,
  };

  checkCoverage(now, latest);
}

/**
 * @description 检查TypeScript插件规则覆盖情况
 */
function checkTsPlugin() {
  const nowPackageJson = require("../node_modules/@typescript-eslint/eslint-plugin/package.json");
  const nowRules = require("../node_modules/@typescript-eslint/eslint-plugin/dist/rules").default;

  const latestPackageJson = require("@typescript-eslint/eslint-plugin/package.json");
  const latestRules = require("@typescript-eslint/eslint-plugin/dist/rules").default;

  // 所有规则列表
  const nowRuleList = rulesObjectToArr(nowRules);
  const latestRuleList = rulesObjectToArr(latestRules);

  const now = {
    name: nowPackageJson.name,
    version: nowPackageJson.version,
    rules: nowRuleList,
  };

  const latest = {
    name: latestPackageJson.name,
    version: latestPackageJson.version,
    rules: latestRuleList,
  };

  checkCoverage(now, latest);
}

/**
 * @description 检查React插件规则覆盖情况
 */
function checkReactPlugin() {
  const nowPackageJson = require("../node_modules/eslint-plugin-react/package.json");
  const nowRules = require("../node_modules/eslint-plugin-react").rules;

  const latestPackageJson = require("eslint-plugin-react/package.json");
  const latestRules = require("eslint-plugin-react").rules;

  // 所有规则列表
  const nowRuleList = rulesObjectToArr(nowRules);
  const latestRuleList = rulesObjectToArr(latestRules);

  const now = {
    name: nowPackageJson.name,
    version: nowPackageJson.version,
    rules: nowRuleList,
  };

  const latest = {
    name: latestPackageJson.name,
    version: latestPackageJson.version,
    rules: latestRuleList,
  };

  checkCoverage(now, latest);
}

/**
 * @description 检查Vue插件规则覆盖情况
 */
function checkVuePlugin() {
  const nowPackageJson = require("../node_modules/eslint-plugin-vue/package.json");
  const nowRules = require("../node_modules/eslint-plugin-vue").rules;

  const latestPackageJson = require("eslint-plugin-vue/package.json");
  const latestRules = require("eslint-plugin-vue").rules;

  // 所有规则列表
  const nowRuleList = rulesObjectToArr(nowRules);
  const latestRuleList = rulesObjectToArr(latestRules);

  const now = {
    name: nowPackageJson.name,
    version: nowPackageJson.version,
    rules: nowRuleList,
  };

  const latest = {
    name: latestPackageJson.name,
    version: latestPackageJson.version,
    rules: latestRuleList,
  };

  checkCoverage(now, latest);
}

(async () => {
  if (!checkPackageInstall()) {
    console.log(
      `\n${colors.red("缺少最新版本的eslint及相关插件")}，请先执行${colors.green("npm run coverage:install")}进行安装`,
    );
    // 退出程序
    process.exit(1);
  }
  const response = await prompts({
    type: "select",
    name: "value",
    message: "Pick a option and check",
    choices: [
      { title: "ESLint", value: 0 },
      { title: "TypeScript", value: 1 },
      { title: "React", value: 2 },
      { title: "Vue", value: 3 },
    ],
  });
  if (response.value === 0) {
    checkESLint();
  } else if (response.value === 1) {
    checkTsPlugin();
  } else if (response.value === 2) {
    checkReactPlugin();
  } else if (response.value === 3) {
    checkVuePlugin();
  }
  process.exit(0);
})();
