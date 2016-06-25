'use strict';

const app = require('electron').app,
      MoeditorApplication = require('./moe-app');

var moeApp = null;

app.on("ready", function () {
    moeApp = new MoeditorApplication();
    global.moeApp = moeApp;
	moeApp.run();
});
