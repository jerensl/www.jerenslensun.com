import nextJest from 'next/jest'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFiles: [require.resolve('whatwg-fetch')],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.ts',
        '<rootDir>/__mocks__/api/server.ts',
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.tsx',
        '!<rootDir>/src/pages/_document.tsx',
        '!<rootDir>/src/pages/_app.tsx',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/',
        '<rootDir>/cypress/',
    ],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    moduleNameMapper: {
        '^uuid$': require.resolve('uuid'),
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)
