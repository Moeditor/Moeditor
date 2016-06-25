'use strict';

const BrowserWindow = require('electron').BrowserWindow,
      dialog = require('electron').dialog,
      MoeditorAction = require('./moe-action'),
      Consts = require('./consts');

class MoeditorWindow {
	constructor(fileName) {
        this.fileName = fileName;
        this.content = '';
        this.changed = false;
		this.window = new BrowserWindow({
            autoHideMenuBar: true,
            width: 900 * Consts.scaleFactor,
            height: 600 * Consts.scaleFactor,
            webPreferences: {
                zoomFactor: Consts.scaleFactor
            },
            frame: false
        });
        this.window.moeditorWindow = this;

        this.registerEvents();

        this.window.loadURL('file://' + Consts.path + '/browser/index.html');
        this.window.webContents.openDevTools();
	}

    registerEvents() {
        this.window.on('close', function(e) {
            if (this.moeditorWindow.changed) {
                const choice = dialog.showMessageBox(
                    this,
                    {
                        type: 'question',
                        buttons: ['Yes', 'No', 'Cancel'],
                        title: 'Confirm',
                        message: 'Save changes to file?'
                    }
                );

                if (choice == 0) {
                    if (!MoeditorAction.save(this)) e.preventDefault();
                } else if (choice == 2) e.preventDefault();
            }
        });
    }
}

module.exports = MoeditorWindow;
