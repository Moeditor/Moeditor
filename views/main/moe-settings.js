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

const body = document.body;
const codemirror = document.querySelector('#editor > .CodeMirror');

function setEditorFont(val) {
    body.setAttribute('settings-editor-font', val);
}

function setEditorTheme(val) {
    for (const s of codemirror.classList) {
        if (s.startsWith('cm-s')) {
            codemirror.classList.remove(s);
            break;
        }
    }
    codemirror.classList.add('cm-s-' + val);
}

function setEditorFontSize(val) {
    codemirror.classList.add('notransition');
    codemirror.style.fontSize = val + 'px';
    codemirror.offsetHeight;
    codemirror.classList.remove('notransition');
    window.editor.refresh();
}

function setEditorLineHeight(val) {
    codemirror.classList.add('notransition');
    codemirror.style.lineHeight = val;
    codemirror.offsetHeight;
    codemirror.classList.remove('notransition');
    window.editor.refresh();
}

setEditorFont(moeApp.config.get('editor-font'));
setEditorTheme(moeApp.config.get('editor-theme'));
setEditorFontSize(moeApp.config.get('editor-font-size'));
setEditorLineHeight(moeApp.config.get('editor-line-height'));

const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('setting-changed', function(e, arg) {
    if (arg.key === 'editor-font') {
        setEditorFont(arg.val);
    } else if (arg.key === 'editor-theme') {
        setEditorTheme(arg.val);
    } else if (arg.key === 'editor-font-size') {
        setEditorFontSize(arg.val);
    } else if (arg.key === 'editor-line-height') {
        setEditorLineHeight(arg.val);
    }
});
