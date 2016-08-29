/*
 *  This file is part of Moeditor.
 *
 *  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
 *  Copyright (c) 2016 Wamadahama
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
    const titlebar = document.getElementById('electron-titlebar');
    const main = document.getElementById('main');
    const modeButton = document.getElementById('button-bottom-mode');
    const rightPanel = document.getElementById('right-panel');
    const modeMenu = document.getElementById('popup-menu-mode');
    const modeMenuItems = modeMenu.getElementsByTagName('li');
    const editor = document.getElementById('editor');
    const container = document.getElementById('container');

    function setMode(m) {
        function setBaseMode(bm) {
            document.body.setAttribute('settings-mode', bm);
            if (bm === 'write') {
                main.classList.add('write-mode');
                moeApp.config.set('edit-mode-write', m);
            } else if (bm === 'read') {
                main.classList.add('read-mode');
                moeApp.config.set('edit-mode-read', m);
            }
        }

        [
            'write-mode',
            'read-mode',
            'write-mode-wide',
            'write-mode-medium',
            'write-mode-thin',
            'read-mode-wide',
            'read-mode-medium',
            'read-mode-thin'
        ].forEach(x => main.classList.remove(x));

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
        document.getElementById('main').classList.remove('notransition');
        setTimeout(() => {
            document.getElementById('main').classList.add('notransition');
        }, 500);
    }

    setMode(moeApp.config.get('edit-mode'));

    modeButton.addEventListener('click', () => {
        window.toggleMenu(modeMenu);
    });

    for (const it of modeMenuItems) it.addEventListener('click', () => {
        setMode(it.attributes['data-name'].value);
        window.editor.focus();
    })

    require('electron').ipcRenderer.on('change-edit-mode', (e, arg) => {
        if (arg === 'read' || arg === 'write') setMode(moeApp.config.get('edit-mode-' + arg));
        else setMode('preview');
    });

    editor.addEventListener('transitionend', (e) => {
        if (e.target === editor && e.propertyName === 'width') window.editor.refresh();
    });

    rightPanel.addEventListener('transitionend', (e) => {
        if (e.target === rightPanel && (window.editMode.startsWith('read') || window.editMode.startsWith('preview'))) window.updatePreview(true);
    });
});
