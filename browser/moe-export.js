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

const MoeditorFile = require('../app/moe-file');

function exportHTML() {
    const s = document.getElementById('previewer').innerHTML.toString().split('moemark-linenumber').join('span');
    const doc = document.implementation.createHTMLDocument();
    const head = doc.querySelector('head');
    const meta = doc.createElement('meta');
    meta.setAttribute('charset', 'utf-8');
    head.appendChild(meta);
    const stylePreview = doc.createElement('style');
    stylePreview.innerHTML = MoeditorFile.read(moeApp.Const.path + '/browser/preview.css', '').toString().replace('#previewer ', '');
    head.appendChild(stylePreview);
    if (s.indexOf('katex') !== -1) {
        const linkKaTeX = doc.createElement('link');
        linkKaTeX.setAttribute('rel', 'stylesheet');
        linkKaTeX.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css');
        head.appendChild(linkKaTeX);
    }
    const body = doc.querySelector('body');
    body.innerHTML = s;
    return '<!doctype html>\n<html>\n' + doc.querySelector('html').innerHTML + '\n</html>';
}

module.exports = {
    html: exportHTML
};
