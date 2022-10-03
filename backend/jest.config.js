module.exports = {
  preset: 'ts-jest',

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/__tests__/**'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // The test environment that will be used for testing
  testEnvironment: '<rootDir>/src/__tests__/base-environment.ts',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '/src/__tests__/', '/src/form/__tests__/'],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['dotenv/config'],
};
