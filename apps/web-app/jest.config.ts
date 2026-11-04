import { createRequire } from 'node:module'
import nextJest from 'next/jest.js'

const require = createRequire(import.meta.url)

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    setupFiles: [require.resolve('whatwg-fetch')],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.ts',
        // '<rootDir>/__mocks__/api/server.ts',
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.tsx',
        '!<rootDir>/src/**/*.stories.tsx',
        '!<rootDir>/src/pages/_document.tsx',
        '!<rootDir>/src/pages/_app.tsx',
        '!<rootDir>/src/utils/storybook/*',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/',
        '<rootDir>/cypress/',
        '<rootDir>/e2e/',
    ],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: '<rootDir>/jest.environment.cjs',
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png)$': 'identity-obj-proxy',
        '^uuid$': require.resolve('uuid', {
            paths: [require.resolve('mdx-bundler')],
        }),
    },
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
    prettierPath: require.resolve('prettier'),
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)
