怎么建博客
你直接在 `_posts` 里新建一个文件：
`2025-12-06-build-blog.md`

内容就用下面这一整段 markdown（包含 front matter）：

````markdown
---
layout: post
title: "从零到自己的博客：域名、GitHub Pages、博客和网址库"
date: 2025-12-06
---

今天终于把自己的个人主页 + 博客折腾起来了，中间踩了不少小坑，这里做一个完整记录，方便以后自己回顾，也希望能帮到以后想搭博客的自己。

---

## 1. 域名和 GitHub Pages 绑定

### 1.1 购买域名

- 在腾讯云买了自己的域名：`huanyuheng.com`  
- 在 DNS 解析控制台里添加解析记录。

### 1.2 域名验证（TXT 记录）

GitHub 需要先验证我对域名的所有权，在仓库设置里添加自定义域名时，会给出一条 TXT 记录，例如：

- 主机记录：`_github-pages-challenge-xxxx`
- 记录值：`一串很长的 token`

我在腾讯云 DNS 里：

1. 新增 **TXT 记录**，把 GitHub 给的主机记录和记录值填进去；
2. 等待一会儿，在 GitHub 里点“Check again”，显示验证通过。

### 1.3 CNAME 到 GitHub Pages

之后，在腾讯云 DNS 再添加一个 **CNAME 记录**：

- 主机记录：`@`（或者空）
- 记录值：`huanyuheng.github.io`

GitHub 仓库这边，在根目录新建 `CNAME` 文件，内容只有一行：

```text
huanyuheng.com
````

这样 `huanyuheng.com` 就指向了 `huanyuheng.github.io` 的 GitHub Pages 服务。

---

## 2. 建立 GitHub Pages 仓库和博客

### 2.1 创建仓库

GitHub 上新建了一个公开仓库：

* 仓库名：`huanyuheng.github.io`（必须和用户名对应）

最开始只是放了一个简单的 `index.html`，验证 GitHub Pages 部署正常。

### 2.2 启用 Jekyll 博客功能

我想要的是 **博客形式**，而不是单页面，于是用 GitHub 自带的 Jekyll + `minima` 主题：

1. 新建 `_config.yml`，配置大致如下：

   ```yml
   title: 幻欲恒
   description: 个人博客 · 学习与科研记录
   theme: minima

   # 顶部导航显示的页面
   header_pages:
     - index.md
     - links.md
     - about.md
     - archive.md
   ```

2. 新建首页 `index.md` 作为博客主页：

   ```md
   ---
   layout: home
   title: 幻欲恒的博客
   ---

   这里会更新我的学习与研究记录。
   ```

3. 在 `_posts/` 目录里新建第一篇文章，比如：

   ```md
   ---
   layout: post
   title: "第一篇博客"
   ---

   这里是我的第一篇文章，用来确认博客发布流程正常。
   ```

提交后，主页自动显示出了 **Posts 列表**，第一篇文章点击也能打开，这一步说明博客结构跑通了。

---

## 3. 网址库（links）

我希望有一个专门的“网址笔记库”，把常用的网站整理在一个页面里，点一下就能跳转。

新建 `links.md`：

```md
---
layout: page
title: 网址库
permalink: /links/
---

## 学习
- [Google Scholar](https://scholar.google.com/){:target="_blank"}
- [Zotero](https://www.zotero.org/){:target="_blank"}

## 科研/工具
- [GitHub](https://github.com/){:target="_blank"}
- [Overleaf](https://www.overleaf.com/){:target="_blank"}

## 娱乐
- [哔哩哔哩](https://www.bilibili.com/){:target="_blank"}
```

这里用了：

```md
{:target="_blank"}
```

让外部链接在 **新标签页** 打开，而不是把博客当前页面替换掉。

---

## 4. 加侧边栏和导航

原始的 `minima` 主题是只有上方导航，没有侧边栏的。我想要一个左侧导航栏，可以放：

* 首页 / 网址库 / 关于 / 归档
* 快速入口：GitHub、B 站等

### 4.1 自定义布局

我新增了一个自定义布局 `default.html`，替换主题默认布局，让所有页面都套用自己的结构：

* 顶部是醒目的导航条
* 中间是 **左侧侧边栏 + 右侧内容**

### 4.2 侧边栏 `_includes/sidebar.html`

侧边栏的内容集中放在这里，以后要改导航，改这一份就行，例如：

```html
<nav class="sidebar-nav">
  <div class="sidebar-section">
    <div class="sidebar-title">导航</div>
    <a class="sidebar-link" href="{{ "/" | relative_url }}">首页</a>
    <a class="sidebar-link" href="{{ "/links/" | relative_url }}">网址库</a>
    <a class="sidebar-link" href="{{ "/about/" | relative_url }}">关于</a>
    <a class="sidebar-link" href="{{ "/archive/" | relative_url }}">归档</a>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-title">快速入口</div>
    <a class="sidebar-link" target="_blank" href="https://github.com/huanyuheng">GitHub</a>
    <a class="sidebar-link" target="_blank" href="https://www.bilibili.com">哔哩哔哩</a>
  </div>
</nav>
```

这样，我可以很方便地把常用网站放在左边导航中。

### 4.3 自定义样式 `assets/css/style.scss`

为了让侧边栏固定在左侧，而正文区域更舒服，我创建了自定义样式文件，例如：

```scss
---
---

@import "minima";

/* 布局：左侧侧边栏 + 右侧内容 */
.site-shell{
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 28px 18px 10px 18px;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 22px;
}

/* 侧边栏样式 */
.site-sidebar{
  position: sticky;
  top: 70px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fafafa;
  padding: 14px 14px 6px 14px;
}

/* 正文宽度控制 */
.site-main .content-wrapper{
  max-width: 820px;
  width: 100%;
}
```

还有顶部导航的加粗、高亮等等，就不一一展开。

---

## 5. 以后怎么发新博客和维护

折腾完这些之后，日常使用就非常简单了：

### 5.1 发新博客

1. 在 `_posts/` 里新建文件：`YYYY-MM-DD-标题.md`
2. 内容模板：

   ```md
   ---
   layout: post
   title: "文章标题"
   ---

   正文内容……
   ```

提交以后，首页 `Posts` 区域会自动出现新文章。

### 5.2 维护网址库

* 只要编辑 `links.md`，按 Markdown 格式继续往下面加条目即可；
* 想要新标签页打开，就在链接后加 `{:target="_blank"}`。

### 5.3 导航 / 侧边栏

* 顶部导航：由 `_config.yml` 的 `header_pages` 控制；
* 左侧导航：改 `_includes/sidebar.html` 就能全部生效。

---

## 6. 小结

今天做完的事情大概有：

1. 买域名并和 GitHub Pages 绑定成功；
2. 使用 Jekyll + minima 主题搭建了一个完整的博客结构；
3. 建好了一个“网址库”页面，方便集中管理常用网站；
4. 自定义了布局：顶部导航 + 左侧侧边栏；
5. 解决了链接在新标签页打开的问题；
6. 整理了以后发博客、更新网址库的固定流程。

接下来，这个站可以用来做：

* γ 源定位 / 超表面 / 微型光谱等方向的**研究笔记**；
* 自己常用工具、文献网站、软件的**网址整理**；
* 以后也可以加“日记 / 随笔 / 教程”等模块，把它当成一个长期维护的**个人知识库**。

总之，今天算是把基础设施搭起来了，后面要做的，就是持续往里面“填内容”。

```

你把这个文件保存到 `_posts` 目录下，提交后博客首页就会出现这篇总结。
::contentReference[oaicite:0]{index=0}
```
