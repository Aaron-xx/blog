import React from 'react';
import clsx from 'clsx';

import { FCWC, LayoutProps } from '@site/src/types';

import type { Props } from '@theme/BlogLayout';


import BackToTopButton from '@theme/BackToTopButton';

import { Dock } from '../../components/dock';

import $styles from './layout.module.css';
import { dockItems } from '@site/src/config/common';
import { Layout } from '@site/src/layout/layout';
import { BlogSidebar } from './sidebar';

export const BlogLayout: FCWC<Props & LayoutProps> = (props) => {
    const { displaySidebar = true, title, sidebar, toc, children, ...layoutProps } = props;
    const hasSidebar = sidebar && sidebar.items.length > 0;
    return (
        <Layout
            title={title}
            className="tw-bg-[url(/images/pages/site-bg.webp)] dark:tw-bg-[url(/images/pages/site-dark-bg.webp)]"
            footerClass="tw-bg-[color:var(--rf-blog-background-color)]"
            {...layoutProps}
        >
            <BackToTopButton />
            <div className="tw-w-full tw-h-full tw-bg-[color:var(--rf-blog-background-color)]">
                <div className={clsx('container')}>
                    <div className={$styles.container}>
                        <Dock data={dockItems} />

                        <main
                            className={clsx(
                                $styles.block,
                                displaySidebar ? 'md:tw-max-w-[75%]' : '',
                                'tw-flex-col tw-max-w-full',
                            )}
                            itemScope
                            itemType="http://schema.org/Blog"
                        >
                            <div className="tw-flex-auto tw-w-full"> {children}</div>
                        </main>
                        {hasSidebar && (
                            <div className={clsx($styles.block, 'md:tw-max-w-[23%] tw-w-full')}>
                                <BlogSidebar toc={toc} posts={sidebar?.items} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
