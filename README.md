# onion-cli

![Npm 版本](https://img.shields.io/badge/onion-cli_v0.1.2-green)

## 🔗 相关链接

- [📘 使用文档](https://teernage.github.io/onion-cli-homepage/)
- [💻 GitHub 仓库](https://github.com/Teernage/onion-cli)
- [🐛 问题反馈](https://github.com/Teernage/onion-cli/issues)

## 简介

用于快速搭建前端项目的命令行工具。

## 模版

- 快速生成 Vue3 + TS + Vite + Pinia + Axios + Mock + ESLint + Prettier + Husky 的模板

📦 Select type:

1. Web Page (web 项目)

2. Chrome Extension (浏览器扩展)

   - 支持通过一条指令直接生成 .crx 文件，无需手动打开浏览器打包。

   - Popup Extension (工具栏弹出窗口)
   - Sidebar Extension (侧边栏面板)
   - Tab Extension (新标签页)

3. Component Library (组件库) ...待完善

## 安装

```bash
npm install xzx-onion-cli -g
```

## 使用

```bash
 # 直接创建项目
onion create

 # 创建指定名称的项目
onion create my-app


# 查看脚手架版本
onion -v
或
onion --version

# 更新脚手架到最新版本
onion update
```
