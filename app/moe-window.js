'use strict';

const BrowserWindow = require('electron').BrowserWindow,
      Consts = require('./consts'),
      Console = require('console').Console;

const logger = new Console(process.stdout, process.stderr);

class MoeditorWindow {
	constructor(fileName) {
		this.window = new BrowserWindow({
            autoHideMenuBar: true,
            width: 900 * Consts.scaleFactor,
            height: 600 * Consts.scaleFactor,
            webPreferences: {
                zoomFactor: Consts.scaleFactor
            }
        });
        this.window.loadURL('file://' + Consts.path + '/browser/index.html');
        this.window.webContents.openDevTools();
	}
}

module.exports = MoeditorWindow;
