const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        projectId: 'qwg648',
        specPattern: 'cypress/e2e',
        experimentalFetchPolyfill: true,
        supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
        setupNodeEvents(on, config) {},
    },
})
