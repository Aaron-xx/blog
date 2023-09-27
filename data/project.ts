export const projects: Project[] = [
  {
    title: 'Aaron的小站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://Aaron.cn',
    source: 'https://github.com/Aaron/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: 'nest-vben-admin',
    description: '基于 NestJs + Vben Admin 编写的一款前后端分离的权限管理系统',
    preview: '/img/project/nest-vben-admin.png',
    website: 'https://admin.Aaron.cn',
    source: 'https://github.com/Aaron/nest-vben-admin',
    tags: ['opensource', 'favorite', 'product', 'large'],
    type: 'web',
  },
  {
    title: 'api-server',
    description: '🔗 基于 Nuxt 搭建的API接口服务网站',
    preview: '/img/project/kz-api.png',
    website: 'https://api.Aaron.cn',
    source: 'https://github.com/Aaron/api-service',
    tags: ['opensource', 'favorite', 'product'],
    type: 'web',
  },
  {
    title: '前端示例代码库',
    description:
      '📦 整理前端样式和功能的实现代码，可以用来寻找灵感或直接使用示例中的代码',
    preview: '/img/project/example-website.png',
    website: 'https://example.Aaron.cn',
    source: 'https://github.com/Aaron/example',
    tags: ['opensource', 'design'],
    type: 'web',
  },
  {
    title: 'JS代码混淆与还原',
    description: '基于Babel的AST操作对JavaScript代码混淆与还原的网站',
    preview: '/img/project/js-de-obfuscator.png',
    website: 'https://deobfuscator.vercel.app',
    source: 'https://github.com/Aaron/js-de-obfuscator',
    tags: ['opensource'],
    type: 'web',
  },
  {
    title: '@Aaron/http',
    description: '基于 Axios 封装的 HTTP 类库',
    website: 'https://www.npmjs.com/package/@Aaron/http',
    tags: ['opensource', 'personal'],
    type: 'personal',
  },
  {
    title: '@Aaron/utils',
    description: '整理 JavaScript / TypeScript 的相关工具函数',
    website: 'https://www.npmjs.com/package/@Aaron/utils',
    tags: ['opensource', 'personal'],
    type: 'personal',
  },
  {
    title: '@Aaron/eslint-config',
    description: '来自 antfu 的 ESLint 配置文件',
    website: 'https://github.com/Aaron/eslint-config',
    tags: ['opensource', 'personal'],
    type: 'personal',
  },
  {
    title: 'rust-wasm-md5',
    description: '🦀 Rust + WebAssembly 实现的 MD5 加密',
    website: 'https://github.com/Aaron/rust-wasm-md5',
    tags: ['opensource'],
    type: 'personal',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'large'
  | 'personal'

export type ProjectType = 'personal' | 'web' | 'app' | 'toy' | 'other'

export type Project = {
  title: string
  description: string
  preview?: any
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce((group, project) => {
  const { type } = project
  group[type] = group[type] ?? []
  group[type].push(project)
  return group
}, {} as Record<ProjectType, Project[]>)
