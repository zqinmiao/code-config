const shell = require("shelljs");
const prompts = require("prompts");
const colors = require("colors");

const packageJson = require("../package.json");

/**
 * 生成build文件夹及相关文件
 */
// async function build() {
//   console.log("build......");
//   shell.rm("-rf", "build");
//   shell.mkdir("build");
//   shell.cp("index.js", "build");
//   shell.cp("react.js", "build");
//   shell.cp("typescript.js", "build");
//   shell.cp("vue.js", "build");
//   shell.cp("tsconfig-build.json", "build/tsconfig.json");
//   shell.cp("prettier.js", "build");
//   shell.cp("stylelint.js", "build");
//   shell.cp("package.json", "build");
//   shell.cp("README.md", "build");
//   return shell.exec("cd build");
// }

let currentVersion = `v${packageJson.version}`;

/**
 * 将当前版本作为一个新标签提交至远程仓库
 */
async function pushGit() {
  shell.exec(`git tag -a ${currentVersion} -m "release: ${currentVersion}"`);
  shell.exec(`git push origin ${currentVersion}`);
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
    )}\n版本号：`,
  });

  if (packageJson.version === response.value) {
    console.log(colors.red("版本号已存在！"));
    process.exit(1);
  }
  currentVersion = `v${response.value}`;
  return shell.exec(`npm version ${response.value} -m "release: ${response.value}"`);
}

let currentRegistry = "";

/**
 * 更改npm registry
 * @param reset 重置回之前的registry
 */
async function changeNpmRegistry(reset?: boolean) {
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

async function publish() {
  console.log("开始发布");
  return changeNpmRegistry().then(() => {
    shell.exec(`npm publish --registry http://registry.npmjs.org`);
    shell.exec(`curl -X PUT https://npm.taobao.org/sync/${packageJson.name}`);
  });
}

updateVersion()
  .then(() => publish())
  .then(() => changeNpmRegistry(true))
  .then(() => pushGit())
  .then(() => {
    process.exit(0);
  });

export {};
