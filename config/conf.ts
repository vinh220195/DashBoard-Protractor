import { Config } from "protractor";

/**
 * Configuration tells protractor where the test files is(spesc) 
 * and where to talk with selenium server(seleniumAddress)
 */
export let config: Config = {
  framework: "jasmine2",
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
          '..\\testcases\\manage-tests-smoke\\DB-00017.js'
  ],
  suites: {
    smoke_tests: "..\\testcases\\manage-tests-smoke\\*.js"
  },
  capabilities: {
    browserName: 'chrome'
  },
  getPageTimeout: 300000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 1440000
  }
}