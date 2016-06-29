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

const MoeditorFile = require('../app/moe-file.js');

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

    var w = require('electron').remote.getCurrentWindow();
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
        extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList' }
    });

    const onscroll = function(self, other) {
        var percentage = self.scrollTop / (self.scrollHeight - self.offsetHeight);
        other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);

        if (percentage >= 1) $('.cover-bottom').addClass('cover-nobackground');
        else $('.cover-bottom.cover-nobackground').removeClass('cover-nobackground');
    }

    const onchange = function() {
        const content = editor.getValue();
        w.moeditorWindow.content = content;
        // console.log(w.moeditorWindow.content);
        w.moeditorWindow.changed = true;
        var mathRenderer = new MoeditorMathRenderer(content);
        const replaced = mathRenderer.replace();
        const html = marked(replaced);
        $('#previewer').html(mathRenderer.render(html));

        onscroll($('.CodeMirror-vscrollbar')[0], $('#previewer-wrapper')[0]);
    };
    editor.on('change', onchange);
    onchange();
    w.moeditorWindow.changed = false;

    $('.CodeMirror-vscrollbar').on('scroll', function(e) { $('#previewer-wrapper').off('scroll'), onscroll(this, $('#previewer-wrapper')[0]); });
    $('#previewer-wrapper').on('scroll', function(e) { $('.CodeMirror-vscrollbar').off('scroll'), onscroll(this, $('.CodeMirror-vscrollbar')[0]); });

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

	const remote = require('electron').remote;
	remote.getCurrentWindow().show();
});
