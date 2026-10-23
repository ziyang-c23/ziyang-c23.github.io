# Ziyang Chen · 陈子扬

精简的中英双语学术主页。Astro 生成静态 HTML；默认英文，中文位于 `/zh/`。

桌面内容区最大 1200px，左侧放简介、兴趣与教育，右侧放论文和研究经历。900px 及以下重新组织为纵向布局，平板简介内部保留两栏，620px 及以下全部顺序阅读。正文为 16–18px，辅助信息为 14–15px；文章正文限宽 780px。

站点标识为浅底细边框的宋体「陈」印记与低调直立的无衬线 `Ziyang` 字标，中英文一致。网页使用 `public/icons/chen-editorial-light.svg` 与 `public/icons/ziyang-wordmark.svg`；标签页使用实底 `public/icons/chen-editorial.svg`，配有 PNG 兼容图标。字形均已转为 SVG 路径，不依赖访客字体。`public/favicon.svg` 保留为标签页图标的旧地址兼容副本。

## 本地运行

使用 Node.js 24（满足 `>=22.23.4`）和 npm。

```sh
npm ci
npm run dev
```

访问终端显示的本地地址。验证生产版本：

```sh
npm run check
npm run build
npm run verify
npm run preview
```

修改内容加载或详情模板后，运行 `npm run test:content`：临时验证中英详情页与草稿隔离，完成后移除测试内容并恢复正式构建。

## 修改内容

- 姓名、简介、两条研究兴趣、研究经历和教育背景：`src/data/profile.ts`。中英文一起修改；更新研究成果时同时复核兴趣和经历时间。
- 视觉样式：`src/styles/global.css`；页面布局：`src/layouts/Base.astro`。
- 导航文字与栏目文案：`src/lib/i18n.ts`。导航保持 Home / Blogs / Projects。
- 论文状态只写已确认信息；不将预印本或投稿写成录用，不混淆个人与团队贡献。
- 官网框架图来源：[EMERGE-Policy 项目页](https://emerge-policy.github.io/EMERGE-Policy/)，原图保存在 `src/assets/emerge-framework.png`，构建时生成压缩 WebP。作者共同贡献标注同页可核验；[arXiv](https://arxiv.org/abs/2608.29896) 为论文状态来源。核对日期：2026-10-23。

### 添加博客或项目

1. 将 `templates/blog.md` 或 `templates/project.md` 复制至 `src/content/blogs/` 或 `src/content/projects/`，建议按语言建立子目录。
2. 填写标题、简介、语言、日期和 `slug`；slug 使用小写英文和连字符。
3. 翻译版本使用相同 `translationKey`，不同 `locale`，可使用不同 slug。界面语言切换会指向实际翻译；只有一种语言的文章不生成不存在的译文链接。
4. 图片放入 `public/images/` 并使用 `/images/文件名`；视频放入 `public/videos/`，提供控件、说明和必要字幕。`public/` 下的所有文件均会公开，勿放私人资料。
5. `draft: true`（或省略 draft）不进入列表、详情页或 sitemap。内容检查完成后，显式改为 `draft: false` 并构建检查。

首版内容目录为空；模板放在构建目录之外。详情模板支持 Markdown、封面、图片／视频、外部链接及中英互链，不生成示例文章。

内容目录为空时，Astro 会提示没有匹配的 Markdown 文件，这是首版空栏目的预期情况。

## 本地验收（2026-10-23）

- `npm run check`：0 errors / 0 warnings / 0 hints。
- `npm run test:content`：中英博客和项目详情页、译文切换、草稿列表／详情／sitemap 隔离通过；临时内容已清除。
- `npm run verify`：7 个正式页面（包括 404）的元信息、内部链接、资源、语言互链及 sitemap 通过。
- 排版修订后的浏览器检查：7 个页面在 320、390、620、768、900、1024、1280、1440 像素宽度共 56 项检查通过，无横向溢出或坏图。中英文桌面、平板、手机首页及空栏目完成视觉检查，语言切换和键盘焦点正常。
- 实际渲染的正文、辅助文字及链接在白底上的对比度为 14.34、6.13、6.73；文章模板另以临时长标题、中英正文、引用、列表、代码和表格进行视觉检查。宽代码／表格在各自容器内滚动，测试正文已移除。
- 桌面与手机截图、布局检查结果保存在忽略的 `artifacts/`，不属于线上发布内容。
- 当前排版截图及检查结果使用 `-v2` 文件名；旧截图保留用于对比。

## GitHub Pages

发布地址：[ziyang-c23.github.io](https://ziyang-c23.github.io/)。源码仓库：[ziyang-c23/ziyang-c23.github.io](https://github.com/ziyang-c23/ziyang-c23.github.io)。

仓库 Settings → Pages 的 Source 使用 GitHub Actions。推送 `main` 后，内置工作流会检查类型、构建、校验链接并部署 `dist/`；PR 只构建验证，不部署。部署后需回访实际页面，不以本地构建代替线上验证。

源码仓库只维护网站。无后端、访问统计、评论、私人资料自动同步或自动研究更新。`artifacts/` 是忽略的本地预览截图目录，不发布。
