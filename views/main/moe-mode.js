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

document.addEventListener('DOMContentLoaded', function() {
    const main = document.getElementById('main');
    const modeButton = document.getElementById('button-bottom-mode');
    const rightPanel = document.getElementById('right-panel');
    const modeMenu = document.getElementById('popup-menu-mode');
    const modeMenuItems = modeMenu.getElementsByTagName('li');
    const editor = document.getElementById('editor');
    const previewer = document.getElementById('previewer');

    function setMode(m) {
        function setBaseMode(m) {
            if (m === 'write') {
                main.classList.add('write-mode');
            } else if (m === 'read') {
                main.classList.add('read-mode');
            }
        }

        main.className = '';

        if (m === 'write-wide') {
            setBaseMode('write');
            main.classList.add('write-mode-wide');
        } else if (m === 'write-medium') {
            setBaseMode('write');
            main.classList.add('write-mode-medium');
        } else if (m === 'write-narrow') {
            setBaseMode('write');
            main.classList.add('write-mode-thin');
        } else if (m === 'preview') {
            setBaseMode('preview');
            m = 'preview';
        } else if (m === 'read-wide') {
            setBaseMode('read');
            main.classList.add('read-mode-wide');
        } else if (m === 'read-medium') {
            setBaseMode('read');
            main.classList.add('read-mode-medium');
        } else if (m === 'read-narrow') {
            setBaseMode('read');
            main.classList.add('read-mode-thin');
        }

        if (window.editMode === m) return;

        for (const it of modeMenuItems) it.getElementsByClassName('fa')[0].style.opacity = (it.attributes['data-name'].value === m) ? '1' : '0';

        window.editMode = m;
        moeApp.config.set('edit-mode', m);
    }

    setMode(moeApp.config.get('edit-mode'));

    modeButton.addEventListener('click', function() {
        window.toggleMenu(modeMenu);
    });

    for (const it of modeMenuItems) it.addEventListener('click', function() {
        setMode(it.attributes['data-name'].value);
        window.editor.focus();
    })

    editor.addEventListener('transitionend', function(e) {
        if (e.target === editor && e.propertyName === 'width') window.editor.refresh();
    });

    rightPanel.addEventListener('transitionend', function(e) {
        if (e.target === rightPanel && (window.editMode.startsWith('read') || window.editMode.startsWith('preview'))) window.updatePreview();
    });
});
