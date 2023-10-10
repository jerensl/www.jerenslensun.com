// .storybook/manager.js

import { addons } from '@storybook/manager-api'
import { DefaultTheme } from './defaultTheme'

addons.setConfig({
    theme: DefaultTheme,
})
