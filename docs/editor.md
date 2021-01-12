# 编辑器及配置

VSCode 插件

| 名称                      | ID                         | 地 址                                                                                  | 介绍                          |
| ------------------------- | -------------------------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| EditorConfig for VS Code  | editorconfig.editorconfig  | [地址](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)  | [介绍](#editorconfig)         |
| ESLint                    | dbaeumer.vscode-eslint     | [地址](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)     | ESLint 插件                   |
| Prettier - Code formatter | esbenp.prettier-vscode     | [地址](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)     | Prettier 插件                 |
| stylelint                 | stylelint.vscode-stylelint | [地址](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) | stylelint 插件                |
| GitLens                   | eamodio.gitlens            | [地址](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)            | 增强 vscode 中内置的 Git 功能 |

## [EditorConfig](https://editorconfig.org/)

EditorConfig 有助于在不同的编辑器和 ide 中为同一项目工作的多个开发人员维护一致的编码样式。EditorConfig 项目包括一个用于定义编码样式的文件格式和一个文本编辑器插件集合，这些插件使编辑器能够读取文件格式并遵循定义的样式。EditorConfig 文件易于阅读，与版本控制系统配合得很好。

使用 VSCode 需要安装[对应插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)，WebStorm 用户无需安装任何插件。然后将以下配置复制到项目根目录的`.editorconfig`文件。

### .editorconfig

```sh
# 必须在序言中指定。设置为true可停止在当前文件上搜索.editorconfig文件。该值不区分大小写。
root = true

[*]
# 设置为latin1，utf-8，utf-8-bom，utf-16be或utf-16le可控制字符集。不建议使用utf-8-bom。
charset = utf-8
# 缩进是采用tab 还是 空格，不区分大小写
indent_style = space
# 设置为整数，定义每个缩进级别使用的列数和软选项卡的宽度。不区分大小写
indent_size = 2
# 设置为lf，cr或crlf以控制换行符的表示方式。该值不区分大小写。
end_of_line = lf
# 设置为true以确保文件在保存时以换行符结尾，为false以确保不以换行符结尾。
insert_final_newline = true
# 设置为true会删除文件中换行符之前的所有空白字符，而设置为false会确保不会删除所有空白字符。
trim_trailing_whitespace = true


[*.md]
trim_trailing_whitespace = false

```

### EditorConfig、ESLint、Prettier 三者的优先级

Prettier > EditorConfig > ESLint

#### 以缩进距离为例：

.prettierrc

```javascript
module.exports = {
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 使用 6 个空格缩进
  tabWidth: 6,
};
```

.editorconfig

```sh
root = true
[**]

# 项目中采用 space 作为代码缩进样式
indent_style = space
# 使用 2 个空格缩进
indent_size = 2
```

.eslintrc.js

```javascript
module.exports = {
  rules: {
    indent: ["error", 2],
  },
};
```

且，vscode 下设置为所有插件打开自动修复。

```javascript
{
  // 为包括 ESLint 在内的所有插件打开“自动修复”
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

最终结果：

- 生效的规则为「prettier」
- 不设置 prettier 的 tabWidth 属性。生效的则是 editorConfig。

由此可以推断出：Prettier > EditorConfig > ESLint

> `不推荐让ESLint参与过多的样式处理，样式相关的处理交给Prettier`
>
> `如若遇到eslint与prettier冲突，请参考此文档排查规则：https://github.com/prettier/eslint-config-prettier#curly`
