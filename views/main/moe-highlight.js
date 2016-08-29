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

const highlightjs = require('highlight.js');

var LRUCache = require('lrucache');
var cache = LRUCache(512);

module.exports = (code, lang) => {
    const key = lang + '|' + code;
    var res = cache.get(key);
    if (res === undefined) {
        try {
            if (!lang || lang == '') res = highlightjs.highlightAuto(code).value;
            else res = highlightjs.highlight(lang, code).value;
        } catch(e) {
            res = code;
        }

        cache.set(key, res);
    }
    return res;
}
