import React, { FC } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/BlogPostPaginator';

import { Paginator } from '../../paginator';

export const BlogPostPaginator: FC<Props> = ({ prevItem, nextItem }) => (
    <Paginator
        aria={translate({
            id: 'theme.blog.post.paginator.navAriaLabel',
            message: 'Blog post page navigation',
            description: 'The ARIA label for the blog posts pagination',
        })}
        previous={
            nextItem && {
                ...nextItem,
                subLabel: (
                    <Translate
                        id="theme.blog.post.paginator.olderPost"
                        description="The blog post button label to navigate to the newer/previous post"
                    >
                        Older Post
                    </Translate>
                ),
            }
        }
        next={
            prevItem && {
                ...prevItem,
                subLabel: (
                    <Translate
                        id="theme.blog.post.paginator.newerPost"
                        description="The blog post button label to navigate to the newer/previous post"
                    >
                        Newer Post
                    </Translate>
                ),
            }
        }
    />
);
