---
layout: page
title: 网站库
permalink: /links/
---

<div class="links-hero">
  <div>
    <p class="links-kicker">常用网址</p>
    <h1>效率、学习与灵感小站</h1>
    <p class="links-sub">收藏常用工具，也顺手放一个二次元图片收藏区。</p>
  </div>
  <div class="links-hero-actions">
    <a class="link-chip" href="https://github.com/huanyuheng" target="_blank">GitHub</a>
    <a class="link-chip" href="https://chatgpt.com" target="_blank">ChatGPT</a>
    <a class="link-chip" href="https://www.bilibili.com" target="_blank">哔哩哔哩</a>
  </div>
</div>

<div class="link-sections">
  <section class="link-card">
    <div class="link-card-header">
      <h2>学习</h2>
      <p>文献、资料查找</p>
    </div>
    <div class="link-card-grid">
      <a class="link-button" href="https://scholar.google.com" target="_blank">Google Scholar</a>
      <a class="link-button" href="https://www.zotero.org" target="_blank">Zotero</a>
    </div>
  </section>

  <section class="link-card">
    <div class="link-card-header">
      <h2>科研 / 工具</h2>
      <p>协作、排版与托管</p>
    </div>
    <div class="link-card-grid">
      <a class="link-button" href="https://github.com" target="_blank">GitHub</a>
      <a class="link-button" href="https://www.overleaf.com" target="_blank">Overleaf</a>
    </div>
  </section>

  <section class="link-card">
    <div class="link-card-header">
      <h2>AI / 办公</h2>
      <p>提升效率的小工具</p>
    </div>
    <div class="link-card-grid">
      <a class="link-button" href="https://chatgpt.com" target="_blank">ChatGPT</a>
      <a class="link-button" href="https://claude.ai" target="_blank">Claude</a>
    </div>
  </section>

  <section class="link-card">
    <div class="link-card-header">
      <h2>娱乐</h2>
      <p>放松休闲</p>
    </div>
    <div class="link-card-grid">
      <a class="link-button" href="https://www.bilibili.com" target="_blank">哔哩哔哩</a>
    </div>
  </section>
</div>

<section class="gallery-card">
  <div class="gallery-card-header">
    <div>
      <p class="links-kicker">二次元图片收藏区</p>
      <h2>小小图库</h2>
      <p class="links-sub">在这里展示喜欢的插画，后台可以继续增加收藏。</p>
    </div>
    <div class="gallery-badge">可以在后台新增图片</div>
  </div>

  {% assign gallery_list = site.data.gallery | default: [] %}
  {% if gallery_list.size > 0 %}
  <div class="gallery-grid">
    {% for item in gallery_list %}
      <div class="gallery-item">
        <div class="gallery-thumb" style="background-image: url('{{ item.url }}');"></div>
        <div class="gallery-meta">
          <div class="gallery-title">{{ item.title | default: "未命名" }}</div>
          {% if item.source %}
            <a class="gallery-source" href="{{ item.source }}" target="_blank">来源</a>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
  {% else %}
    <p class="gallery-empty">还没有收藏图片，去后台添加一张吧。</p>
  {% endif %}
</section>
