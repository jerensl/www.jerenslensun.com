// .storybook/manager.js

import { addons } from '@storybook/manager-api'
import { DefaultThemeDark } from './defaultTheme'

addons.setConfig({
    isFullscreen: false,
    panelPosition: 'right',
    showNav: true,
    showPanel: true,
    showToolbar: true,
    sidebar: {
        showRoots: true,
    },
    theme: DefaultThemeDark,
})
