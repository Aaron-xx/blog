import { deepMerge } from '@site/scripts/core/utils';
import { SiteConfig } from './types';

export const createSiteConfig = (options: SiteConfig) =>
    deepMerge(
        {
            meta: {
                owner: {
                    name: 'Aaron',
                    avatar: '/images/site/avatar.svg',
                    signature: '我的博客',
                },
            },
            tips: [],
            bannerButtons: [],
            videoPosters: {},
            dockItems: [],
            courses: [],
            links: [],
            workPage: {
                info: { title: '案例展示', description: '' },
                projects: [],
                tags: {},
                badges: [],
            },
        },
        options,
        'merge',
    );
