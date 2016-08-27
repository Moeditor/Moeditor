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

document.addEventListener('DOMContentLoaded', () => {
    const ipcRenderer = require('electron').ipcRenderer;

    let drags = document.getElementsByClassName('drag');

    ipcRenderer.on('pop-message', (e, arg) => {
        if (arg.type === 'error') arg.type = 'danger';
        biu(arg.content, { type: arg.type, autoHide: true, pop: true, closeButton: '<i class="fa fa-close"></i>' });

        // workaround for #electron/electron/6970
        for (let drag of drags) {
            drag.style.width = '0';
            drag.offsetHeight;
            setTimeout(() => {
                drag.style.width = ''
            }, 1000);
        }
    });
});
