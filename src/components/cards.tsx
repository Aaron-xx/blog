/* eslint-disable global-require */
import React, { FC, ReactNode, useState } from 'react';

import { motion } from 'framer-motion';

import clsx from 'clsx';
import Link from '@docusaurus/Link';

import $styles from './cards.module.css';
import { LandingFadeIn } from './fadein';

const variants = {
    hidden: { opacity: 0 },
    active: { opacity: 1 },
};

export const LandingCard: FC<{
    className?: string;
    // icon: ReactNode;
    title: 'linux' | 'driver';
    alt?: string;
    children?: ReactNode;
}> = ({ children, className, alt, title }) => {
    const [hovering, setHovering] = useState(false);
    return (
        <div
            className={clsx(
                $styles.counterBorder,
                'tw-w-[calc(100%_-_0px)] tw-h-[25rem] sm:!tw-w-[30.5rem] sm:tw-h-[22rem]',
            )}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <motion.i
                initial="hidden"
                animate={hovering ? 'active' : 'hidden'}
                variants={variants}
                aria-hidden="true"
            />
            <div className={clsx($styles.card, className)}>
                <div className={$styles.title}>
                    <div className="tw-flex tw-relative">
                        <div
                            className={clsx(
                                $styles.titleBg,
                                title === 'linux'
                                    ? 'tw-from-[#FF3358] tw-to-[#FF4FD8]'
                                    : 'tw-from-[#4EBFFF] tw-to-[#BD69FF]',
                            )}
                        />
                        <div className={$styles.titleContent}>
                            {title === 'linux' ? 'Linux 使用' : '驱动'}
                        </div>
                    </div>
                </div>
                {children && <div className={$styles.content}>{children}</div>}
            </div>
        </div>
    );
};
export const LandingCards: FC = () => {
    return (
        <div className={$styles.cardList}>
            <LandingFadeIn delay={0.1} className="tw-w-full sm:tw-w-auto">
                <LandingCard title="linux" alt="Linux 使用" className={$styles.cardBg}>
                    <ul>
                        <li>
                            <Link href="/linux">Linux 使用</Link>
                        </li>
                        <li>
                            <Link href="/linux">Linux 基本使用</Link>
                        </li>
                        <li>
                            <Link href="/linux">Linux 进阶使用</Link>
                        </li>
                        <li>
                            <Link href="/linux">Linux 运维</Link>
                        </li>
                    </ul>
                    {/* <div className={$styles.cardBtn}>
                        <Link
                            className="tw-btn tw-text-[color:hsl(var(--nc)/var(--tw-text-opacity))] hover:tw-text-[color:hsl(var(--nc)/var(--tw-text-opacity))]"
                            href="/linux"
                        >
                            加入3R
                        </Link>
                    </div> */}
                </LandingCard>
            </LandingFadeIn>
            <LandingFadeIn delay={0.2} className="tw-w-full sm:tw-w-auto">
                <LandingCard title="driver" alt="驱动" className={$styles.cardBg}>
                    <ul>
                        <li>
                            <Link href="/driver">驱动、移植基础</Link>
                        </li>
                        <li>
                            <Link href="/driver">U-boot 驱动和移植</Link>
                        </li>
                        <li>
                            <Link href="/driver">Linux 内核驱动和移植</Link>
                        </li>
                        <li>
                            <Link href="/driver">移植实例</Link>
                        </li>
                    </ul>
                    {/* <div className={$styles.cardBtn}>
                        <Link className="tw-btn tw-btn-outline" href="/driver">
                            立即咨询
                        </Link>
                    </div> */}
                </LandingCard>
            </LandingFadeIn>
        </div>
    );
};
