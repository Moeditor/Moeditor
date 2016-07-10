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

function editorToPreview() {
    if (window.lineNumbers.length == 0) return;
    var self = $('.CodeMirror-vscrollbar')[0], other = $('#previewer-wrapper')[0];
    const percentage = self.scrollTop / (self.scrollHeight - self.offsetHeight);
    if (percentage >= 1) {
        $('.cover-bottom').addClass('cover-nobackground');
        other.scrollTop = other.scrollHeight;
    } else $('.cover-bottom.cover-nobackground').removeClass('cover-nobackground');

    const lineNumber = window.editor.lineAtHeight(window.editor.getScrollInfo().top, 'local');
    const index = lookup(window.lineNumbers, lineNumber);
    const matchedLineNumber = window.lineNumbers[index];

    const top = window.lineNumbers[index == 0 ? index : index - 1];
    const bottom = matchedLineNumber;

    const topPosSelf = window.editor.heightAtLine(top, 'local');
    const bottomPosSelf = window.editor.heightAtLine(bottom, 'local');

    const topPosOther = other.scrollTop + $('[data-linenumber=' + top + ']').offset().top;
    const bottomPosOther = other.scrollTop + $('[data-linenumber=' + bottom + ']').offset().top;

    const target = (window.editor.getScrollInfo().top - topPosSelf) / (bottomPosSelf - topPosSelf) * (bottomPosOther - topPosOther) + topPosOther;
    other.scrollTop = target;
}

$('.CodeMirror-vscrollbar').on('scroll', function(e) {
    console.log(e);
    editorToPreview();
});

$('#previewer-wrapper').on('mousewheel', function(e) {
    $('.CodeMirror-vscrollbar').scrollTop($('.CodeMirror-vscrollbar').scrollTop() + e.originalEvent.deltaY);
    return false;
});

module.exports = editorToPreview;
