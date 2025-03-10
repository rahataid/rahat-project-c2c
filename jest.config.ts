import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
    projects: await getJestProjectsAsync(),
    testMatch: ['<rootDir>/apps/**/?(*.)+(spec|test).[jt]s?(x)'],

});