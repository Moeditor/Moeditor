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

let savedContent;

document.addEventListener('DOMContentLoaded', () => {
    const fs = require('fs');
    const dialog = require('electron').remote.dialog;

    window.onfocus = (e) => {
        if (w.fileName === '') return;
        fs.readFile(w.fileName, (err, res) => {
            if (err) {
                w.changed = true;
                w.window.setDocumentEdited(true);
                return;
            }
            let s = res.toString();
            if (s !== w.fileContent) {
                const option = moeApp.config.get('auto-reload');
                let flag = false;
                if (option === 'auto') flag = true;
                else if (option === 'never') flag = false;
                else {
                    flag = dialog.showMessageBox(
                        w.window,
                        {
                            type: 'question',
                            buttons: [__("Yes"), __("No")],
                            title: __("Confirm"),
                            message: __("File changed by another program, reload?")
                        }
                    ) === 0;
                }

                w.fileContent = w.content = s;

                if (!flag) {
                    w.changed = true;
                    w.window.setDocumentEdited(true);
                    return;
                }

                window.editor.setValue(s);
                w.changed = false;
                w.window.setDocumentEdited(false);
                window.updatePreview(true);
            }
        });
    };

    window.onblur = () => {
        const option = moeApp.config.get('auto-save');
        if (option === 'disabled') return;
        if (w.fileName === '') return;
        if (w.content === savedContent) return;

        fs.writeFile(w.fileName, w.content, (err) => {
            if (err) {
                w.changed = true;
                w.window.setDocumentEdited(true);
                return;
            }

            savedContent = w.content;
            w.changed = false;
            w.window.setDocumentEdited(false);
        });
    };
});
