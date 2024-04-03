import type { Props } from '@theme/Layout';
import { ComponentType, FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';

export type FCWC<P extends Record<string, any> = Record<string, any>> = FunctionComponent<
    P & { children?: ReactNode }
>;
export interface SiteDataType {
    owner?: {
        name: string;
        avatar?: string;
        signature?: string;
    };
    beian?: {
        prefix: string;
        code: string;
    };
}

export interface DockItem {
    name: string;
    icon: ComponentType<any>;
    href?: string;
    target?: string;
    onClick?: (props: DockItem) => void;
}

export interface LinkType {
    name: string;
    logo: string;
    desc?: string;
    href: string;
    target?: string;
}
export interface LinkCategory {
    name: string;
    links: LinkType[];
}

export interface CourseCollection {
    title: string;
    summray: string;
    items: CourseItemType[];
}

export interface CourseItemType {
    name: string;
    href: string;
    price?: number;
    isFree?: boolean;
    description?: string;
    color?: 'success' | 'danger' | 'info';
    status?: 0 | 1 | 2;
    image?: string;
    target?: string;
}

export interface ProjectLinkType {
    type: 'source' | 'doc' | 'site' | 'frontend' | 'admin' | 'client';
    url: string;
}

export interface ProjectItemType {
    image: string;
    name: string;
    links?: ProjectLinkType[];
    desc?: string;
    status?: 0 | 1 | 2 | 3 | 4 | 5;
    stage?: string;
    owner?: boolean;
    docs?: string;
    tags?: string[];
}

export interface Techbadge {
    label: string;
    logo: string;
}

export interface CarouselItemType {
    image: string;
    mobileImage?: string;
    link: string;
    darkBg?: boolean;
    title?: string;
    description?: string;
    target?: HTMLAttributeAnchorTarget;
}

export interface WorksPageInfoType {
    title?: string;
    description?: string;
}

export interface BlogButtonType {
    title: string;
    icon: ComponentType<any>;
    link: string;
    desc?: string;
    target?: string;
}

export interface LayoutProps extends Props {
    footerClass?: string;
    containerNav?: boolean;
    className?: string;
    skipToContent?: boolean;
    displaySidebar?: boolean;
}

export type TipPage = 'blog' | 'doc' | 'works' | 'link' | 'home' | 'works2';
export interface TipItem {
    id: string;
    enabled?: boolean;
    content: string;
    color?: 'info' | 'secondary' | 'success' | 'warning' | 'danger';
    pages?: Array<TipPage> | 'all';
    closeable?: boolean;
    closeTime?: number;
    center?: boolean;
}
