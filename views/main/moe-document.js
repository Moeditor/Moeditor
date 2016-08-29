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

window.app = require('electron').remote.app;
window.moeApp = app.moeApp;
window.w = moeApp.newWindow;
require('electron-titlebar');

$(() => {
    const MoeditorPreview = require('./moe-preview');

    document.querySelector('#editor textarea').innerText = w.content;

    var editor = CodeMirror.fromTextArea(document.querySelector('#editor textarea'), {
        lineNumbers: false,
        mode: moeApp.config.get('math') ? 'gfm_math' : 'gfm',
        matchBrackets: true,
        theme: moeApp.config.get('editor-theme'),
        lineWrapping: true,
        extraKeys: {
            Enter: 'newlineAndIndentContinueMarkdownList',
            Home: 'goLineLeft',
            End: 'goLineRight',
            'Shift-Tab': 'indentLess'
        },
        tabSize: moeApp.config.get('tab-size'),
        indentUnit: moeApp.config.get('tab-size'),
        viewportMargin: Infinity,
        styleActiveLine: true,
        showCursorWhenSelecting: true
    });

    editor.focus();

    const scroll = require('./moe-scroll');

    window.updatePreview = (force) => {
        MoeditorPreview(editor, force, () => {
            scroll();
        });
    };

    editor.on('change', (editor, obj) => {
        window.updatePreview(false)
    });

    setTimeout(() => {
        window.updatePreview(true);
    }, 0);

    window.editor = editor;

    // workaround for the .button is still :hover after maximize window
    $('#cover-bottom .button-bottom').mouseover(function() {
        $(this).addClass('hover');
    }).mouseout(function() {
        $(this).removeClass('hover');
    }).click(function() {
        var s = $(this).data('action');
        if (s === 'menu') MoeditorSideMenu.open();
    });

    const s = require('electron').shell;

    $("#container").on('click', 'a', function(e) {
        e.preventDefault();
        s.openExternal(this.href);
    });

    const leftPanel = document.getElementById('left-panel');
    leftPanel.addEventListener('click', (e) => {
        if (e.target === leftPanel) editor.focus();
    });

    if (moeApp.config.get('focus-mode') === true) document.getElementById('editor').classList.add('focus');
    document.getElementById('button-bottom-focus').addEventListener('click', function() {
        document.getElementById('editor').classList.toggle('focus');
        moeApp.config.set('focus-mode', document.getElementById('editor').classList.contains('focus'));
    });

    require('./moe-settings');

    w.window.show();
});
