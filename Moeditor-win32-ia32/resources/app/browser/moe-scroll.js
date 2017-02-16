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

function scroll(self, other) {
    var percentage = self.scrollTop / (self.scrollHeight - self.offsetHeight);
    other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);

    if (percentage >= 1) $('.cover-bottom').addClass('cover-nobackground');
    else $('.cover-bottom.cover-nobackground').removeClass('cover-nobackground');
}

$('.CodeMirror-vscrollbar').on('scroll', function() {
    if ($('#editor').is(":hover")) {
        scroll(this, $('#previewer-wrapper')[0]);
    }
});

$('#previewer-wrapper').on('scroll', function() {
    if ($('#previewer-wrapper').is(":hover")) {
        scroll(this, $('.CodeMirror-vscrollbar')[0]);
    }
});

module.exports = scroll;
