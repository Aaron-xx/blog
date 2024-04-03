import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Props } from '@theme/TOC';
import type { Props as MobileProps } from '@theme/TOCCollapsible';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import TOCIcon from '@ricons/material/ArticleRound';
import ControlIcon from '@ricons/fluent/ReadingList16Regular';
import { useDebounceEffect, useDeepCompareEffect, useResponsive } from 'ahooks';

import { isNil } from 'lodash-es';

import useRouteContext from '@docusaurus/useRouteContext';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import $styles from './style.module.css';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';
export const TOC: FC<Props> = ({ className, ...props }) => {
    const [isBlog, setIsBlog] = useState<boolean>(false);
    const context = useRouteContext();
    useEffect(() => {
        setIsBlog(context.plugin.name === 'docusaurus-plugin-content-blog');
    }, [context]);
    return isBlog ? (
        <div className="tw-w-full lg:tw-block tw-hidden">
            <div className={clsx('blogBlock', $styles.container)}>
                <div className="blogBlockTitle tw-p-2 tw-hidden md:tw-flex">
                    <span>
                        <span className="xicon">
                            <TOCIcon />
                        </span>
                    </span>
                    <span>目录</span>
                </div>
                <div className={clsx($styles.tableOfContents, 'thin-scrollbar', className)}>
                    <TOCItems
                        {...props}
                        linkClassName={LINK_CLASS_NAME}
                        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className={clsx($styles.docTableOfContents, 'thin-scrollbar', className)}>
            <TOCItems
                {...props}
                linkClassName={LINK_CLASS_NAME}
                linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
            />
        </div>
    );
};
export const MobileToc: FC<MobileProps> = ({
    toc,
    className,
    minHeadingLevel,
    maxHeadingLevel,
}) => {
    const [show, setShow] = useState<boolean>(false);
    const toggleDisplay = useCallback(() => setShow((state) => !state), []);
    const responsive = useResponsive();
    const resp = ExecutionEnvironment.canUseDOM && responsive;
    const ref = useRef<HTMLDivElement | null>(null);
    const [x, setX] = useState<number>(0);
    const style = useMemo<Record<string, any>>(
        () => ({
            '--translate-x': show ? 0 : `${x}px`,
            '--control-rotate': show ? 'rotate(45deg)' : 'rotate(0)',
        }),
        [resp, show, x],
    );
    useDeepCompareEffect(() => {
        if (!isNil(ref.current)) {
            const rect = ref.current.getBoundingClientRect();
            setX(rect.width);
        }
    }, [ref.current, resp]);
    useDebounceEffect(
        () => {
            setShow(false);
        },
        [],
        { wait: 10 },
    );
    return (
        <div className={$styles.mobileWrapper} style={style}>
            <div className={$styles.mobileBtn} onClick={toggleDisplay}>
                <span className="xicon">
                    <ControlIcon />
                </span>
            </div>
            <div ref={ref} className={clsx('blogBlock', $styles.container)}>
                <div className="blogBlockTitle tw-p-2 tw-hidden md:tw-flex">
                    <span>
                        <span className="xicon">
                            <TOCIcon />
                        </span>
                    </span>
                    <span>目录</span>
                </div>
                <div className={clsx($styles.tableOfContents, 'thin-scrollbar', className)}>
                    <TOCItems
                        toc={toc}
                        minHeadingLevel={minHeadingLevel}
                        maxHeadingLevel={maxHeadingLevel}
                    />
                </div>
            </div>
        </div>
    );
};
