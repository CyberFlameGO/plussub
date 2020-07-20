module.exports = {
  // testRunner: 'jest-circus/runner',  // Disabled because of memory leaks https://github.com/facebook/jest/issues/7274
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^ReduxConfig$': '<rootDir>/test/reduxConfig'
  },
  testRegex: 'test/.*(test|spec)\\.(js|ts)$',
  // transformIgnorePatterns: [
  //   '<rootDir>/node_modules/(?!(vue-virtual-scroller|apollo-link|aws-amplify|vuetify|@tts-intern/capacitor-nfc))'
  // ],
};