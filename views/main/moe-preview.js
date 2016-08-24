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

var updatePreview = false, updatePreviewRunning = false;
const MoeditorHighlight = require('./moe-highlight');
const MoeditorMathRenderer = require('./moe-math');
const MoeditorUMLRenderer = require('./moe-uml');
const MoeMark = require('moemark');
const jQuery = require('jquery');
const SVGFixer = require('./svgfixer');
const path = require('path');
const url = require('url');

MoeMark.setOptions({
    math: true,
    lineNumber: true,
    highlight: MoeditorHighlight,
    umlchart: true,
    umlRenderer: MoeditorUMLRenderer
});

module.exports = function (cm, obj, cb) {
    function updateAsync() {
        updatePreview = false;
        updatePreviewRunning = true;

        const content = cm.getValue();
        if (w.content !== content) {
            w.content = content;
            w.changed = true;
            w.window.setDocumentEdited(true);
        }

        if (!window.editMode.startsWith('preview') && !window.editMode.startsWith('read')) {
            updatePreviewRunning = false;
            if (updatePreview) setTimeout(updateAsync, 0);
            cb();
            return;
        }

        var mathCnt = 0, mathID = 0, math = new Array();
        var rendering = true, rendered = null;

        function finish() {
            for (var i in math) {
                rendered.find('#math-' + i).html(math[i]);
            }

            let imgs = rendered.find('img');
            for (let img of imgs) {
                let src = img.getAttribute('src');
                if (url.parse(src).protocol === null) {
                    if (!path.isAbsolute(src)) src = path.resolve(w.directory, src);
                    src = url.resolve('file://', src);
                }
                img.setAttribute('src', src);
            }

            var set = new Set();
            rendered.find('moemark-linenumber').each(function() {
                set.add(parseInt($(this).attr('i')));
            });

            window.lineNumbers = (Array.from(set)).sort(function(a, b) { return a - b; });
            // console.log(window.lineNumbers);
            window.scrollMap = undefined;

            $('#previewer').html(rendered.html());
            SVGFixer(document.getElementById('previewer'));

            cb();

            updatePreviewRunning = false;
            if (updatePreview) setTimeout(updateAsync, 0);
        }

        MoeMark(content, {
            mathRenderer: function(str, display) {
                var res = MoeditorMathRenderer.tryRender(str, display);
                if (res !== undefined) {
                    return res;
                } else {
                    mathCnt++, mathID++;
                    var id = 'math-' + mathID;
                    var res = '<span id="' + id + '"></span>'
                    MoeditorMathRenderer.render(str, display, function(res, id) {
                        math[id] = res;
                        if (!--mathCnt && !rendering) finish();
                    }, mathID);
                    return res;
                }
            }
        }, function(err, val) {
            rendered = jQuery(jQuery.parseHTML('<span>' + val + '</span>'));
            rendering = false;
            if (!mathCnt) finish();
        });
    }

    updatePreview = true;

    if (!updatePreviewRunning) {
        setTimeout(updateAsync, 0);
    }
}
