module.exports = {
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "~/src/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["tsx", "ts", "js", "json", "node"]
};
