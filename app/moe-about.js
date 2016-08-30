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

var aboutWindow;

function showAboutWindow() {
    if (typeof aboutWindow !== 'undefined') return;
    const debug = (moeApp.flag.debug | moeApp.config.get('debug')) != 0;
    var conf = {
        icon: Const.path + "/icons/Moeditor.ico",
        autoHideMenuBar: true,
        width: 660 * moeApp.config.get('scale-factor'),
        height: 290 * moeApp.config.get('scale-factor'),
        webPreferences: {
            zoomFactor: moeApp.config.get('scale-factor')
        },
        resizable: false,
        maximizable: false,
        show: debug
    };

    if (process.platform == 'darwin') conf.titleBarStyle = 'hidden-inset';
    else conf.frame = false;

    aboutWindow = new BrowserWindow(conf);
    aboutWindow.loadURL('file://' + Const.path + '/views/about/about.html');
    if (debug) aboutWindow.webContents.openDevTools();
    aboutWindow.webContents.on('close', () => {
        aboutWindow = undefined;
    })
}

ipcMain.on('show-about-window', showAboutWindow);

module.exports = showAboutWindow;
