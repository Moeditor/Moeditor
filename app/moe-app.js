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
      shortcut = require('electron-localshortcut');

class MoeditorApplication {
	constructor() {
		this.windows = new Array();

        // workaround for `speech-rule-engine` doesn't support both DOM and node.js
        this.mathjax = require('./moe-mathjax');
	}

    open() {
        this.windows.push(new MoeditorWindow(''));
    }

	open(fileName) {
		this.windows.push(new MoeditorWindow(fileName));
	}

	run() {
        global.Const = require('./moe-const');

        app.setName(Const.name);

        const Configstore = require('configstore');
        global.Config = new Configstore(Const.name, require('./moe-config-default'));

        global.Flag = new Object();

        console.log(process.argv);
        var docs = process.argv.filter(function (s) {
            if (s == '--debug') Flag.debug = true;

            try {
                return s.substring(0, 2) !== '--' && MoeditorFile.isTextFile(s);
            } catch (e) {
                return false;
            }
        });

        if (docs.length == 0) this.open();
		else for (var i = 0; i < docs.length; i++) {
            app.addRecentDocument(docs[i]);
            this.open(docs[i]);
        }

        if (process.platform === 'darwin') this.registerAppMenu();
        else this.registerShortcuts();
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
}

module.exports = MoeditorApplication;
