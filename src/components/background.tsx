import clsx from 'clsx';
import React, { FC } from 'react';

import $styles from './background.module.css';

const Hero: FC = () => (
    <div className={clsx($styles.hero)}>
        <div className={$styles.heroBody} />
        <div
            style={{
                transform: 'rotateX(75deg)',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <div className={$styles.heroLines} />
        </div>
    </div>
);

export const LandingBackground: FC = () => (
    <div className={$styles.background}>
        <div
            className={$styles.backgroundBlock}
            style={{
                background:
                    'linear-gradient(180deg, var(--gradient-color-1) 0%, var(--gradient-color-2) var(--gradient-stop-1), var(--gradient-color-3) var(--gradient-stop-2), 100% transparent)',
            }}
        />
        <span className={$styles.backgroundLeftLights} />
        <span className={$styles.backgroundRightLights} />
        <span className={$styles.backgroundFirstBottom} />
        <span className={$styles.backgroundSecondBottom} />
        <Hero />
    </div>
);
