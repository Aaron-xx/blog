import type { PluginConfig, PluginModule } from '@docusaurus/types';
import DocPlugin from '@docusaurus/plugin-content-docs';
import BlogPlugin from '@docusaurus/plugin-content-blog';
import type { Options as DocsPluginOptions } from '@docusaurus/plugin-content-docs';
import type { Options as BlogPluginOptions } from '@docusaurus/plugin-content-blog';
import { DEFAULT_OPTIONS as DefaultDocsOptions } from '@docusaurus/plugin-content-docs/lib/options.js';
import { DEFAULT_OPTIONS as DefaultBlogOptions } from '@docusaurus/plugin-content-blog/lib/options.js';

import { deepMerge } from './utils';

export const createPlugins = (
    docsOptions: DocsPluginOptions | false,
    blogOptions: BlogPluginOptions | false,
): PluginConfig[] => {
    const plugins = [
        '@docusaurus/theme-live-codeblock',
        '@docusaurus/plugin-ideal-image',
        tailwindPlugin,
    ];
    if (docsOptions) plugins.push(customDocsPlugin(docsOptions));
    if (blogOptions) plugins.push(customBlogPlugin(blogOptions));
    return plugins;
};

export const tailwindPlugin: PluginConfig = () => ({
    name: 'postcss-tailwindcss-loader',
    configurePostCss(postcssOptions) {
        postcssOptions.plugins = {
            'postcss-import': {},
            'postcss-nesting': {},
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {},
            'postcss-mixins': {},
        } as unknown as any[];
        return postcssOptions;
    },
});
export const customDocsPlugin =
    (customOptions: DocsPluginOptions): PluginModule =>
    async (context, options) => {
        const config = deepMerge(DefaultDocsOptions, options as any, 'replace');
        const docsPluginInstance = await DocPlugin(
            context,
            deepMerge(config as any, customOptions, 'replace'),
        );
        return {
            ...docsPluginInstance,
            async contentLoaded(contentLoadedArgs: any) {
                await docsPluginInstance.contentLoaded!(contentLoadedArgs);
            },
        } as unknown as PluginModule;
    };

export const customBlogPlugin =
    (customOptions: BlogPluginOptions): PluginModule =>
    async (context, options) => {
        const config = deepMerge(DefaultBlogOptions, options as any, 'replace');
        const blogPluginInstance = await BlogPlugin(
            context,
            deepMerge(config, customOptions, 'replace'),
        );
        return {
            ...blogPluginInstance,
            async contentLoaded(contentLoadedArgs: any) {
                await blogPluginInstance.contentLoaded!(contentLoadedArgs);
                const { actions, content } = contentLoadedArgs;
                const { setGlobalData } = actions;
                const { blogTags, title } = content as any;
                setGlobalData({
                    title,
                    tags: blogTags,
                    route: config.routeBasePath,
                });
            },
        } as unknown as PluginModule;
    };
