import { NavbarItem } from '@docusaurus/theme-common';

export const navItems: NavbarItem[] = [
    {
        to: '/',
        label: '主页',
        position: 'right',
        className: 'navicon home-icon',
        activeBaseRegex: '^/$',
    },
    {
        to: 'blog',
        label: '博客',
        position: 'right',
        className: 'navicon links-icon',
    },
    {
        to: '/links',
        label: '导航',
        position: 'right',
        className: 'navicon links-icon',
    },
    // {
    //     to: '/blog/about',
    //     label: '关于',
    //     position: 'right',
    //     className: 'navicon about-icon',
    // },
];
