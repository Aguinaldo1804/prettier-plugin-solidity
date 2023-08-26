const FULL_TEST = Boolean(process.env.FULL_TEST);
const TEST_STANDALONE = Boolean(process.env.TEST_STANDALONE);
const testMatch = [
  '<rootDir>/tests/format/**/jsfmt.spec.js',
  '<rootDir>/tests/unit/**/*.test.js'
];

if (TEST_STANDALONE) {
  testMatch.push('<rootDir>/tests/integration/**/*.test.js');
}

export default {
  // runner: 'jest-light-runner',
  collectCoverage: !TEST_STANDALONE && FULL_TEST,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!<rootDir>/node_modules/',
    '!src/prettier-comments/**/*.ts'
  ],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFiles: ['<rootDir>/tests/config/setup.js'],
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-snapshot-serializer-ansi'
  ],
  testEnvironment: 'node',
  // ignore console warnings in TEST_STANDALONE
  silent: TEST_STANDALONE,
  testPathIgnorePatterns: TEST_STANDALONE
    ? [
        // Standalone mode doesn't have default options.
        // This has been reported https://github.com/prettier/prettier/issues/11107
        'tests/format/RespectDefaultOptions'
      ]
    : [],
  testMatch,
  extensionsToTreatAsEsm: ['.ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
