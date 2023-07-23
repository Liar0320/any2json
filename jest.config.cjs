module.exports = {
  //   testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  // modulePathIgnorePatterns: ["<rootDir>/packages/utils"],
  // moduleNameMapper: {
  // },
  rootDir: __dirname,
  testMatch: ["<rootDir>/packages/**/__tests__/**/XML*spec.[jt]s?(x)"],
};
