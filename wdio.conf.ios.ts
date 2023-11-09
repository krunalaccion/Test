import path from "path";
import { defaultConfigs, CustomTestrunner } from "./wdio.conf";

function getTestOutputDir() {
  const logDir = process.env.DEVICEFARM_LOG_DIR || ".";
  return `${logDir}/test-output`;
}

function getAppPath() {
  return path.resolve(__dirname, "bin/Jobber.app");
}

const config: CustomTestrunner = {
  ...defaultConfigs,
  capabilities: [
    {
      port: 4723,
      path: "/wd/hub",
      platformName: "iOS",
      /* eslint-disable @typescript-eslint/naming-convention */
      "appium:platformVersion": "16.4",
      "appium:app": getAppPath(),
      "appium:deviceName": "iPhone 14 Pro",
      "appium:automationName": "XCUITest",
      "appium:settings": {
        snapshotMaxDepth: 62,
      },
      maxInstances: 1,
      browserName: "",
      "appium:newCommandTimeout": 180000,
      /* eslint-enable @typescript-eslint/naming-convention */
      "appium:xcodeSigningId": "iPhone Developer",
    },
  ],
  reporters: [
    [
      "spec",
      {
        showPreface: false,
      },
    ],
    [
      "junit",
      {
        outputDir: getTestOutputDir(),
        outputFileFormat: function (_) {
          return "junit.xml";
        },
      },
    ],
    [
      "json",
      {
        outputDir: getTestOutputDir(),
        outputFileFormat: function (_) {
          return "results.json";
        },
      },
    ],
  ],
};

module.exports.config = config;
