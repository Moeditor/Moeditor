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

'use strict'

const MoeditorFile = require('../../app/moe-file');

function render(s, type, cb) {
    const MoeditorHighlight = require('./moe-highlight');
    const MoeditorMathRenderer = require('./moe-math');
    const MoeMark = require('moemark');
    const jQuery = require('jquery');

    var math = new Array(), rendering = true, mathCnt = 0, mathID = 0, rendered = null, haveMath = false, haveCode = false;

    MoeMark.setOptions({
        math: true,
        highlight: function(code, lang) {
            haveCode = true;
            return MoeditorHighlight(code, lang);
        }
    });

    function finish() {
        for (var i in math) {
            rendered.find('#math-' + i).html(math[i]);
        }
        cb(rendered.html(), haveMath, haveCode);
    }

    MoeMark(s, {
        mathRenderer: function(s, display) {
            haveMath = true;
            mathCnt++, mathID++;
            var id = 'math-' + mathID;
            var res = '<span id="' + id + '"></span>'
            MoeditorMathRenderer.renderForExport(type, s, display, function(res, id) {
                math[id] = res;
                if (!--mathCnt && !rendering) finish();
            }, mathID);
            return res;
        }
    }, function(err, val) {
        rendered = jQuery(jQuery.parseHTML('<span>' + val + '</span>'));
        rendering = false;
        if (!mathCnt) finish();
    });
}

function html(cb) {
    render(w.content, 'html', function(res, haveMath, haveCode) {
        res = res.split('moemark-linenumber').join('span');
        const doc = document.implementation.createHTMLDocument();
        const head = doc.querySelector('head');
        const meta = doc.createElement('meta');
        meta.setAttribute('charset', 'utf-8');
        head.appendChild(meta);
        const stylePreview = doc.createElement('style');
        stylePreview.innerHTML = MoeditorFile.read(moeApp.Const.path + '/browser/preview.css', '').toString().split('#previewer ').join('');
        head.appendChild(stylePreview);
        if (haveCode) {
            const styleHLJS = doc.createElement('style');
            styleHLJS.innerHTML = MoeditorFile.read(moeApp.Const.path + '/node_modules/highlight.js/styles/github.css', '').toString();
            head.appendChild(styleHLJS);
        }
        const body = doc.querySelector('body');
        body.innerHTML = res;
        cb('<!doctype html>\n<html>\n' + doc.querySelector('html').innerHTML + '\n</html>');
    });
}

function pdf(cb) {
    render(w.content, 'pdf', function(res, haveMath, haveCode) {
        res = res.split('moemark-linenumber').join('span');
        const doc = document.implementation.createHTMLDocument();
        const head = doc.querySelector('head');
        const meta = doc.createElement('meta');
        meta.setAttribute('charset', 'utf-8');
        head.appendChild(meta);
        const stylePreview = doc.createElement('style');
        stylePreview.innerHTML = MoeditorFile.read(moeApp.Const.path + '/browser/preview.css', '').toString().split('#previewer ').join('') + '*{overflow: visible !important;}';
        head.appendChild(stylePreview);
        if (haveCode) {
            const styleHLJS = doc.createElement('style');
            styleHLJS.innerHTML = MoeditorFile.read(moeApp.Const.path + '/node_modules/highlight.js/styles/github.css', '').toString();
            head.appendChild(styleHLJS);
        }
        if (haveMath) {
            const styleMathJax = doc.createElement('style');
            styleMathJax.innerHTML = MoeditorFile.read(moeApp.Const.path + '/browser/mathjax.css', '').toString().split('../node_modules').join('file://' + moeApp.Const.path + '/node_modules');
            head.appendChild(styleMathJax);
        }
        const body = doc.querySelector('body');
        body.innerHTML = res + ' \
<script> \
    const ipcRenderer = require(\'electron\').ipcRenderer; \
    window.onload = (function() { \
        ipcRenderer.send(\'ready-export-pdf\'); \
    }); \
</script> \
        ';
        cb(doc.querySelector('html').innerHTML);
    });
}

var flag = false;
if (!flag) {
    flag = true;
    const ipcRenderer = require('electron').ipcRenderer;
    const MoeditorAction = require('electron').remote.require('./moe-action');
    ipcRenderer.on('action-export-html', function() {
        MoeditorAction.exportAsHTML(w.window, function(cb) {
            html(cb);
        });
    });

    ipcRenderer.on('action-export-pdf', function() {
        MoeditorAction.exportAsPDF(w.window, function(cb) {
            pdf(cb);
        });
    });
}

module.exports = {
    html: html,
    pdf: pdf
};
