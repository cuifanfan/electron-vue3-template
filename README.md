# Electron

依据 Web 组代码规范搭建的基于 Vue3 的 Electron 项目模板。

技术栈：

-   框架：vue3、electron
-   路由：vue-router4
-   组件库：elementPlus
-   状态管理：pinia、自定义 hooks
-   工具库：lodash、eCharts、axios、Tailwind CSS、less、vue-i18n
-   构建工具：electron_vite、eslint、prettier、husky
-   包管理器：pnpm、(monorepo)

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
-   [WebStorm]() + [ESLint]()

## Environment

-   Node >= 18+

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Before Coding

确保编辑器正确配置`ESlint`、`Prettier`,

<img src="./docs/images/eslint-ws.png" style="zoom:45%;" /> <img src="./docs/images/prettier-ws.png" style="zoom:45%;" />

`Ctrl + S`可在开发阶段格式化代码，`Control + Shift + I`打开控制台，`Control + R`刷新页面。

### Before Commit

1. 正确填写 Commit 信息（少量多次，按功能提交）

格式：提交类型（修改范围）+简单描述 + 空行 + 详细描述

推荐插件：`Commit Message`（WebStorm）、`Commit Message Editor`（VS Code）

常见类型：

-   feat - 新的功能点、新的需求
-   docs - 刚刚修改了文档：注释、README.md等
-   style - 不影响代码功能的修改：css样式、代码格式、eslint问题修复等
-   perf - 代码更改可以提高性能
-   refactor - 代码重构
-   test - 测试代码
-   build - 影响构建系统或外部依赖项的更改：build、package.json等
-   ci - 更改 CI 配置文件和脚本：Jenkinsfile等
-   revert - 代码回滚
-   other - 除以上所有类型外的其他提交

示例：

```text
feat(inlineDetection): 增加测点图导出功能。

提交详细描述信息（选填）
```

### Build

```shell
# For windows
$ pnpm build:win
```

```shell
# For macOS
$ pnpm build:mac
```

```shell
# For Linux
$ pnpm build:linux
```

## F&Q

### 1. Git:warning: LF will be replaced by CRLF.

```shell
# For windows
// 关闭自动转换（当前仓库仓库）
$ git config core.autocrlf false
// 关闭自动转换（全局仓库）
$ git config --global core.autocrlf false
```

### 2. 打包时卡在`transforming`

出现这种问题通常是依赖文件没能拷贝进去（无权限访问或者安装到了开发环境）。

![image-20240924152851751](./docs/images/powershell.png)
