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

module.exports = function(cb) {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'Command + N',
                    click(item, w) {
                        cb.fileNew(w);
                    }
                },
                {
                    label: 'Open...',
                    accelerator: 'Command + O',
                    click(item, w) {
                        cb.fileOpen(w);
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Save',
                    accelerator: 'Command + S',
                    click(item, w) {
                        cb.fileSave(w);
                    }
                },{
                    label: 'Save As',
                    accelerator: 'Command + Option + S',
                    click(item, w) {
                        cb.fileSaveAs(w);
                    }
                },{
                    type: 'separator'
                },{
                    label: 'Export',
                    submenu: [
                        {
                            label: 'HTML...',
                            accelerator: 'Command + Option + E',
                            click(item, w) {
                                cb.fileExportHTML(w);
                            }
                        }, {
                            label: 'PDF...',
                            accelerator: 'Command + Option + P',
                            click(item, w) {
                                cb.fileExportPDF(w);
                            }
                        }
                    ]
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'pasteandmatchstyle'
                },
                {
                    role: 'delete'
                },
                {
                    role: 'selectall'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Mode',
                    submenu: [
                        {
                            label: 'Read',
                            accelerator: 'Command + Option + R',
                            click(item, focusedWindow) {
                                if (focusedWindow) cb.modeToRead(focusedWindow);
                            }
                        },
                        {
                            label: 'Write',
                            accelerator: 'Command + Option + G',
                            click(item, focusedWindow) {
                                if (focusedWindow) cb.modeToWrite(focusedWindow);
                            }
                        },
                        {
                            label: 'Preview',
                            // accelerator: 'Command + Option + P', // It's been used for `Export PDF`.
                            click(item, focusedWindow) {
                                if (focusedWindow) cb.modeToPreview(focusedWindow);
                            }
                        }
                    ]
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click(item, focusedWindow) {
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    role: 'togglefullscreen'
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        if (focusedWindow)
                        focusedWindow.webContents.toggleDevTools();
                    }
                },
            ]
        },
        {
            role: 'window',
            submenu: [
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                },
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click() { require('electron').shell.openExternal('http://electron.atom.io'); }
                },
            ]
        },
    ];

    if (process.platform === 'darwin') {
        const name = Const.name;
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About Moeditor',
                    click() {
                        cb.about();
                    }
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                },
            ]
        });
        // Window menu.
        template[3].submenu = [
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Zoom',
                role: 'zoom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        ];
    }

    const {Menu, MenuItem} = require('electron');
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
