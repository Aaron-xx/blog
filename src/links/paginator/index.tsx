import React, { AriaAttributes } from 'react';
import { Tooltip } from 'react-tooltip';
import type { Props as PagiLinkProps } from '@theme/PaginatorNavLink';

import { PaginatorNavLink } from './link';

type PaginatorProps<T extends PagiLinkProps> = {
    previous?: T;
    next?: T;
    aria?: AriaAttributes['aria-label'];
};

export const Paginator = <C extends PaginatorProps<T>, T extends PagiLinkProps>(
    props: C,
): JSX.Element => {
    const { previous, next, aria } = props;
    return (
        <nav className="tw-flex tw-py-2 tw-mt-4 tw-justify-between tw-flex-wrap" aria-label={aria}>
            {previous && <PaginatorNavLink {...previous} />}
            {next && <PaginatorNavLink {...next} isNext />}
            <Tooltip id="pagi-name" />
        </nav>
    );
};
