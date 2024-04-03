/* eslint-disable global-require */
/* eslint-disable unused-imports/no-unused-vars */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { useBlogPost, useLocalPathname } from '@docusaurus/theme-common/internal';
import { blogPostContainerID } from '@docusaurus/utils-common';
import MDXContent from '@theme/MDXContent';
import EditThisPage from '@theme/EditThisPage';
import type { Props } from '@theme/BlogPostItem';

import { isNil } from 'lodash-es';

import Image from '@theme/IdealImage'

import styles from './item.module.css';
import { useBanner } from '@site/src/hooks/useBanner';
import { MainExcerpt, Tags } from './tags';

export const BlogPostItem: FC<Props> = (props) => {
    const { children } = props;
    const { frontMatter, assets, metadata, isBlogPostPage = false } = useBlogPost();
    const { date, formattedDate, tags, title, editUrl, authors, hasTruncateMarker } = metadata;
    const truncatedPost = !isBlogPostPage && hasTruncateMarker;
    const {
        rf_comment: enableComment = false,
        rf_excerpt: enableExcerpt = true,
        rf_header: showHeader = true,
        rf_showTitle: showTitle = true,
    } = frontMatter as any;
    const tagsExists = tags.length > 0;
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
    const pathname = useLocalPathname();
    const banner = useBanner(frontMatter, assets);

    return (
        <>
            <article
                className={clsx('tw-panel', styles.main, { '!tw-pt-0': !isNil(banner) })}
                itemProp="blogPost"
                itemScope
                itemType="http://schema.org/BlogPosting"
            >
                {!isNil(banner) && (
                    <div className={styles.headerImg}>
                        <Image img={banner} />
                    </div>
                )}
                {showHeader && (
                    <header>
                        {showTitle && (
                            <TitleHeading className={styles.title} itemProp="headline">
                                {title}
                            </TitleHeading>
                        )}
                        {tagsExists && (
                            <div className="tw-mb-2">
                                <Tags data={tags} />
                            </div>
                        )}
                        <div className="tw-w-full tw-mb-6">
                            {enableExcerpt && (
                                <MainExcerpt
                                    authors={authors}
                                    date={date}
                                    formattedDate={formattedDate}
                                    pathname={pathname}
                                    enableComment={enableComment}
                                />
                            )}
                        </div>
                    </header>
                )}

                <div
                    // This ID is used for the feed generation to locate the main content
                    id={isBlogPostPage ? blogPostContainerID : undefined}
                    className={clsx('markdown', styles.content)}
                    itemProp="articleBody"
                >
                    <MDXContent>{children}</MDXContent>
                </div>
                <footer
                    className={clsx(
                        'row docusaurus-mt-lg',
                        isBlogPostPage && styles.blogPostDetailsFull,
                    )}
                >
                    {(tagsExists || truncatedPost) && isBlogPostPage && editUrl && (
                        <div className="col margin-top--sm">
                            <EditThisPage editUrl={editUrl} />
                        </div>
                    )}
                </footer>
            </article>
            <div id="comment" />
        </>
    );
};
