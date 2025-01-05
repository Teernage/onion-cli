# onion-cli

![Npm 版本](https://img.shields.io/badge/onion-cli_v0.0.1-green)

## 简介

用于快速搭建前端项目的命令行工具。

## 模版

- 快速生成 Vue3 + TS + Vite + Pinia + Axios + Mock 的模板

## 安装

```bash
npm install -g onion-cli
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


```

## 命令

### init

初始化一个 onion 项目。

```bash
onion-cli init
```

### add

添加一个组件到 onion 项目中。

```bash
onion-cli add <component-name>
```

### remove

从 onion 项目中移除一个组件。

```bash
onion-cli remove <component-name>
```

### list
