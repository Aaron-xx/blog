import { PluginOptions as LocalSearchOptions } from '@easyops-cn/docusaurus-search-local';
import type { Options as DocsPluginOptions } from '@docusaurus/plugin-content-docs';
import type { Options as BlogPluginOptions } from '@docusaurus/plugin-content-blog';

import { Config } from '@docusaurus/types';

export interface DocuOptions extends Omit<Config, 'title' | 'url' | 'baseUrl'> {
    title?: string;
    url?: string;
    baseUrl?: string;
    docs?: DocsPluginOptions;
    blog?: BlogPluginOptions;
    localSearch?: LocalSearchOptions | false;
}
