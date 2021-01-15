const shell = require("shelljs");
const prompts = require("prompts");
const colors = require("colors");
const semver = require("semver");

let packageJson = require("../../package.json");

// 当前版本号
let currentVersion = `${packageJson.version}`;

/**
 * 将当前版本作为一个新标签提交至远程仓库
 */
async function pushGit() {
  shell.exec(`git tag -a v${currentVersion} -m "release: ${currentVersion}"`);
  shell.exec(`git push origin v${currentVersion}`);
  shell.exec(`git push`);
}

/**
 * 更新版本号
 */
async function updateVersion() {
  const response = await prompts({
    type: "text",
    name: "value",
    message: `当前版本「${colors.green(packageJson.version)}」\n请输入新的版本号，语义化版本号请参考：${colors.blue(
      "https://semver.org/lang/zh-CN/",
    )}\n版本号(跳过按回车)：`,
  });

  // 跳过版本号输入
  if (!response.value) {
    currentVersion = `${packageJson.version}`;
    return;
  }

  // 校验版本号格式
  if (!semver.valid(response.value)) {
    console.log(colors.red("版本号格式错误，请重新输入"));
    return await updateVersion();
  }

  if (packageJson.version === response.value) {
    console.log(colors.red("版本号已存在，请重新输入"));
    return await updateVersion();
  }

  currentVersion = `${response.value}`;

  // 更改版本号
  const child = shell.exec(`npm version ${currentVersion} -m "chore(release): ${currentVersion}"`);
  if (child.code >= 1) {
    process.exit(1);
  }
  return;
}

async function changelog() {
  // 生成changelog，并与上次的git commit合并
  shell.exec(`npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0`);
  shell.exec(`git add CHANGELOG.md`);
  shell.exec(`git commit --amend --no-edit`);
}

// 当前的registry
let currentRegistry = "";

/**
 * 更改npm registry
 * @param reset 重置回之前的registry
 */
async function changeNpmRegistry(reset) {
  if (reset) {
    return shell.exec(`npm config set registry=${currentRegistry}`);
  }
  const child = shell.exec("npm config get registry");
  currentRegistry = child.stdout.trim();
  if (currentRegistry !== "https://registry.npmjs.org/") {
    shell.exec(`npm config set registry=https://registry.npmjs.org`);
  }
  return;
}

// 发布到npm
async function publish(target) {
  console.log("开始发布");
  return changeNpmRegistry().then(() => {
    // shell.exec(`npm pack .${target}`);
    const child = shell.exec(`npm publish .${target}`);

    if (child.code >= 1) {
      process.exit(1);
    }
    shell.exec(`curl -X PUT https://npm.taobao.org/sync/${packageJson.name}`);
  });
}

const publishNpm = async target => {
  packageJson = require(`${process.cwd()}${target}package.json`);
  return updateVersion()
    .then(() => changelog())
    .then(() => publish(target))
    .then(() => changeNpmRegistry(true))
    .then(() => pushGit())
    .then(() => {
      process.exit(0);
    });
};

module.exports = publishNpm;
