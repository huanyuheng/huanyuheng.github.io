const categories = ['全部', '视频生成', '图片编辑', '3D 模型', '网页生成', 'Agent 工具'];

const tools = [
  {
    name: 'Hugging Face Spaces',
    category: '网页生成',
    description: '像 AI 应用集市一样逛公开 Demo，适合寻找新模型和灵感。',
    tags: ['Demo', '开源', '工具集市'],
    useCase: '发现各种 AI 小应用和可试玩模型。',
    score: 95,
    url: 'https://huggingface.co/spaces',
    status: 'verified',
  },
  {
    name: 'Wan2.2 图生视频演示',
    category: '视频生成',
    description: '把图片和提示词变成短视频，适合快速测试画面动起来的感觉。',
    tags: ['图生视频', 'Hugging Face', '短片'],
    useCase: '把静态图片做成内容号短视频素材。',
    score: 91,
    url: 'https://huggingface.co/spaces/r3gm/wan2-2-fp8da-aoti-preview-2',
    status: 'demo',
  },
  {
    name: 'TripoSplat',
    category: '3D 模型',
    description: '从单张图生成 3D Gaussian 模型，适合做概念验证和游戏素材草稿。',
    tags: ['单图转 3D', 'Gaussian', '模型'],
    useCase: '快速把角色、物件参考图变成可观察的 3D 资产。',
    score: 88,
    url: 'https://huggingface.co/spaces/VAST-AI/TripoSplat',
    status: 'demo',
  },
  {
    name: 'Qwen Image Edit',
    category: '图片编辑',
    description: '用文字指令做图片编辑，适合试换风格、改细节和做封面实验。',
    tags: ['修图', 'LoRA', '图像编辑'],
    useCase: '给文章、视频封面和游戏设定图做快速改稿。',
    score: 87,
    url: 'https://huggingface.co/spaces/prithivMLmods/Qwen-Image-Edit-2511-LoRAs-Fast',
    status: 'demo',
  },
  {
    name: 'Ideogram',
    category: '图片编辑',
    description: '偏设计感的图像生成与排版工具，适合做带文字的视觉稿。',
    tags: ['海报', '文字排版', '生图'],
    useCase: '做栏目封面、社媒配图和视觉标题。',
    score: 84,
    url: 'https://huggingface.co/spaces/ideogram-ai/ideogram4',
    status: 'demo',
  },
  {
    name: 'Browser Use',
    category: 'Agent 工具',
    description: '让 AI 操作网页的开发工具，适合研究浏览器 Agent 和自动化流程。',
    tags: ['Agent', '浏览器', '自动化'],
    useCase: '让 AI 打开网页、读取信息、执行多步浏览器任务。',
    score: 86,
    url: 'https://browser-use.com/',
    status: 'verified',
  },
  {
    name: '豆包',
    category: '视频生成',
    description: '字节跳动旗下 AI 助手，适合聊天、搜索、P 图和视频创作尝试。',
    tags: ['中文', '视频', '语音'],
    useCase: '中文内容创作、资料整理、图片和视频灵感生成。',
    score: 89,
    url: 'https://www.doubao.com/',
    status: 'verified',
  },
  {
    name: 'Kimi',
    category: 'Agent 工具',
    description: '长文本、研究和 Agent 工作流能力强，适合资料整理和复杂任务。',
    tags: ['中文', '研究', 'Agent'],
    useCase: '整理长文档、做研究、拆任务和生成内容草稿。',
    score: 90,
    url: 'https://www.kimi.com/',
    status: 'verified',
  },
  {
    name: '通义千问',
    category: '网页生成',
    description: '阿里旗下 AI 助手，覆盖搜索、写作、PPT、网页总结等常见工作流。',
    tags: ['中文', '办公', '搜索'],
    useCase: '日常写作、搜索总结、汇报材料和网页内容整理。',
    score: 85,
    url: 'https://www.qianwen.com/',
    status: 'verified',
  },
  {
    name: '可灵 AI',
    category: '视频生成',
    description: '面向创作者的图像和视频生成平台，适合测试镜头和短片画面。',
    tags: ['视频', '图生视频', '创作者'],
    useCase: '做短视频片段、产品视觉和剧情画面草稿。',
    score: 88,
    url: 'https://klingai.com/',
    status: 'pending',
  },
  {
    name: 'Gemma Diffusion Website Builder',
    category: '网页生成',
    description: '观察 AI 生成网页的实验项目，适合找网页原型灵感。',
    tags: ['网页', '代码生成', '实验'],
    useCase: '看 AI 如何把提示词变成网页界面。',
    score: 78,
    url: 'https://huggingface.co/spaces/huggingface-projects/diffusiongemma-codegen',
    status: 'demo',
  },
  {
    name: 'PitchFight AI',
    category: 'Agent 工具',
    description: 'AI 创业 pitch 练习场，适合把一个想法拿去被压力测试。',
    tags: ['创业', '对战', '练习'],
    useCase: '练习项目表达、发现商业想法里的漏洞。',
    score: 76,
    url: 'https://huggingface.co/spaces/build-small-hackathon/PITCHFIGHT_AI',
    status: 'demo',
  },
];

