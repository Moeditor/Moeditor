'use strict';

var mathjax = require('mathjax-node/lib/mj-single.js');

mathjax.config({
    MathJax: {
        tex2jax: {
            processEscapes: true
        }
    }
});

mathjax.start();

module.exports = function(o) {
    var res = null;

    mathjax.typeset({
        math: o.content,
        format: o.display ? "TeX" : "inline-TeX",
        html: true,
    }, function (data) {
        if (!data.errors) {
            res = data.html;
        } else {
            res = data.errors.toString();
        }
    });

    while (res === null);

    return res;
};
