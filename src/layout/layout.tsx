/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames, useColorMode } from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import { FCWC, LayoutProps } from '@site/src/types';

import { isNil } from 'lodash-es';

import './layout.module.css';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

const baseClasses = [
    'tw-bg-fixed',
    'tw-bg-no-repeat',
    'tw-bg-center',
    'tw-bg-cover',
    'tw-flex-auto',
    'tw-flex-col',
    'tw-flex',
];

const DarkModeMonitor: FCWC = ({ children }) => {
    useThemeListener();
    return <>{children}</>;
};

const useThemeListener = () => {
    const { colorMode, setColorMode } = useColorMode();
    const html = ExecutionEnvironment.canUseDOM ? document.documentElement : null;
    const observer = ExecutionEnvironment.canUseDOM
        ? new MutationObserver((mutation) => {
              const className = (mutation[0].target as any).className as string;
              if (
                  (className.includes('tw-dark') && colorMode !== 'dark') ||
                  (!className.includes('tw-dark') && colorMode === 'dark')
              ) {
                  changeDarkMode(colorMode === 'dark');
              }
          })
        : null;
    const changeDarkMode = useCallback((isDark: boolean) => {
        if (!ExecutionEnvironment.canUseDOM) return;
        if (isDark) {
            html!.classList.add('tw-dark');
            document.body.setAttribute('arco-theme', 'dark');
        } else {
            html!.classList.remove('tw-dark');
            document.body.removeAttribute('arco-theme');
        }
    }, []);

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            const localColor = localStorage.getItem('theme');
            if (isNil(localColor) || (localColor !== 'dark' && localColor !== 'light')) {
                const isSystemDark =
                    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                setColorMode(isSystemDark ? 'dark' : 'light');
            }
        }
    }, []);

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            observer!.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class'],
            });
            changeDarkMode(colorMode === 'dark');
        }
        return () => {
            if (ExecutionEnvironment.canUseDOM) {
                observer!.disconnect();
                html!.classList.remove('tw-dark');
                html!.classList.remove('home');
            }
        };
    }, [colorMode]);
};

export const Layout: FC<LayoutProps> = (props) => {
    const {
        children,
        containerNav,
        noFooter = true,
        wrapperClassName,
        title,
        description,
        className,
        footerClass,
        skipToContent = true,
    } = props;

    useKeyboardNavigation();

    return (
        <LayoutProvider>
            <DarkModeMonitor>
                <div id="main-layout" className={clsx(baseClasses, className)}>
                    <PageMetadata title={title} description={description} />

                    {skipToContent && <SkipToContent />}
                    <AnnouncementBar />
                    <Navbar containerNav={containerNav} />

                    <div
                        id={SkipToContentFallbackId}
                        className={clsx(
                            ThemeClassNames.wrapper.main,
                            // styles.mainWrapper,
                            wrapperClassName,
                        )}
                    >
                        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
                            {children}
                            {!noFooter && <Footer className={footerClass} />}
                        </ErrorBoundary>
                    </div>
                </div>
            </DarkModeMonitor>
        </LayoutProvider>
    );
};
