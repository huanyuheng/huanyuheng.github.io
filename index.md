---
layout: default
title: 幻欲恒的博客
---

<section class="home-hero">
  <div>
    <p class="home-kicker">Welcome</p>
    <h1>最新文章</h1>
    <p class="home-sub">支持按标题和标签快速筛选，方便你快速找到想看的内容。</p>
  </div>
  <div class="home-search-wrap">
    <label for="post-search" class="home-search-label">搜索文章</label>
    <input id="post-search" class="home-search-input" type="search" placeholder="输入标题或标签，例如：博客 / CSS" aria-label="搜索文章">
  </div>
</section>

<ul class="post-list" id="post-list">
  {%- for post in site.posts -%}
  {% assign tags_text = post.tags | join: ' ' %}
  <li class="post-item" data-title="{{ post.title | downcase }}" data-tags="{{ tags_text | downcase }}">
    <span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
    <h3>
      <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
      </a>
    </h3>
    {%- if post.excerpt -%}
    <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
    {%- endif -%}
    {% if post.tags and post.tags.size > 0 %}
    <div class="post-tags">
      {% for tag in post.tags %}
      <span class="tag-chip">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
  </li>
  {%- endfor -%}
</ul>

<p class="home-empty" id="post-empty" hidden>没有找到匹配的文章，试试换个关键词。</p>
