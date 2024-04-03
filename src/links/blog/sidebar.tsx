/* eslint-disable global-require */
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useDeepCompareEffect } from 'ahooks';
import clsx from 'clsx';
import { isNil } from 'lodash-es';

import Link from '@docusaurus/Link';

import PostIcon from '@ricons/material/ArticleFilled';

import TagsIcon from '@ricons/antd/TagsFilled';
import Image from '@theme/IdealImage';

import $styles from './sidebar.module.css';
import { siteData } from '@site/src/config/common';
import { PostItem, TagItem } from './types';

const { owner } = siteData;
const BLogSidebarOwner: FC = () => {
    if (isNil(owner)) return null;
    return (
        <div className={clsx('blogBlock', $styles.owner)}>
            <div />
            {!isNil(owner.avatar) && (
                <div className={$styles.ownerAvatar}>
                    <Image img={owner.avatar} />
                </div>
            )}
            {!isNil(owner.signature) && (
                <div>
                    <i>{owner.signature}</i>
                </div>
            )}
        </div>
    );
};
const BlogSidebarRecentItem: FC<PostItem> = ({ title, permalink }) => {
    return (
        <Link className="tw-ellips tw-animate-decoration" href={permalink}>
            <span>{title}</span>
        </Link>
    );
};
const BlogSidebarRecent: FC<{ posts: PostItem[] }> = ({ posts }) => {
    return (
        <div className={clsx('blogBlock', $styles.posts)}>
            <div className="blogBlockTitle">
                <span>
                    <span className="xicon">
                        <PostIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </span>
                </span>
                <span>新文</span>
            </div>
            <div className={$styles.postsContent}>
                {posts.map(
                    (item, i) => i < 5 && <BlogSidebarRecentItem {...item} key={i.toFixed()} />,
                )}
            </div>
        </div>
    );
};
const BlogSidebarTags: FC = () => {
    const globalData = usePluginData('docusaurus-plugin-content-blog', 'default') as any;
    const [tags, setTags] = useState<TagItem[]>([]);
    useDeepCompareEffect(() => {
        const tagArr: TagItem[] = [];
        if (!isNil(globalData) && !isNil(globalData.tags)) {
            for (const key in globalData.tags) {
                tagArr.push(globalData.tags[key]);
            }
            setTags(tagArr);
        }
    }, [globalData]);
    if (tags.length <= 0) return null;
    return (
        <div className={clsx('blogBlock', $styles.tags)}>
            <div className="blogBlockTitle">
                <span>
                    <span className="xicon">
                        <TagsIcon onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                    </span>
                </span>
                <span>标签</span>
            </div>
            <div className={clsx('blogPostTags', $styles.tagsContent)}>
                {tags.map((item, i) => (
                    <Link href={item.permalink} key={i.toFixed()}>
                        <span>{(item as any).label}</span>
                        <span className="tagItemsCount">{item.items.length}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export const BlogSidebar: FC<{ toc?: ReactNode; posts?: PostItem[] }> = ({ toc, posts = [] }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {}, [ref.current]);
    return (
        <div ref={ref} className="tw-sticky tw-top-10">
            <BLogSidebarOwner />
            {toc}
            <BlogSidebarTags />
            <BlogSidebarRecent posts={posts} />
        </div>
    );
};
