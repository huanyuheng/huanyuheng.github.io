---
layout: page
title: 网站库
permalink: /links/
---

<div class="links-hero">
  <div>
    <p class="links-kicker">常用网址</p>
    <h1>效率、学习与灵感小站</h1>
    <p class="links-sub">收藏常用工具，并为每个站点配上图片预览。</p>
  </div>
  <div class="links-hero-actions">
    <a class="link-chip" href="https://github.com/huanyuheng" target="_blank">GitHub</a>
    <a class="link-chip" href="https://chatgpt.com" target="_blank">ChatGPT</a>
    <a class="link-chip" href="https://www.bilibili.com" target="_blank">哔哩哔哩</a>
  </div>
</div>

{% assign link_groups = site.data.links | default: [] %}

<div class="link-sections link-sections--visual">
  {% for group in link_groups %}
    <section class="link-card">
      <div class="link-card-header">
        <h2>{{ group.title }}</h2>
        <p>{{ group.desc }}</p>
      </div>
      <div class="link-card-grid link-card-grid--visual">
        {% for item in group.links %}
          <a class="link-visual" href="{{ item.url }}" target="_blank" rel="noopener">
            <div class="link-visual-thumb">
              <img src="{{ item.image }}" alt="{{ item.name }}" loading="lazy">
            </div>
            <div class="link-visual-info">
              <div class="link-visual-name">{{ item.name }}</div>
              {% if item.desc %}<div class="link-visual-desc">{{ item.desc }}</div>{% endif %}
            </div>
          </a>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
