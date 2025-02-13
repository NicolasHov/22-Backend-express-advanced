/** @type {import('jest')} */
const config = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/api/$1',
    },
};

export default config;
