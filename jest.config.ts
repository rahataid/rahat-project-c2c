import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
    projects: await getJestProjectsAsync(),
    testMatch: ['<rootDir>/apps/**/?(*.)+(spec|test).[jt]s?(x)'],
    collectCoverage: true,  // Enable coverage collection
    coverageDirectory: '<rootDir>/coverage/apps/c2c',  // Ensure correct output path
    coverageReporters: ['lcov', 'text'],  // Generate lcov.info
});
