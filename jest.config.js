module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./src/inversify.config.ts'],
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    testPathIgnorePatterns: ['.js'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    clearMocks: true,
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  }
  