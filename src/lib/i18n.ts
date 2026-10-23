import type { Locale } from '../data/profile';

export function localizedPath(locale: Locale, path = '') {
  return `${locale === 'zh' ? '/zh' : ''}/${path ? `${path.replace(/^\/+|\/+$/g, '')}/` : ''}`;
}

export const labels = {
  en: {
    skip: 'Skip to content', interests: 'Research interests',
    publications: 'Selected publication', experience: 'Research & experience', education: 'Education',
    paper: 'Paper', project: 'Project', code: 'Code',
    blogs: 'Blogs', projects: 'Projects',
    blogsIntro: 'Notes on research and other things.', projectsIntro: 'Selected work and experiments.',
    blogsEmpty: 'No posts yet.', projectsEmpty: 'No projects here yet.',
    back: 'Back', moreAuthors: 'et al.',
  },
  zh: {
    skip: '跳转到正文', interests: '研究兴趣',
    publications: '精选论文', experience: '研究与实习经历', education: '教育背景',
    paper: '论文', project: '项目主页', code: '代码',
    blogs: '博客', projects: '项目',
    blogsIntro: '关于研究，以及其他值得记录的事。', projectsIntro: '精选作品与实验。',
    blogsEmpty: '暂无文章。', projectsEmpty: '暂无项目。',
    back: '返回', moreAuthors: '等',
  },
};
