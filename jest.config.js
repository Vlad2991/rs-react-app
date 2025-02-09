module.exports = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.tsx'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '**/*.test.tsx',
      '**/*.spec.tsx',
      'src/__tests__/setup.ts',
      'src/App.tsx', 
    ],
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  };
  