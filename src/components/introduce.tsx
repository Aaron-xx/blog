import { isNil } from 'lodash-es';
import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Typed from 'typed.js';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Link from '@docusaurus/Link';

import Heading from '@theme/Heading';

import $styles from './introduce.module.css';
import { LandingFadeIn } from './fadein';

export const LandingIntroduce: FC = () => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const el = React.useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        let typed: Typed | undefined;
        if (!isNil(ref.current) && !isNil(el.current)) {
            typed = new Typed(ref.current, {
                stringsElement: el.current,
                typeSpeed: 50,
                backDelay: 1700,
                smartBackspace: true,
                onComplete: (self) => {
                    if (ExecutionEnvironment.canUseDOM) {
                        const cursor = document.getElementsByClassName('typed-cursor');
                        if (cursor.length) cursor[0].remove();
                    }
                },
            });
        }

        return () => {
            if (typed) typed.destroy();
        };
    }, []);

    return (
        <LandingFadeIn className={$styles.container}>
            <Heading as="h1" className={$styles.title}>
                Aaron 的博客小站
            </Heading>
            <div className={$styles.content}>
                <div className="tw-h-32 xs:tw-h-16">
                    <div ref={ref} className="tw-inline-block" />
                </div>
                <div className="tw-mt-2 xs:tw-mt-4">
                    <span className="tw-text-xl tw-text-black dark:tw-text-white tw-pt-5">
                        展示我的学习成果
                    </span>
                </div>
                <div className="tw-mt-1 xs:tw-mt-1">
                    <Link
                        className="tw-text-xl tw-font-semibold tw-text-black dark:tw-text-white tw-pt-5 tw-animate-decoration hover:!tw-bg-[size:100%_3px]"
                        href="/classroom"
                    >
                        {/* 欢迎加入🤝 */}
                    </Link>
                    {/* <span className="tw-text-xl tw-text-black dark:tw-text-white tw-pt-5">！</span> */}
                </div>
            </div>
            {ExecutionEnvironment.canUseDOM &&
                createPortal(
                    <div ref={el}>
                        <p>我的学习发展历程？</p>
                        <p>......</p>
                        <p>C C++ python shell nodejs typescript react</p>
                        <p>tf-a  optee u-boot Linux 驱动、内核裁剪移植</p>
                        <p>gcc 编译器 汇编器 链接器</p>
                        <p>我想分享一下我的所知所会，尽可能清晰明了的阐述我的学到的知识</p>
                        <p>
                            <span>
                                想你所想，做你所做
                            </span>
                        </p>
                    </div>,
                    document.body,
                )}
        </LandingFadeIn>
    );
};
