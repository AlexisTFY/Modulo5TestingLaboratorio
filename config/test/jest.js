module.exports = {
  rootDir: '../../',
  preset: 'ts-jest',
  restoreMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/test/setup-after.ts'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
