import { createDocuConfig } from './core';
import { navItems } from './navs';

export const docusaurus = createDocuConfig({
    title: 'Aaron Blog',
    tagline: '我的博客！',
    url: 'https://example.com',
    organizationName: 'blog',
    projectName: 'myblog',
    themeConfig: {
        navbar: {
            items: navItems,
        },
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        footer: {
            copyright: `${new Date().getFullYear()} AARON`,
        },
    },
    docs: {},
    blog: {
        blogTitle: '记录关于我的学习历程！',
    },
    onBrokenLinks: "ignore",
});
