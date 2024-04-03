/* eslint-disable global-require */
import { SiteDataType, DockItem, TipItem } from '@site/src/types';
import React from 'react';
import Mail from '@ricons/ionicons5/Mail';
import Zhihu from '@ricons/antd/ZhihuOutlined';
import GithubAlt from '@ricons/fa/GithubAlt';

import CSDN from '@site/data/media/common/dockBtns/csdn.svg';

export const siteData: SiteDataType = {
    owner: {
        name: 'Aaron',
        avatar: '/images/site/avatar.svg',
        signature: '我的博客，记录我的成长',
    },
    // beian: {
    //     prefix: '',
    //     code: '',
    // },
};

export const dockItems: DockItem[] = [
    {
        name: '知乎',
        href: 'https://www.zhihu.com/people/pincman',
        icon: Zhihu,
        target: '_blank',
    },
    {
        name: 'CSDN',
        href: 'https://blog.csdn.net/Aaronlxx?spm=1000.2115.3001.5343',
        icon: () => <CSDN className="arco-icon"/>,
        target: '_blank',
    },
    {
        name: 'github',
        href: 'https://github.com/Aaron-xx',
        icon: GithubAlt,
        target: '_blank',
    },
    {
        name: '邮箱',
        href: 'mailto:1242129679@qq.com',
        icon: Mail,
    },
];
