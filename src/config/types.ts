import {
    BlogButtonType,
    CarouselItemType,
    CourseCollection,
    DockItem,
    LinkCategory,
    ProjectItemType,
    SiteDataType,
    Techbadge,
    WorksPageInfoType,
} from '@site/src/types';

// import { ProjectTagsType } from '../components/workroom/types';

export interface SiteConfig {
    meta?: SiteDataType;
    videoPosters?: Record<string, any>;
    dockItems?: DockItem[];
    courses?: CourseCollection[];
    links?: LinkCategory[];
    blog?: {
        carousels?: CarouselItemType[];
        buttons?: BlogButtonType[];
    };
    workPage?: {
        info?: WorksPageInfoType;
        projects?: ProjectItemType[];
        // tags?: ProjectTagsType;
        badges?: Techbadge[];
    };
}
