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

window.moeApp = require('electron').remote.app.moeApp;
window.w = moeApp.newWindow;

$(function() {
    const MoeditorFile = require('../../app/moe-file'),
          MoeditorPreview = require('./moe-preview');

    CodeMirror.defineMode('mathdown', function(config) {
        var options = [];
        var ref = [['$$', '$$'], ['$', '$'], ['\\[', '\\]'], ['\\(', '\\)']];
        for (var i = 0, len = ref.length; i < len; i++) {
            var x = ref[i];
            options.push({
                open: x[0],
                close: x[1],
                mode: CodeMirror.getMode(config, 'stex')
            });
        }
        console.log('mathdown', options);
        return CodeMirror.multiplexingMode.apply(CodeMirror, [CodeMirror.getMode(config, 'gfm')].concat([].slice.call(options)));
    });

    if (typeof w.fileName !== 'undefined') {
        var content = MoeditorFile.read(w.fileName, '');
        document.querySelector('#editor textarea').innerText = content;
    }

    var editor = CodeMirror.fromTextArea(document.querySelector('#editor textarea'), {
        lineNumbers: false,
        mode: 'mathdown',
        matchBrackets: true,
        // scrollbarStyle: "simple",
        theme: 'base16-light',
        lineWrapping: true,
        extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList', Home: 'goLineLeft', End: 'goLineRight' },
        tabSize: moeApp.config.get('tab-size'),
        viewportMargin: Infinity,
        styleActiveLine: true
    });

    editor.focus();

    const scroll = require('./moe-scroll');

    const onchange = function(cm, obj) {
        MoeditorPreview(cm, obj, function() {
            scroll();
        });
    };
    editor.on('change', onchange);
    setTimeout(function() {
        MoeditorPreview(editor, null, function() {
            w.changed = false;
            w.window.setDocumentEdited(false);
        });
    }, 0);

    window.editor = editor;
    window.updatePreview = function() { onchange(editor, null); };

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

    $("#previewer").on('click', 'a', function(e) {
        e.preventDefault();
        s.openExternal(this.href);
    });

    const leftPanel = document.getElementById('left-panel');
    leftPanel.addEventListener('click', function(e) {
        if (e.target === leftPanel) editor.focus();
    });

    if (moeApp.config.get('focus-mode') === true) document.getElementById('editor').classList.add('focus');
    document.getElementById('button-bottom-focus').addEventListener('click', function() {
        document.getElementById('editor').classList.toggle('focus');
        moeApp.config.set('focus-mode', document.getElementById('editor').classList.contains('focus'));
    });

    w.window.show();
});
