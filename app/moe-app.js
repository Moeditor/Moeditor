/*
 *  This file is part of Moeditor.
 *
 *  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
 *  Copyright (c) 2015 Thomas Brouard (for codes from Abricotine)
 *
 *  Moeditor is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Moeditor is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Moeditor. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

const MoeditorWindow = require('./moe-window'),
      MoeditorAction = require('./moe-action'),
      MoeditorFile = require('./moe-file'),
      shortcut = require('electron-localshortcut'),
      MoeditorLocale = require('./moe-locale'),
      MoeditorAbout = require('./moe-about'),
      MoeditorSettings = require('./moe-settings'),
      path = require('path');

class MoeditorApplication {
	constructor() {
		this.windows = new Array();
        this.newWindow = null;
        this.locale = new MoeditorLocale();
	}

	open(fileName) {
        if (typeof fileName === 'undefined') {
            var directory = this.config.get('last-directory');
            if (!MoeditorFile.isDirectory(directory)) directory = '';
            if (!directory) directory = process.cwd();
            this.windows.push(new MoeditorWindow(directory));
        } else {
            this.windows.push(new MoeditorWindow(fileName));
        }
	}

	run() {
        global.Const = require('./moe-const');

        app.setName(Const.name);

        const Configstore = require('configstore');
        this.config = new Configstore(Const.name, require('./moe-config-default'));
        this.Const = Const;

        this.flag = new Object();

        const a = process.argv;
        if (a[0].endsWith('electron') && a[1] == '.') a.shift(), a.shift();
        else a.shift();
        var docs = a.filter(function (s) {
            if (s == '--debug') moeApp.flag.debug = true;
            else if (s == '--about') moeApp.flag.about = true;
            else if (s == '--settings') moeApp.flag.settings = true;

            try {
                return s.substring(0, 2) !== '--' && (MoeditorFile.isTextFile(s) || MoeditorFile.isDirectory(s));
            } catch (e) {
                return false;
            }
        });

        if (moeApp.flag.about) {
            MoeditorAbout();
            return;
        }

        if (moeApp.flag.settings) {
            MoeditorSettings();
            return;
        }

        // workaround for `speech-rule-engine` doesn't support both DOM and node.js
        this.mathjax = require('./moe-mathjax');

        if (typeof this.osxOpenFile === 'string') docs.push(this.osxOpenFile);

        if (docs.length == 0) this.open();
		else for (var i = 0; i < docs.length; i++) {
            docs[i] = path.resolve(docs[i]);
            this.addRecentDocument(docs[i]);
            this.open(docs[i]);
        }

        if (process.platform === 'darwin') this.registerAppMenu();
        else this.registerShortcuts();

        this.listenSettingChanges();
	}

    registerAppMenu() {
        require('./moe-menu')(
            {
                fileNew: (w) => {
                    MoeditorAction.openNew();
                },
                fileOpen: (w) => {
                    MoeditorAction.open();
                },
                fileSave: (w) => {
                    MoeditorAction.save(w);
                },
                fileSaveAs: (w) => {
                    MoeditorAction.saveAs(w);
                },
                fileExportHTML: (w) => {
                    w.webContents.send('action-export-html');
                },
                fileExportPDF: (w) => {
                    w.webContents.send('action-export-pdf');
                },
                about: (w) => {
                    MoeditorAbout();
                }
            }
        );
    }

    registerShortcuts() {
        shortcut.register('Ctrl + N', () => {
            MoeditorAction.openNew();
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

    listenSettingChanges() {
        const ipcMain = require('electron').ipcMain;
        ipcMain.on('setting-changed', function(e, arg) {
            for (const window of moeApp.windows) {
                window.window.webContents.send('setting-changed', arg);
            }
        });
    }

    addRecentDocument(path) {
        if (MoeditorFile.isDirectory(path)) {
            this.config.set('last-directory', path);
        } else {
            this.config.set('last-directory', require('path').dirname(path));
        }
        app.addRecentDocument(path);
    }
}

module.exports = MoeditorApplication;
