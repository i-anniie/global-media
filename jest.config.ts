// import { JestConfigWithTsJest } from "ts-jest";

// const config: JestConfigWithTsJest = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom", // Ensures Jest runs tests in a browser-like environment
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file for Jest
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1", // Supports absolute imports
//   },
//   testEnvironmentOptions: {
//     customExportConditions: [""],
//   },
// };

// export default config;

import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Ensures Jest runs tests in a browser-like environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file for Jest
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Supports absolute imports
    "\\.(css|scss|png|jpg|svg)$": "identity-obj-proxy", // Mocks static assets
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Ensure JSX and TypeScript are processed
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

export default config;
