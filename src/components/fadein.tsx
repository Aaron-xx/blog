import { motion, useInView } from 'framer-motion';
import React, { FC, ReactNode, useRef } from 'react';

export const LandingFadeIn: FC<{
    className?: string;
    noVertical?: boolean;
    delay?: number;
    viewTriggerOffset?: boolean;
    children?: ReactNode;
}> = ({ children, className, noVertical, delay, viewTriggerOffset }) => {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: viewTriggerOffset ? '-128px' : '0px',
    });

    const fadeUpVariants = {
        initial: {
            opacity: 0,
            y: noVertical ? 0 : 24,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.div
            ref={ref}
            animate={inView ? 'animate' : 'initial'}
            variants={fadeUpVariants}
            className={className}
            initial={false}
            transition={{
                duration: 1,
                delay: delay || 0,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
        >
            {children}
        </motion.div>
    );
};
