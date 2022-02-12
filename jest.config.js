module.exports = {
    testEnvironment: "node",
    testRegex: ".*test.ts$",
    transform: { "^.+\\.ts?$": "ts-jest" },
    moduleFileExtensions: ["ts", "js", "json"],
    roots: ["<rootDir>/src/", "<rootDir>/tests/"],
    collectCoverage: false,
    coverageDirectory: "<rootDir>/coverage",
    testPathIgnorePatterns: ["/node_modules/"],
    slowTestThreshold: 10,
  }