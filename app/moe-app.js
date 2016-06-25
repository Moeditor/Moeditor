'use strict';

const MoeditorWindow = require('./moe-window'),
      MoeditorAction = require('./moe-action'),
      MoeditorFile = require('./moe-file'),
      shortcut = require('electron-localshortcut');

class MoeditorApplication {
	constructor() {
		this.windows = new Array();
	}

    open() {
        this.windows.push(new MoeditorWindow(''));
    }

	open(fileName) {
		this.windows.push(new MoeditorWindow(fileName));
	}

	run() {
        console.log(process.argv);
        var docs = process.argv.filter(function (s) {
            try {
                return s.substring(0, 2) !== '--' && MoeditorFile.isTextFile(s);
            } catch (e) {
                return false;
            }
        });

        if (docs.length == 0) this.open();
		else for (var i = 0; i < docs.length; i++) this.open(docs[i]);

        this.registerShortcuts();
	}

    registerShortcuts() {
        shortcut.register('Ctrl + N', () => {
            this.open();
        });

        shortcut.register('Ctrl + O', () => {
            MoeditorAction.open();
        });

        shortcut.register('Ctrl + S', () => {
            MoeditorAction.save();
        });

        shortcut.register('Ctrl + Shift + S', () => {
            MoeditorAction.saveAs();
        });
    }
}

module.exports = MoeditorApplication;
