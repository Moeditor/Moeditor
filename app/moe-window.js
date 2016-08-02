/*
 *  This file is part of Moeditor.
 *
 *  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
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

const BrowserWindow = require('electron').BrowserWindow,
      dialog = require('electron').dialog,
      MoeditorAction = require('./moe-action');

class MoeditorWindow {
	constructor(fileName) {
        moeApp.newWindow = this;

        this.fileName = fileName;
        this.content = '';
        this.changed = false;
        var conf = {
            icon: Const.path + "/icons/Moeditor.ico",
            autoHideMenuBar: true,
            width: 1000 * moeApp.config.get('scale-factor'),
            height: 600 * moeApp.config.get('scale-factor'),
            webPreferences: {
                zoomFactor: moeApp.config.get('scale-factor')
            },
			show: false
        };

        if (process.platform == 'darwin') conf.titleBarStyle = 'hidden-inset';
        else conf.frame = false;

		this.window = new BrowserWindow(conf);
        this.window.moeditorWindow = this;

        if (fileName) this.window.setRepresentedFilename(fileName);

        this.registerEvents();
        this.window.loadURL('file://' + Const.path + '/browser/index.html');

        if (moeApp.flag.debug | moeApp.config.get('debug')) {
            this.window.webContents.openDevTools();
        }
	}

    registerEvents() {
        this.window.on('close', function(e) {
            if (this.moeditorWindow.changed) {
                const choice = dialog.showMessageBox(
                    this,
                    {
                        type: 'question',
                        buttons: [moeApp.locale.get("yes"), moeApp.locale.get("no"), moeApp.locale.get("cancel")],
                        title: moeApp.locale.get("confirm"),
                        message: moeApp.locale.get("savequestion")
                    }
                );

                if (choice == 0) {
                    if (!MoeditorAction.save(this)) e.preventDefault();
                } else if (choice == 2) e.preventDefault();
            }

            const index = moeApp.windows.indexOf(this.moeditorWindow);
            if (index !== -1) moeApp.windows.splice(index, 1);
        });
    }
}

module.exports = MoeditorWindow;
