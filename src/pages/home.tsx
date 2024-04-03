import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FC } from 'react';
import React from 'react';
import { LandingBackground } from '../components/background';
import { Dock } from '../components/dock';
import { dockItems } from '../config/common';
import { LayoutProps } from '../types';
import { LandingIntroduce } from '../components/introduce';
import clsx from 'clsx';
import { LandingCards } from '../components/cards';
import { Layout } from '../layout/layout';

const bgClasses = [
    '[--geist-foreground:#fff]',
    'dark:[--geist-foreground:#000]',
    '[--ifm-navbar-background-color:rgba(255,255,255,.85)]',
    'dark:[--rf-dock-background-color:rgba(0,0,0,0.85)]',
    'dark:[--ifm-navbar-background-color:rgba(0,0,0,.5)]',
    'dark:[--ifm-navbar-shadow:rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(255,255,255,0.1)_0px_-1px_0px_0px_inset]',
    '[--gradient-stop-1:0px]',
    '[--gradient-stop-2:120px]',
    'sm:[--gradient-stop-1:0px]',
    'sm:[--gradient-stop-2:120px]',
];

const HomePage: FC<LayoutProps> = (props) => {
    const { children, ...layoutProps } = props;
    const {
        siteConfig: { tagline },
    } = useDocusaurusContext();
    return (
        <>
        <Layout             
            className={clsx('tw-relative tw-flex tw-z-[0] dark:tw-bg-black', bgClasses)}
            title={tagline}
            footerClass="tw-bg-[color:var(--rf-blog-background-color)]"
            skipToContent={false}
            noFooter={false}
            {...layoutProps}>
            <LandingBackground/>
            <Dock data={dockItems} className="tw-shadow-nysm dark:tw-shadow-slate-50/10"/>
            <div className="tw-flex tw-flex-auto">
                <div className="tw-w-full tw-overflow-x-hidden">
                    <main className="tw-relative tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-overflow-hidden">
                        <LandingIntroduce />
                        <LandingCards />
                    </main>
                </div>
            </div>
        </Layout>
        </>
    );
};

export default HomePage;