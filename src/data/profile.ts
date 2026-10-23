export type Locale = 'en' | 'zh';

// Update both languages together when reviewing the research direction.
export const profile = {
  name: 'Ziyang Chen',
  nameZh: '陈子扬',
  email: 'ziyang-c23@mails.tsinghua.edu.cn',
  github: 'https://github.com/ziyang-c23',
  en: {
    role: 'Undergraduate · Tsinghua University',
    bio: 'I am an undergraduate at Weiyang College, Tsinghua University, studying Mathematics and Physics alongside Mechanical Engineering. My research is in embodied AI and robot learning.',
    interests: [
      'Robot Learning: Generalization and Adaptation',
      'Embodied Agents: Reasoning and Skill Coordination',
    ],
    description: 'Ziyang Chen — embodied AI and robot learning. Research, publications, and experience at Tsinghua University.',
    experience: [
      {
        title: 'EMERGE-Policy · Tsinghua University',
        role: 'Research · Advisor: Prof. Xiu Li',
        date: 'Jun. 2026 — Present',
        description: 'Research on embodied agents that coordinate heterogeneous skills for robot tasks.',
      },
      {
        title: 'ModelBest',
        role: 'Research Intern · Multimodal & Embodied Intelligence Lab',
        date: 'Jun. — Aug. 2026',
        description: 'VLA post-training and generalization, from simulation evaluation to real-robot interaction.',
      },
    ],
    education: {
      school: 'Tsinghua University',
      college: 'Weiyang College',
      degree: 'Dual Bachelor’s Degree Candidate · Mathematics and Physics + Mechanical Engineering',
      date: 'Aug. 2023 — Present',
    },
  },
  zh: {
    role: '本科生 · 清华大学',
    bio: '我是清华大学未央书院本科生，修读数理基础科学与机械工程双学位，研究方向为具身智能与机器人学习。',
    interests: [
      '机器人学习：泛化与适应',
      '具身智能体：推理与技能协同',
    ],
    description: '陈子扬，清华大学本科生，关注具身智能与机器人学习。研究成果、论文与研究经历。',
    experience: [
      {
        title: 'EMERGE-Policy · 清华大学',
        role: '研究经历 · 指导教师：李秀教授',
        date: '2026.06 — 至今',
        description: '研究通过异构技能协同完成机器人任务的具身智能体。',
      },
      {
        title: '面壁智能',
        role: '研究实习 · 多模态与具身智能实验室',
        date: '2026.06 — 2026.08',
        description: '开展 VLA 后训练与泛化研究，涵盖仿真评测与真机交互。',
      },
    ],
    education: {
      school: '清华大学',
      college: '未央书院',
      degree: '本科双学位在读 · 数理基础科学 + 机械工程',
      date: '2023.08 — 至今',
    },
  },
};

export const publication = {
  title: 'EMERGE-Policy: A Robot Mind Emerges Beyond a Single Policy',
  authors: ['Zhirui Fang', 'Qingchi Yu', 'Ziyang Chen', 'Longfei Li'],
  year: 2026,
  paper: 'https://arxiv.org/abs/2608.29896',
  project: 'https://emerge-policy.github.io/EMERGE-Policy/',
  code: 'https://github.com/EMERGE-Policy/EMERGE-Policy',
  en: {
    status: 'arXiv preprint',
    contribution: '* Equal contribution',
    summary: 'A graph-structured agentic framework for coordinating robot skills, verification, and recovery.',
    imageAlt: 'EMERGE-Policy framework: a Main Agent coordinates specialized agents and robot skills.',
  },
  zh: {
    status: 'arXiv 预印本',
    contribution: '* 共同第一作者',
    summary: '通过图结构智能体框架协调机器人技能、验证与恢复。',
    imageAlt: 'EMERGE-Policy 框架：主智能体协调专职智能体与机器人技能。',
  },
};
