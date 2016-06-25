'use strict';

const app = require('electron').app,
      pathModule = require('path'),
      pkg = require('../package.json'),
      appPath = app.getAppPath();

module.exports = {
    name: "Moeditor",
    path: appPath,
    scaleFactor: 1
};
