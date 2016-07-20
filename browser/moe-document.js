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

const MoeditorFile = require('../app/moe-file'),
      MoeditorPreview = require('./moe-preview');

var w = require('electron').remote.getCurrentWindow();
var moeApp = require('electron').remote.app.moeApp;

$(function() {
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

    if (typeof w.moeditorWindow.fileName !== 'undefined') {
        var content = MoeditorFile.read(w.moeditorWindow.fileName, '');
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
        viewportMargin: Infinity
    });

    const scroll = require('./moe-scroll');

    const onchange = function(cm, obj) {
        MoeditorPreview(cm, obj, function() {
            scroll();
        });
    };
    editor.on('change', onchange);
    MoeditorPreview(editor, null, function() {
        w.moeditorWindow.changed = false;
    });

    window.editor = editor;

    // workaround for the .button is still :hover after maximize window
    $('#left-panel .cover .cover-bottom .button-bottom').mouseover(function() {
        $(this).addClass('hover');
    }).mouseout(function() {
        $(this).removeClass('hover');
    }).click(function() {
        var s = $(this).data('action');
        const MoeditorAction = require('electron').remote.require('../app/moe-action');
        if (s == 'new') MoeditorAction.openNew();
        else if (s == 'open') MoeditorAction.open();
        else if (s == 'save') MoeditorAction.save();
    });

    const s = require('electron').shell;

    $("#previewer").on('click', 'a', function(e) {
        e.preventDefault();
        s.openExternal(this.href);
    });

    w.show();
});
