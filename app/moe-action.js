'use strict';

const {dialog} = require('electron'),
      MoeditorFile = require('./moe-file');

class MoeditorAction {
    static open() {
        const files = dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});

        for (var file of files) {
            moeApp.open(file);
        }
    }

    static save(w) {
        // TODO: alert on failed and not on user cancel.

        if (typeof w == 'undefined') w = require('electron').BrowserWindow.getFocusedWindow();
        if (typeof w.moeditorWindow == 'undefined') return false;

        if (typeof w.moeditorWindow.fileName == 'undefined' || w.moeditorWindow.fileName == '') {
            const fileName = dialog.showSaveDialog(w);
            if (typeof fileName == 'undefined') return false;
            try {
                // console.log(w.moeditorWindow.content);
                MoeditorFile.write(fileName, w.moeditorWindow.content);
                w.moeditorWindow.fileName = fileName;
                w.moeditorWindow.changed = false;
            } catch(e) {
                console.log('Can\'t save file: ' + e.toString());
                return false;
            }
        } else {
            try {
                MoeditorFile.write(w.moeditorWindow.fileName, w.moeditorWindow.content);
                w.moeditorWindow.changed = false;
            } catch(e) {
                console.log('Can\'t save file: ' + e.toString());
                return false;
            }
        }

        return true;
    }
}

module.exports = MoeditorAction;
