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
const path = require('path');

function render(s, type, cb) {
    const MoeditorHighlight = require('./moe-highlight');
    const MoeditorMathRenderer = require('./moe-math');
    const MoeMark = require('moemark');
    const jQuery = require('jquery');

    var math = new Array(), rendering = true, mathCnt = 0, mathID = 0, rendered = null, haveMath = false, haveCode = false;

    MoeMark.setOptions({
        math: moeApp.config.get('math'),
        umlchart: moeApp.config.get('uml-diagrams'),
        breaks: moeApp.config.get('breaks'),
        highlight: (code, lang) => {
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
        mathRenderer: (s, display) => {
            haveMath = true;
            mathCnt++, mathID++;
            var id = 'math-' + mathID;
            var res = '<span id="' + id + '"></span>'
            MoeditorMathRenderer.renderForExport(type, s, display, (res, id) => {
                math[id] = res;
                if (!--mathCnt && !rendering) finish();
            }, mathID);
            return res;
        }
    }, (err, val) => {
        rendered = jQuery(jQuery.parseHTML('<span>' + val + '</span>'));
        rendering = false;
        if (!mathCnt) finish();
    });
}

function html(cb) {
    render(w.content, 'html', (res, haveMath, haveCode) => {
        const doc = document.implementation.createHTMLDocument();
        const head = doc.querySelector('head');
        const meta = doc.createElement('meta');
        meta.setAttribute('charset', 'utf-8');
        head.appendChild(meta);
        const style = doc.createElement('style');
        style.innerHTML = MoeditorFile.read(require('./moe-rendertheme').getCSS(false), '').toString();
        head.appendChild(style);
        if (haveCode) {
            const styleHLJS = doc.createElement('style');
            styleHLJS.innerHTML = MoeditorFile.read(path.resolve(path.dirname(path.dirname(require.resolve('highlight.js'))), `styles/${moeApp.config.get('highlight-theme')}.css`), '').toString();
            head.appendChild(styleHLJS);
        }
        const customCSSs = moeApp.config.get('custom-csss');
        if (Object.getOwnPropertyNames(customCSSs).length !== 0) for (let x in customCSSs) if (customCSSs[x].selected) {
            let style = doc.createElement('style');
            style.innerHTML = MoeditorFile.read(customCSSs[x].fileName);
            doc.head.appendChild(style);
        }
        const body = doc.querySelector('body');
        body.id = 'container';
        body.className = 'export export-html';
        body.innerHTML = res;
        cb('<!doctype html>\n<html>\n' + doc.querySelector('html').innerHTML + '\n</html>');
    });
}

function pdf(cb) {
    render(w.content, 'pdf', (res, haveMath, haveCode) => {
        const doc = document.implementation.createHTMLDocument();
        const head = doc.querySelector('head');
        const meta = doc.createElement('meta');
        meta.setAttribute('charset', 'utf-8');
        head.appendChild(meta);
        const link = doc.createElement('link');
        link.href = require('./moe-rendertheme').getCSS(true);
        link.rel = 'stylesheet';
        head.appendChild(link);
        if (haveCode) {
            const styleHLJS = doc.createElement('style');
            styleHLJS.innerHTML = MoeditorFile.read(path.resolve(path.dirname(path.dirname(require.resolve('highlight.js'))), `styles/${moeApp.config.get('highlight-theme')}.css`), '').toString();
            head.appendChild(styleHLJS);
        }
        if (haveMath) {
            const styleMathJax = doc.createElement('style');
            styleMathJax.innerHTML = MoeditorFile.read(moeApp.Const.path + '/views/main/mathjax.css', '').toString().split('../node_modules').join('file://' + moeApp.Const.path + '/node_modules');
            head.appendChild(styleMathJax);
        }
        const customCSSs = moeApp.config.get('custom-csss');
        if (Object.getOwnPropertyNames(customCSSs).length !== 0) for (let x in customCSSs) if (customCSSs[x].selected) {
            let link = doc.createElement('link');
            link.href = customCSSs[x].fileName;
            link.rel = 'stylesheet';
            doc.head.appendChild(link);
        }
        const body = doc.querySelector('body');
        body.id = 'container';
        body.className = 'export export-pdf';
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
    ipcRenderer.on('action-export-html', () => {
        MoeditorAction.exportAsHTML(w.window, (cb) => {
            html(cb);
        });
    });

    ipcRenderer.on('action-export-pdf', () => {
        MoeditorAction.exportAsPDF(w.window, (cb) => {
            pdf(cb);
        });
    });
}

module.exports = {
    html: html,
    pdf: pdf
};
