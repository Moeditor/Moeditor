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

module.exports = (cb) => {
    const template = [
        {
            label: __('File'),
            submenu: [
                {
                    label: __('New'),
                    accelerator: 'Command + N',
                    click(item, w) {
                        cb.fileNew(w);
                    }
                },
                {
                    label: __('Open') + '...',
                    accelerator: 'Command + O',
                    click(item, w) {
                        cb.fileOpen(w);
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: __('Save'),
                    accelerator: 'Command + S',
                    click(item, w) {
                        cb.fileSave(w);
                    }
                },{
                    label: __('Save as'),
                    accelerator: 'Command + Option + S',
                    click(item, w) {
                        cb.fileSaveAs(w);
                    }
                },{
                    type: 'separator'
                },{
                    label: __('Export'),
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
            label: __('Edit'),
            submenu: [
                {
                    role: 'undo',
                    label: __('Undo')
                },
                {
                    role: 'redo',
                    label: __('Redo')
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut',
                    label: __('Cut')
                },
                {
                    role: 'copy',
                    label: __('Copy')
                },
                {
                    role: 'paste',
                    label: __('Paste')
                },
                {
                    role: 'delete',
                    label: __('Delete')
                },
                {
                    role: 'selectall',
                    label: __('Select All')
                },
                {
                    type: 'separator'
                },
                {
                    label: __('Mode'),
                    submenu: [
                        {
                            label: __('Read Mode'),
                            accelerator: 'Command + Option + R',
                            click(item, focusedWindow) {
                                if (focusedWindow) cb.modeToRead(focusedWindow);
                            }
                        },
                        {
                            label: __('Write Mode'),
                            accelerator: 'Command + Option + G',
                            click(item, focusedWindow) {
                                if (focusedWindow) cb.modeToWrite(focusedWindow);
                            }
                        },
                        {
                            label: __('Preview Mode'),
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
            label: __('View'),
            role: 'view',
            submenu: [
                {
                    role: 'togglefullscreen'
                },
                {
                    label: __('Toggle Developer Tools'),
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        if (focusedWindow)
                        focusedWindow.webContents.toggleDevTools();
                    }
                },
            ]
        },
        {
            label: __('Window'),
            role: 'window',
            submenu: [
                {
                    label: __('Close'),
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
                {
                    label: __('Minimize'),
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: __('Zoom'),
                    role: 'zoom'
                },
                {
                    type: 'separator'
                },
                {
                    label: __('Bring All to Front'),
                    role: 'front'
                }
            ]
        },
        {
            label: __('Help'),
            role: 'help',
            submenu: [
                {
                    label: 'Moeditor on GitHub',
                    click() { require('electron').shell.openExternal('https://github.com/Moeditor/Moeditor'); }
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
                    label: __('About') + ' Moeditor',
                    click() {
                        cb.about();
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: __('Preference') + '...',
                    accelerator: 'Command + ,',
                    click() {
                        cb.settings();
                    }
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    label: __('Services'),
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide',
                    label: __('Hide') + ' Moeditor'
                },
                {
                    role: 'hideothers',
                    label: __('Hide Others')
                },
                {
                    role: 'unhide',
                    label: __('Show All')
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit',
                    label: __('Quit') + ' Moeditor'
                },
            ]
        });
    }

    const {Menu, MenuItem} = require('electron');
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
