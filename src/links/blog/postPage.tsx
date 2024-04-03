import React, { FC, useMemo, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import { BlogPostProvider, useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import type { Props } from '@theme/BlogPostPage';
import type { BlogSidebar } from '@docusaurus/plugin-content-blog';

import { useDebounceEffect, useResponsive } from 'ahooks';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import { MobileToc, TOC } from '../toc';

import { BlogLayout } from './layout';
import { BlogPostItem } from './item';
import { BlogPostPaginator } from './paginator/post';

function BlogPostPageContent({
    sidebar,
    children,
}: {
    sidebar: BlogSidebar;
    children: ReactNode;
}): JSX.Element {
    const { metadata, toc } = useBlogPost();
    const { nextItem, prevItem, frontMatter } = metadata;
    const {
        rf_paginator: enablePaginator = true,
        rf_sidebar: displaySidebar,
        title,
    } = (frontMatter as any) ?? {};
    const {
        hide_table_of_contents: hideTableOfContents,
        toc_min_heading_level: tocMinHeadingLevel,
        toc_max_heading_level: tocMaxHeadingLevel,
    } = frontMatter;
    const [mobile, setMobile] = useState<boolean>(false);
    const responsive = useResponsive();
    const isLg = ExecutionEnvironment.canUseDOM && responsive.lg;
    const TocBlock = useMemo(() => {
        if (hideTableOfContents || !toc.length) return undefined;
        return mobile ? (
            <MobileToc
                toc={toc}
                minHeadingLevel={tocMinHeadingLevel}
                maxHeadingLevel={tocMaxHeadingLevel}
            />
        ) : (
            <TOC
                toc={toc}
                minHeadingLevel={tocMinHeadingLevel}
                maxHeadingLevel={tocMaxHeadingLevel}
            />
        );
    }, [mobile, toc, tocMinHeadingLevel, tocMaxHeadingLevel, hideTableOfContents]);
    useDebounceEffect(
        () => {
            setMobile(!isLg);
        },
        [isLg],
        { wait: 10 },
    );
    return (
        <BlogLayout sidebar={sidebar} displaySidebar={displaySidebar} toc={TocBlock} title={title}>
            <BlogPostItem>{children}</BlogPostItem>

            {enablePaginator && (nextItem || prevItem) && (
                <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
            )}
        </BlogLayout>
    );
}

const BlogPostPage: FC<Props> = (props: Props) => {
    const BlogPostContent = props.content;
    return (
        <BlogPostProvider content={props.content} isBlogPostPage>
            <HtmlClassNameProvider
                className={clsx(
                    ThemeClassNames.wrapper.blogPages,
                    ThemeClassNames.page.blogPostPage,
                )}
            >
                <BlogPostPageMetadata />
                <BlogPostPageContent sidebar={props.sidebar}>
                    <BlogPostContent />
                </BlogPostPageContent>
            </HtmlClassNameProvider>
        </BlogPostProvider>
    );
};
export default BlogPostPage;
