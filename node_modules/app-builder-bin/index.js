"use strict"

const path = require("path")

const nameMap = {
  "darwin": "mac",
  "win32": "win",
  "linux": "linux",
}

const suffix = nameMap[process.platform]
if (suffix == null) {
  throw new Error("Unsupported platform " + process.platform)
}

exports.appBuilderPath = process.env.USE_SYSTEM_APP_BUILDER === "true" ? "app-builder" : require(`app-builder-bin-${suffix}`).appBuilderPath
