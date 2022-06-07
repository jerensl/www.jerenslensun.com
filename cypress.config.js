const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        projectId: 'qwg648',
        baseUrl: 'http://localhost:1234',
        specPattern: 'cypress/e2e',
        experimentalFetchPolyfill: true,
        supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
        setupNodeEvents(on, config) {
            // e2e testing node events setup code
        },
    },
})
