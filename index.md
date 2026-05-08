---
layout: home
title: 幻欲恒的博客
---

<section class="home-hero" aria-label="站点介绍">
  <div class="home-hero-copy">
    <p class="home-eyebrow">欢迎来到我的数字花园</p>
    <h1>记录学习、科研工具与日常灵感</h1>
    <p class="home-hero-text">
      这里会整理博客搭建笔记、常用网址、研究资料和一些随手收藏的内容，
      希望每次打开都能更快找到有用的信息。
    </p>
    <div class="home-hero-actions">
      <a class="home-primary-action" href="{{ '/links/' | relative_url }}">浏览网址库</a>
      <a class="home-secondary-action" href="{{ '/archive/' | relative_url }}">查看文章归档</a>
    </div>
  </div>

  <div class="home-hero-card" aria-label="站点速览">
    <div class="home-card-title">今日速览</div>
    <div class="home-card-grid">
      <div>
        <span class="home-card-number">{{ site.posts | size }}</span>
        <span class="home-card-label">篇文章</span>
      </div>
      <div>
        <span class="home-card-number">{{ site.tags | size }}</span>
        <span class="home-card-label">个标签</span>
      </div>
    </div>
    <p class="home-card-note">持续更新博客实践、学习资源与效率工具。</p>
  </div>
</section>
