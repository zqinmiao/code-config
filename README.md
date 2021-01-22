# code-config

[![npm package](https://img.shields.io/npm/v/@buibis/code-config?color=brightgreen)](https://www.npmjs.com/package/@buibis/code-config)

> 工欲善其事，必先利其器。

前端编码配置集成

# 安装

> 为保证依赖的版本一致，在安装@buibis/code-config 时，同时会安装相关工具及插件，可查看 package.json 中的 dependencies。

```sh
$ npm install --save-dev @buibis/code-config
```

# 使用

> 修改了相关规则后，有可能出现不会生效的情况，这时首先尝试重启编辑器

- 相关 linter 需要配合编辑器插件进行使用，才能自动格式化代码。[代码格式化](https://github.com/zqinmiao/code-config#vscode-%E4%B8%8B-prettier-%E8%87%AA%E5%8A%A8%E6%A0%BC%E5%BC%8F%E5%8C%96)

- 编辑器配合[EditorConfig](https://editorconfig.org/)一起使用，[参考](https://github.com/zqinmiao/code-config/blob/master/docs/editor.md)

## 版本控制

- 忽略文件[.gitignore](https://help.github.com/articles/ignoring-files/)
- [自动化版本控制 CLI](https://www.npmjs.com/package/@buibis/buibis-version)

在项目根目录创建`commitlint.config.js`文件，内容如下:

```javascript
module.exports = {
  extends: ["@buibis/code-config/commitlint.config.js"],
};
```

`package.json`中增加如下配置：

```javascript
{
  "husky": {
    "hooks": {
      // npm run codecheck 为scripts中的命令
      "pre-commit": "npm run codecheck",
      "commit-msg": "cross-env-shell \"commitlint -e $HUSKY_GIT_PARAMS\""
    }
  }
}
```

## ESlint 规则

- [编辑器集成](https://eslint.org/docs/user-guide/integrations)
- 忽略文件[.eslintignore](https://eslint.org/docs/user-guide/configuring#eslintignore)

在项目根目录创建`.eslintrc.js`文件，内容如下:

### 基本规则

适用`*.js`的校验

```javascript
module.exports = {
  extends: ["./node_modules/@buibis/code-config"],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  },
};
```

### React

适用`*.{js,jsx}`的校验

```javascript
module.exports = {
  extends: ["./node_modules/@buibis/code-config", "./node_modules/@buibis/code-config/react"],
};
```

### TypeScript

适用`*.{ts,tsx,js}`的校验

```javascript
module.exports = {
  extends: ["./node_modules/@buibis/code-config", "./node_modules/@buibis/code-config/typescript"],
};
```

### TypeScript React

适用`*.{ts,tsx,js,jsx}`的校验

```javascript
module.exports = {
  extends: [
    "./node_modules/@buibis/code-config",
    "./node_modules/@buibis/code-config/react",
    "./node_modules/@buibis/code-config/typescript",
  ],
};
```

### Vue

适用`*.{js,vue}`的校验

```javascript
module.exports = {
  extends: ["./node_modules/@buibis/code-config", "./node_modules/@buibis/code-config/vue"],
};
```

### node

适用`*.{js,ts}`的校验

```javascript
module.exports = {
  env: {
    node: true,
  },
  extends: ["./node_modules/@buibis/code-config", "./node_modules/@buibis/code-config/typescript"],
};
```

## stylelint

- [编辑器集成](https://stylelint.io/user-guide/integrations/editor)
- 忽略文件[.stylelintignore](https://stylelint.io/user-guide/ignore-code#files-entirely)

在项目根目录创建`.stylelintrc.js`文件，内容如下:

```javascript
module.exports = {
  extends: ["@buibis/code-config/stylelint.js"],
  rules: {},
};
```

## Prettier

- [编辑器集成](https://prettier.io/docs/en/editors.html)
- 忽略文件[.prettierignore](https://prettier.io/docs/en/ignore.html#ignoring-files-prettierignore)

在项目根目录创建`.prettierrc.js`文件，内容如下:

```javascript
module.exports = {
  ...require("@buibis/code-config/prettier.js"),
};
```

## VScode 下 prettier 自动格式化

`.vscode/settings.json` 配置如下：

```javascript
{
  // 保存时自动格式化
  "editor.formatOnSave": true,
  // 采取prettier作为默认的格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 为包括ESLint在内的所有插件打开“自动修复”
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

## TypeScript 使用 tsconfig.json

在项目根目录创建`tsconfig.json`文件，内容如下:

```javascript
{
  "extends": "@buibis/code-config/tsconfig.json"
}
```
