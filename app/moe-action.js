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

const {dialog} = require('electron'),
      MoeditorFile = require('./moe-file');

class MoeditorAction {
    static openNew() {
        moeApp.open();
    }

    static open() {
        const files = dialog.showOpenDialog(
            {
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: moeApp.locale.get("markdownDocuments"), extensions: [ 'md', 'mkd', 'markdown' ] },
                    { name: moeApp.locale.get("allFiles"), extensions: [ '*' ] }
                ]
            }
        );

        if (typeof files == 'undefined') return;

        for (var file of files) {
            app.addRecentDocument(file);
            moeApp.open(file);
        }
    }

    static save(w) {
        // TODO: alert on failed and not on user cancel.

        if (typeof w == 'undefined') w = require('electron').BrowserWindow.getFocusedWindow();
        if (typeof w.moeditorWindow == 'undefined') return false;

        if (typeof w.moeditorWindow.fileName == 'undefined' || w.moeditorWindow.fileName == '') {
            MoeditorAction.saveAs(w);
        } else {
            try {
                MoeditorFile.write(w.moeditorWindow.fileName, w.moeditorWindow.content);
                w.moeditorWindow.changed = false;
                app.addRecentDocument(w.moeditorWindow.fileName);
            } catch(e) {
                console.log('Can\'t save file: ' + e.toString());
                return false;
            }
        }

        return true;
    }

    static saveAs(w) {
        if (typeof w == 'undefined') w = require('electron').BrowserWindow.getFocusedWindow();
        if (typeof w.moeditorWindow == 'undefined') return false;

        const fileName = dialog.showSaveDialog(w,
            {
                filters: [
                    { name: moeApp.locale.get("markdownDocuments"), extensions: ['md', 'mkd', 'markdown' ] },
                    { name: moeApp.locale.get("allFiles"), extensions: [ '*' ] }
                ]
            }
        );
        if (typeof fileName == 'undefined') return false;
        try {
            // console.log(w.moeditorWindow.content);
            MoeditorFile.write(fileName, w.moeditorWindow.content);
            w.moeditorWindow.fileName = fileName;
            w.moeditorWindow.changed = false;
            app.addRecentDocument(fileName);
        } catch(e) {
            console.log('Can\'t save file: ' + e.toString());
            return false;
        }
    }

    static exportAsHTML(w, f) {
        if (typeof w == 'undefined') w = require('electron').BrowserWindow.getFocusedWindow();
        if (typeof w.moeditorWindow == 'undefined') return;

        const fileName = dialog.showSaveDialog(w,
            {
                filters: [
                    { name: moeApp.locale.get("htmlDocuments"), extensions: ['htm', 'html'] },
                ]
            }
        );
        if (typeof fileName == 'undefined') return;
        f(function(s) {
            try {
                MoeditorFile.write(fileName, s);
                const {shell} = require('electron');
                shell.openItem(fileName);
            } catch(e) {
                console.log('Can\'t save file: ' + e.toString());
            }
        });
    }

    static exportAsPDF(w, f) {
        if (typeof w == 'undefined') w = require('electron').BrowserWindow.getFocusedWindow();
        if (typeof w.moeditorWindow == 'undefined') return;

        const fileName = dialog.showSaveDialog(w,
            {
                filters: [
                    { name: moeApp.locale.get("pdfDocuments"), extensions: ['pdf'] },
                ]
            }
        );
        if (typeof fileName == 'undefined') return;
        f(function(s) {
            try {
                const exportPDF = require('./moe-pdf');
                exportPDF({ s: s, path: fileName });
            } catch(e) {
                console.log('Can\'t save file: ' + e.toString());
            }
        });
    }
}

module.exports = MoeditorAction;
