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

const {BrowserWindow, ipcMain} = require('electron');

let settingsWindow;

function showSettingsWindow() {
    if (typeof settingsWindow !== 'undefined') return;
    const debug = (moeApp.flag.debug | moeApp.config.get('debug')) != 0;
    const conf = {
        icon: Const.path + "/icons/Moeditor.ico",
        autoHideMenuBar: true,
        width: 600 * moeApp.config.get('scale-factor'),
        height: parseInt(275 * moeApp.config.get('scale-factor')),
        webPreferences: {
            zoomFactor: moeApp.config.get('scale-factor')
        },
        resizable: false,
        maximizable: false,
        show: debug
    };

    if (process.platform == 'darwin') conf.titleBarStyle = 'hidden-inset';
    else conf.frame = false;

    settingsWindow = new BrowserWindow(conf);
    settingsWindow.loadURL('file://' + Const.path + '/views/settings/settings.html');
    if (debug) settingsWindow.webContents.openDevTools();
    settingsWindow.webContents.on('close', () => {
        settingsWindow = undefined;
    })
}

ipcMain.on('show-settings-window', showSettingsWindow);

module.exports = showSettingsWindow;
