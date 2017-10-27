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

if (typeof window._ === 'undefined') window._ = require('lodash');
if (typeof window.Raphael === 'undefined') window.Raphael = require('raphael');

const LRUCache = require('lrucache');
var rendered = LRUCache(1024);

const Flowchart = require('flowchart.js'),
      Sequence = require('js-sequence-diagrams'),
      mermaidAPI = require('mermaid').mermaidAPI;

var div = document.createElement('div');
div.style.display = 'none';
document.body.appendChild(div);

function renderSequence(str) {
    let diagram = Sequence.parse(str);
    diagram.drawSVG(div, { theme: 'simple' });
    let res = div.innerHTML;
    div.innerHTML = '';
    return `<div>${res}</div>`;
}

function renderFlow(str) {
    let diagram = Flowchart.parse(str);
    diagram.drawSVG(div);
    let res = div.innerHTML;
    div.innerHTML = '';
    return `<div>${res}</div>`;
}

var mermaidCount = 1;
function renderMermaid(str) {
    let res = mermaidAPI.render(`mermaid${mermaidCount}`, str);
    mermaidCount += 1;
    return `<div>${res}</div>`;
}

function render(str, type) {
    let res = rendered.get(type + str);
    if (typeof res === 'string') return res;

    try {
        if (type === 'sequence') res = renderSequence(str);
        else if (type === 'flow') res = renderFlow(str);
        else if (type === 'mermaid') res = renderMermaid(str);
    } catch(e) {
        res = e;
    }

    rendered.set(type + str, res);
    return res;
}

module.exports = render;
