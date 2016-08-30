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

const {BrowserWindow, ipcMain, shell} = require('electron');
const os = require('os');
const path = require('path');
const MoeditorFile = require('./moe-file');
var workerWindow, fileName, tmp, errorHandler;

function exportPDF(content, cb) {
    workerWindow = new BrowserWindow({ show: false });

    function randString(n) {
        function rand(l, r) {
            return Math.floor(Math.random() * 100000000) % (r - l + 1) + l;
        }

        var s = '';
        for (var i = 0; i < n; i++) {
            var r = rand(1, 3);
            if (r == 1) s += String.fromCharCode(rand('0'.charCodeAt(0), '9'.charCodeAt(0)));
            else if (r == 2) s += String.fromCharCode(rand('a'.charCodeAt(0), 'z'.charCodeAt(0)));
            else if (r == 3) s += String.fromCharCode(rand('A'.charCodeAt(0), 'Z'.charCodeAt(0)));
        }

        return s;
    }

    tmp = path.join(os.tmpdir(), 'Moeditor-export-' + randString(10) + '.html');
    MoeditorFile.write(tmp, content.s);
    fileName = content.path;
    errorHandler = cb;

    workerWindow.loadURL('file://' + tmp);
    // workerWindow.webContents.openDevTools();
}

ipcMain.on('ready-export-pdf', (event) => {
    setTimeout(() => {
        workerWindow.webContents.printToPDF({
            printBackground: true
        }, (error, data) => {
            MoeditorFile.writeAsync(fileName, data, (error) => {
                if (error) errorHandler(error);
                else {
                    shell.openItem(fileName);
                    workerWindow.destroy();
                    workerWindow = undefined;
                    MoeditorFile.remove(tmp);
                }
            })
        })
    }, 1000);
});

module.exports = exportPDF;
