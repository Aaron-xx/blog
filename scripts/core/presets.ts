import { resolve } from 'path';

import type * as Preset from '@docusaurus/preset-classic';

export const presets = [
    [
        'classic',
        {
            docs: false,
            blog: false,
            theme: {
                customCss: resolve(__dirname, '../../src/styles/index.css'),
            },
        } satisfies Preset.Options,
    ],
];
