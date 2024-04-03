import { useThemeConfig } from '@docusaurus/theme-common';

import clsx from 'clsx';
import { isNil } from 'lodash-es';
import React, { FC } from 'react';

import Link from '@docusaurus/Link';

import $styles from './footer.module.css';
import { siteData } from '../config/common';

export const Footer: FC<{ className?: string }> = ({ className }) => {
    const { footer } = useThemeConfig();
    if (!footer) {
        return null;
    }
    const { copyright } = footer as any;
    const { beian } = siteData;
    return (
        <footer className={`tw-w-full ${className ?? ''}`}>
            <div className={`container ${$styles.container}`}>
                {copyright && (
                    <div className={clsx($styles.btn, $styles.copyright)}>
                        <span>Copyright © </span>
                        <span>{copyright}</span>
                    </div>
                )}
                <div className={clsx($styles.btn, $styles.themeby)}>
                    <span>Theme by</span>
                    <Link href="/wiki/rowfish/" target="_blank" rel="noreferrer">
                        rowfish
                    </Link>
                </div>
                {!isNil(beian) && (
                    <div className={clsx($styles.btn, $styles.beian)}>
                        {/* <span>{siteData.beian.prefix}</span> */}
                        <Link
                            href="https://beian.miit.gov.cn/"
                            target="_blank"
                            rel="noreferrer"
                            style={{ letterSpacing: '0' }}
                        >
                            {beian.prefix}
                            {beian.code}
                        </Link>
                    </div>
                )}
            </div>
        </footer>
    );
};
