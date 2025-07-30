# chrome crx template 浏览器插件脚手架工具

## 简介

用于快速搭建前端 chrome 插件项目的命令行工具。

## 模版

快速生成 Vue3 + TS + Vite + Pinia + Axios + Mock + ESLint + Prettier + Husky 的模板

## 特性

### 开发效率

1. 快速启动插件项目，无需繁琐配置

2. 🔨 自动化 CRX 打包

- 一条命令完成打包
- 无需浏览器手动操作
- 直接生成可安装的 CRX 文件

### 代码质量

通过 ESLint 进行代码质量检查、Prettier 统一代码风格，并使用 Husky 在 Git 提交前自动执行检查，确保代码规范性

### 项目可维护性

1. 清晰的项目结构
2. 统一的编码规范
3. 模块化的状态管理

## 安装

npm install xzx-onion-cli -g

## 版本

```bash
# 查看脚手架版本
onion -v
或
onion --version
```

## 使用

1. 直接创建项目

```bash
 # 直接创建项目
onion create
```

2. 创建指定名称的项目

```bash
 # 创建指定名称的项目
onion create my-app
```

3. 选择项目类型 为 Chrome 插件

4. 选择对应浏览器插件模版创建项目

- newtab 标签页模板
- sidebar 侧边栏模板
- popup 弹出框模板
