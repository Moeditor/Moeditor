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

// const await = require('asyncawait/await');

var renderedInline = new Array(), renderedDisplay = new Array();
var mathjax = null;

class MoeditorMathRenderer {
    constructor(s) {
        this.s = s;
        this.matched = new Array();

        var placeHolder = 'moeditor'

        while (s.indexOf(placeHolder) !== -1) {

            function rand(l, r) {
                return Math.floor(Math.random() * 100000000) % (r - l + 1) + l;
            }

            var r = rand(1, 3);
            if (r == 1) placeHolder += String.fromCharCode(rand('0'.charAt(0), '9'.charAt(0)));
            else if (r == 2) placeHolder += String.fromCharCode(rand('a'.charAt(0), 'z'.charAt(0)));
            else if (r == 3) placeHolder += String.fromCharCode(rand('A'.charAt(0), 'Z'.charAt(0)));
        }

        this.placeHolder = placeHolder;

        // console.log(placeHolder);
    }

    replace() {
        var s = this.s, index = 0;
        function getchar() { return index == s.length ? -1 : s[index++]; }
        function nextchar() { return index == s.length ? -1 : s[index]; }

        function matchEnd(two) {
            var last = null, c = null, res = '';
            while ((c = getchar()) != -1) {
                if (last == '\\') {
                    last = null;
                    res += c;
                    continue;
                }

                if (c == '$') {
                    if (two) {
                        if (nextchar() == '$') {
                            getchar();
                            return res;
                        }
                    } else return res;
                }

                last = c;
                res += c;
            }

            return res;
        }

        var last = null, c = null, res = '', i = 0;
        while ((c = getchar()) != -1) {
            if (last == '\\') {
                last = null;
                res += c;
                continue;
            }

            if (last == '$') {
                var holder = this.placeHolder + i++;
                if (c == '$') this.matched[holder] = { display: true, content: matchEnd(true) };
                else this.matched[holder] = { display: false, content: c + matchEnd(false) };

                // console.log(holder + ': ' + this.matched[holder].content);

                last = null;
                res += holder;
                continue;
            } else last = c;

            if (c != '$') res += c;
        }

        return res;
    }

    static renderWithoutCache(o) {
        try {
            return katex.renderToString(o.content, { displayMode: o.display });
        } catch(e) {
            var escape = document.createElement('textarea');
            escape.innerText = e;
            return '<div style="display: inline-block; color: #e22; ">' + escape.innerHTML + '</div>';

            if (mathjax == null) {
                mathjax = (function(document, window) { return require("mathjax-node/lib/mj-single.js"); })(null, null);

                mathjax.config({
                    MathJax: {
                        tex2jax: {
                            processEscapes: true
                        }
                    }
                });

                mathjax.start();
            }

            var res = 'error';

            await (mathjax.typeset({
                math: o.content,
                format: o.display ? "TeX" : "inline-TeX",
                html: true,
            }, function (data) {
                if (!data.errors) {
                    res = data.html;
                } else {
                    res = data.errors.toString();
                }
            }));

            return res;
        }
    }

    static renderWithCache(o) {
        if (o.display) {
            if (typeof renderedDisplay[o.content] === 'undefined') {
                renderedDisplay[o.content] = MoeditorMathRenderer.renderWithoutCache(o);
            }
            return renderedDisplay[o.content];
        } else {
            if (typeof renderedInline[o.content] === 'undefined') {
                renderedInline[o.content] = MoeditorMathRenderer.renderWithoutCache(o);
            }
            return renderedInline[o.content];
        }
    }

    render(s) {
        for (const key in this.matched) {
            s = s.replace(key, MoeditorMathRenderer.renderWithCache(this.matched[key]));
        }

        return s;
    }
}
