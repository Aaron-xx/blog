import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useMemo } from 'react';

import { useResponsive } from 'ahooks';
import { has, isNil } from 'lodash-es';
import { useRandomIntFrom } from './useRandomInt';


const bgImages = [
    '/images/bg/blog/1.jpg',
    '/images/bg/blog/2.jpg',
    '/images/bg/blog/3.jpg',
    '/images/bg/blog/4.jpg',
    '/images/bg/blog/6.jpg',
    '/images/bg/blog/6.jpg',
    '/images/bg/blog/7.jpg',
];

export function useBanner(metadata: any, assets?: { image?: string }) {
    const { image, image_mobile: mobileImage, banner } = metadata;
    const responsive = useResponsive();
    const resp = ExecutionEnvironment.canUseDOM && responsive;
    const isMD = resp && responsive.md;
    return useMemo(() => {
        const mImage = mobileImage ?? image;
        const currentImage = isMD ? image : mImage;
        if (banner !== true) return undefined;
        if (isNil(currentImage)) return bgImages[useRandomIntFrom(0, 6)];
        const required = require(`@site/data/media/${currentImage}`);
        if (!isNil(required) && !isNil(required.default)) return required.default;
        if (!isNil(required) && has(required, 'src.src')) return required.src.src;
        return undefined;
    }, [banner, image, mobileImage, isMD]);
}