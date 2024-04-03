import { resolve } from 'path';

import type { Config, PluginConfig } from '@docusaurus/types';
import type { Options as DocsPluginOptions } from '@docusaurus/plugin-content-docs';
import type { Options as BlogPluginOptions } from '@docusaurus/plugin-content-blog';
import { DEFAULT_OPTIONS as DefaultDocsOptions } from '@docusaurus/plugin-content-docs/lib/options.js';
import { DEFAULT_OPTIONS as DefaultBlogOptions } from '@docusaurus/plugin-content-blog/lib/options.js';

import { isArray, isNil, isObject } from 'lodash-es';

import { i18n } from './i18n';
import { presets } from './presets';
import { themeConfig } from './theme';
import { createPlugins } from './plugins';
import { deepMerge } from './utils';
import { DocuOptions } from './types';

export const createDocuConfig = (options: DocuOptions): Config => {
    const { docs, blog, localSearch: localSearchOptions, ...rest } = options;
    const themes: PluginConfig[] = [];
    const docsOptions = getDocsOptions(docs ?? {});
    const blogOptions = getBlogOptions(blog ?? {});
    const localSearch = getLocalSearch(docsOptions, blogOptions, localSearchOptions);
    if (!isNil(localSearch)) themes.push(localSearch);
    let plugins: PluginConfig[] = createPlugins(
        getCustomDocsOptions(docs ?? {}),
        getCustomBlogOptions(blog ?? {}),
    );
    if (!isNil(options.plugins) && isArray(options.plugins)) {
        plugins = [...plugins, ...(options.plugins as PluginConfig[])];
    }
    return deepMerge(
        {
            title: 'Aaron Blog',
            tagline: 'the miss docusuarus theme',
            favicon: 'images/site/favicon.ico',
            url: 'https://localhost:3200',
            baseUrl: '/',
            onBrokenLinks: 'throw',
            onBrokenMarkdownLinks: 'warn',
            organizationName: 'rowfish',
            projectName: 'rowfish',
            i18n,
            presets,
            themeConfig,
            themes,
            plugins,
        },
        rest,
        'replace',
    );
};

const getLocalSearch = (
    docsOptions: DocsPluginOptions,
    blogOptions: BlogPluginOptions,
    serachOptions: DocuOptions['localSearch'],
): PluginConfig | undefined => {
    const defaultLocalSearch = {
        hashed: true,
        language: ['en', 'zh'],
        indexPages: true,
        docsRouteBasePath: docsOptions.routeBasePath,
        blogRouteBasePath: blogOptions.routeBasePath,
        docsDir: docsOptions.path,
        blogDir: blogOptions.path,
    };
    if (typeof serachOptions === 'boolean' && !serachOptions) return undefined;
    return [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        isObject(serachOptions)
            ? deepMerge(defaultLocalSearch, serachOptions, 'merge')
            : defaultLocalSearch,
    ];
};

const getDocsOptions = (options: DocsPluginOptions) =>
    deepMerge(DefaultDocsOptions, getCustomDocsOptions(options), 'replace');

const getBlogOptions = (options: BlogPluginOptions) =>
    deepMerge(DefaultBlogOptions, getCustomBlogOptions(options), 'replace');

const getCustomDocsOptions = (options: DocsPluginOptions) =>
    deepMerge(defaultCustomDocsOptions, options, 'replace');

const getCustomBlogOptions = (options: BlogPluginOptions) =>
    deepMerge(defaultBlogDocsOptions, options, 'replace');

const defaultCustomDocsOptions: DocsPluginOptions = {
    path: './data/docs',
    routeBasePath: '/',
    breadcrumbs: false,
    sidebarPath: resolve(__dirname, '../sidebars.ts'),
    // docsRootComponent: '@site/src/rowfish/theme/docs/index',
    // docRootComponent: '@site/src/rowfish/theme/docs/root/index',
    // docItemComponent: '@site/src/rowfish/theme/docs/item/index',
};

const defaultBlogDocsOptions: BlogPluginOptions = {
    path: './data/blog',
    routeBasePath: '/blog',
    postsPerPage: 8,
    blogTitle: '我的博客！',
    blogPostComponent: '@site/src/links/blog/postPage',
    blogListComponent: '@site/src/links/blog/listPage',
    blogTagsPostsComponent: '@site/src/links/blog/tagsPostsPage',
};