const statusLabels = {
  verified: '已确认',
  demo: '试玩',
  pending: '待确认',
};

const state = {
  query: '',
  category: '全部',
};

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function toolMatchesQuery(tool, query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;

  const haystack = [
    tool.name,
    tool.category,
    tool.description,
    tool.useCase,
    ...tool.tags,
  ].join(' ').toLowerCase();

  return haystack.includes(normalizedQuery);
}

function filterTools(toolList, filters = {}) {
  const query = filters.query || '';
  const category = filters.category || '全部';

  return toolList.filter((tool) => {
    const categoryMatches = category === '全部' || tool.category === category;
    return categoryMatches && toolMatchesQuery(tool, query);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderTagList(tags) {
  return tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
}

function renderCategories() {
  const container = document.querySelector('#category-list');
  if (!container) return;

  container.innerHTML = categories.map((category) => {
    const isActive = category === state.category;
    const count = category === '全部'
      ? tools.length
      : tools.filter((tool) => tool.category === category).length;

    return `
      <button class="category-button${isActive ? ' is-active' : ''}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${isActive}">
        <span>${escapeHtml(category)}</span>
        <b>${count}</b>
      </button>
    `;
  }).join('');
}

function renderFeatured() {
  const container = document.querySelector('#featured-card');
  if (!container) return;

  const featured = tools.find((tool) => tool.name === 'Wan2.2 图生视频演示') || tools[0];
  container.innerHTML = `
    <div class="featured-orbit" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
    <div>
      <p class="card-kicker">${escapeHtml(featured.category)} / ${escapeHtml(statusLabels[featured.status])}</p>
      <h3>${escapeHtml(featured.name)}</h3>
      <p>${escapeHtml(featured.description)}</p>
      <div class="tag-list">${renderTagList(featured.tags)}</div>
    </div>
    <a class="link-button" href="${escapeHtml(featured.url)}" target="_blank" rel="noreferrer">
      打开试玩
      <span aria-hidden="true">↗</span>
    </a>
  `;
}

function renderTools() {
  const grid = document.querySelector('#tool-grid');
  const empty = document.querySelector('#empty-state');
  const count = document.querySelector('#result-count');
  if (!grid || !empty || !count) return;

  const matches = filterTools(tools, state);
  count.textContent = `当前显示 ${matches.length} / ${tools.length} 个工具`;
  empty.hidden = matches.length > 0;

  grid.innerHTML = matches.map((tool) => `
    <article class="tool-card">
      <div class="tool-card-top">
        <div class="tool-icon" aria-hidden="true">${escapeHtml(tool.category.slice(0, 1))}</div>
        <span class="status status-${escapeHtml(tool.status)}">${escapeHtml(statusLabels[tool.status])}</span>
      </div>
      <h3>${escapeHtml(tool.name)}</h3>
      <p>${escapeHtml(tool.description)}</p>
      <div class="tag-list">${renderTagList(tool.tags)}</div>
      <div class="tool-meta">
        <span>${escapeHtml(tool.useCase)}</span>
        <strong>${tool.score}</strong>
      </div>
      <a class="tool-link" href="${escapeHtml(tool.url)}" target="_blank" rel="noreferrer">
        进入展品
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  `).join('');
}

function sync() {
  renderCategories();
  renderTools();
}

function bindEvents() {
  const search = document.querySelector('#tool-search');
  const categoryList = document.querySelector('#category-list');
  const submitButton = document.querySelector('.submit-button');

  if (search) {
    search.addEventListener('input', (event) => {
      state.query = event.target.value;
      renderTools();
    });
  }

  if (categoryList) {
    categoryList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      state.category = button.dataset.category;
      sync();
    });
  }

  if (submitButton) {
    submitButton.addEventListener('click', () => {
      submitButton.textContent = '先逛展厅';
      window.setTimeout(() => {
        submitButton.innerHTML = '<span aria-hidden="true">+</span> 提交工具';
      }, 1300);
    });
  }
}

function init() {
  renderFeatured();
  sync();
  bindEvents();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}

if (typeof module !== 'undefined') {
  module.exports = {
    categories,
    filterTools,
    normalize,
    tools,
  };
}
