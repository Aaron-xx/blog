import React, { FC, useMemo } from 'react';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/PaginatorNavLink';

import ReactDOMServer from 'react-dom/server';
import RightArrow from '@ricons/material/KeyboardDoubleArrowRightRound';
import LeftArrow from '@ricons/material/KeyboardDoubleArrowLeftRound';

export const PaginatorNavLink: FC<Props> = (props) => {
    const { permalink, title, subLabel, isNext } = props;
    const icon = useMemo(() => (isNext ? <RightArrow /> : <LeftArrow />), [isNext]);
    return (
        <Link
            className="tw-ghostBtn tw-flex tw-w-28"
            data-tooltip-variant="dark"
            data-tooltip-html={ReactDOMServer.renderToString(<span>{title}</span>)}
            data-tooltip-id="pagi-name"
            data-tooltip-float
            to={permalink}
        >
            {!isNext && (
                <span className="tw-ghost-icon">
                    <span className="xicon">{icon}</span>
                </span>
            )}
            <span className="tw-ellips tw-flex-auto !tw-inline-block tw-text-center">
                {title || subLabel}
            </span>
            {isNext && (
                <span className="tw-ghost-icon tw-ghost-icon-right">
                    <span className="xicon">{icon}</span>
                </span>
            )}
        </Link>
    );
};
