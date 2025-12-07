---
layout: post
title: 可持续新增文章的博客
date: 2025-12-6- 22:31:32 +0800
---

幻欲恒 GitHub Pages 博客发布方法
> 目标：把个人站点从“单页 index.html”切换为“可持续新增文章的博客”。

---

## 一、前置条件（你现在的状态）
- 已有仓库：`huanyuheng.github.io`
- 已启用 GitHub Pages（从 `main` 分支根目录部署）
- 已绑定自定义域名（`CNAME` 文件存在）
- 域名 DNS 已指向 GitHub Pages（你用腾讯云/ DNSPod 配置过）

---

## 二、今天完成的关键改动（让博客模式生效）

### 1. 删除旧首页
**原因**：`index.html` 会优先覆盖博客首页。  
**做法**：
- 在仓库里找到 `index.html`
- Delete → Commit

### 2. 新增站点配置
**文件**：`_config.yml`  
**作用**：开启 Jekyll + 指定主题（minima）

示例（今天用的简化版）：
```yml
title: 幻欲恒
description: 个人博客
lang: zh-CN
theme: minima
