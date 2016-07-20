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

function lookup(a, x) {
    var l = 0, r = a.length - 1;
    while (l != r) {
        var mid = l + (r - l) / 2 | 0;
        if (a[mid] > x) r = mid;
        else l = mid + 1;
    }
    if (l >= a.length) return a.length;
    return l;
}

var previewer = document.getElementById('previewer'), previewerWrapper = document.getElementById('previewer-wrapper');
var editorScroll = $('.CodeMirror-vscrollbar')[0], previewerScroll = previewerWrapper;
function getLineNumberTags() {
    // from http://stackoverflow.com/questions/9496427/get-elements-by-attribute-when-queryselectorall-is-not-available-without-using-l
    var a = previewer.getElementsByTagName('moemark-linenumber');
    window.lineNumberTags = new Array(window.lineNumbers.length);

    for (var i = 0; i < a.length; i++) {
        var x = a[i].getAttribute('i');
        if (typeof window.lineNumberTags[x] === 'undefined') {
            window.lineNumberTags[x] = a[i];
        }
    }
}

function buildScrollMap() {
    getLineNumberTags();
    window.scrollMap = new Array(2);
    window.scrollMap[0] = new Array(window.lineNumbers.length + 1);
    window.scrollMap[1] = new Array(window.lineNumbers.length + 1);
    const topOffset = previewer.getBoundingClientRect().top;
    for (var i = 0; i < window.lineNumbers.length; i++) {
        window.scrollMap[0][i] = window.editor.heightAtLine(window.lineNumbers[i], 'local');
        window.scrollMap[1][i] = window.lineNumberTags[window.lineNumbers[i]].getBoundingClientRect().top - topOffset;
    }
    window.scrollMap[0][window.lineNumbers.length] = editorScroll.scrollHeight - editorScroll.clientHeight;
    window.scrollMap[1][window.lineNumbers.length] = previewerWrapper.scrollHeight - previewerWrapper.clientHeight;
    window.scrollMap[0][0] = window.scrollMap[1][0] = 0;
}

function mapValue(x, a, b) {
    const pos = lookup(a, x);
    return (x - a[pos - 1]) / (a[pos] - a[pos - 1]) * (b[pos] - b[pos - 1]) + b[pos - 1];
}

function checkScrollToBottom(self, other) {
    const percentage = self.scrollTop / (self.scrollHeight - self.offsetHeight);
    if (percentage >= 1) {
        $('.cover-bottom').addClass('cover-nobackground');
        other.scrollTop = other.scrollHeight;
        return true;
    } else $('.cover-bottom.cover-nobackground').removeClass('cover-nobackground');
    return false;
}

function editorToPreviewer() {
    if (window.lineNumbers.length == 0) return;
    if (window.scrollMap === undefined) buildScrollMap();

    if (checkScrollToBottom(editorScroll, previewerScroll)) return;

    var target = mapValue(editorScroll.scrollTop, window.scrollMap[0], window.scrollMap[1]);
    previewerScroll.scrollTop = target;
}

function previewerToEditor() {
    if (window.lineNumbers.length == 0) return;
    if (window.scrollMap === undefined) buildScrollMap();

    if (checkScrollToBottom(previewerScroll, editorScroll)) return;

    var target = mapValue(previewerScroll.scrollTop, window.scrollMap[1], window.scrollMap[0]);
    editorScroll.scrollTop = target;
}

var editor = $('#editor');
$('.CodeMirror-vscrollbar').on('scroll', function(e) {
    if (editor.is(':hover')) editorToPreviewer();
});

$('#previewer-wrapper').on('scroll', function(e) {
    if ($(this).is(':hover')) previewerToEditor();
});

module.exports = editorToPreviewer;
