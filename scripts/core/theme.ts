import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

export const themeConfig = {
    liveCodeBlock: {
        playgroundPosition: 'bottom',
    },
    docs: {
        sidebar: {
            hideable: true,
            autoCollapseCategories: true,
        },
    },
    navbar: {
        logo: {
            alt: 'avatar logo',
            src: 'images/site/logo.png',
            srcDark: 'images/site/logo-dark.png',
        },
        hideOnScroll: true,
        items: [],
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    footer: {
        copyright: `${new Date().getFullYear()} Rowfish theme`,
    },
    prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
    },
} satisfies Preset.ThemeConfig;
