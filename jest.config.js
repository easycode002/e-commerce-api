const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require("./tsconfig.json");
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: 'e-commerce/src/' }),  // Add this line
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/database/repositories/*.ts','src/middlewares/**/*.ts','src/controllers/**/*.ts'],
};

// 'src/controllers/**/*.ts', 'src/services/**/*.ts',