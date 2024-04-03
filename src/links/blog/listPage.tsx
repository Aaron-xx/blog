import React, { FC, useState } from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type { Props } from '@theme/BlogListPage';
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import SearchMetadata from '@theme/SearchMetadata';
import clsx from 'clsx';
import { Content } from '@theme/BlogPostPage';
import { useDeepCompareEffect } from 'ahooks';
import { isNil, orderBy } from 'lodash-es';
import Head from '@docusaurus/Head';

import { BlogLayout } from './layout';

import { BlogPostItems } from './items';

function BlogListPageMetadata(props: Props): JSX.Element {
    const { metadata } = props;
    const {
        siteConfig: { title: siteTitle, titleDelimiter },
    } = useDocusaurusContext();
    const { blogDescription, blogTitle, permalink } = metadata;
    const isBlogOnlyMode = permalink === '/';
    const title = isBlogOnlyMode ? siteTitle : blogTitle;

    return (
        <>
            <PageMetadata description={blogDescription} />
            <Head>
                {title && <title>{`${siteTitle} ${titleDelimiter} ${blogTitle.trim()}`}</title>}
            </Head>
            <SearchMetadata tag="blog_posts_list" />
        </>
    );
}

function BlogListPageContent(props: Props): JSX.Element {
    const { items, sidebar } = props;
    const [data, setData] = useState<{ content: Content }[]>([]);
    useDeepCompareEffect(() => {
        const noOrders = items.filter((item) => isNil((item.content.frontMatter as any).order));
        const orders = orderBy(
            items.filter((item) => !isNil((item.content.frontMatter as any).order)),
            (item) => (item.content.frontMatter as any).order,
            ['asc'],
        );
        setData([...orders, ...noOrders]);
    }, [items]);
    return (
        <BlogLayout sidebar={sidebar}>
            <div className="tw-w-full tw-flex-auto">
                <BlogPostItems
                    items={data.filter(({ content: BlogPostContent }) => {
                        const fm = BlogPostContent.frontMatter as any;
                        if (isNil(fm) || isNil(fm.rf_noloop)) return true;
                        return !fm.rf_noloop;
                    })}
                />
            </div>
        </BlogLayout>
    );
}

const BlogListPage: FC<Props> = (props) => (
    <HtmlClassNameProvider
        className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
    >
        <BlogListPageMetadata {...props} />
        <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
);
export default BlogListPage;
