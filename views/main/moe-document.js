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

window.app = require('electron').remote.app;
window.moeApp = app.moeApp;
window.w = moeApp.newWindow;
require('electron-titlebar');
const ipcRenderer = require('electron').ipcRenderer;

$(() => {
    const MoeditorPreview = require('./moe-preview');
    if (w.fileName !== '') {
        document.getElementsByTagName('title')[0].innerText = 'Moeditor - ' + require('path').basename(w.fileName);
    }
    document.querySelector('#editor textarea').innerText = w.content;

    var editor = CodeMirror.fromTextArea(document.querySelector('#editor textarea'), {
        lineNumbers: false,
        mode: moeApp.config.get('math') ? 'gfm_math' : 'gfm',
        matchBrackets: true,
        theme: moeApp.config.get('editor-theme'),
        lineWrapping: true,
        extraKeys: {
            Enter: 'newlineAndIndentContinueMarkdownList',
            Home: 'goLineLeft',
            End: 'goLineRight',
            'Shift-Tab': 'indentLess'
        },
        tabSize: moeApp.config.get('tab-size'),
        indentUnit: moeApp.config.get('tab-size'),
        viewportMargin: Infinity,
        styleActiveLine: true,
        showCursorWhenSelecting: true
    });

    editor.focus();

    const scroll = require('./moe-scroll');

    window.updatePreview = (force) => {
        MoeditorPreview(editor, force, () => {
            scroll();
        });
    };

    editor.on('change', (editor, obj) => {
        window.updatePreview(false)
    });

    editor.on("paste",function(editor,e){
        const idb = require('idb-keyval');
        for (let i = 0, len = e.clipboardData.items.length; i < len; i++) {
            let item = e.clipboardData.items[i];
            if (item.kind === "file" && item.type.match(/^image/)) {
                let pasteFile = item.getAsFile();
                let reader = new FileReader();
                let fileName = Date.now() + '.' + item.type.split("/")[1];

                reader.onload = function(e) {
                    idb.set(fileName, e.target.result).then(function () {
                        editor.doc.replaceSelection("![](blob:" + fileName + ")")
                    });
                };
                reader.readAsDataURL(pasteFile);
            }
        }
    });
    setTimeout(() => {
        window.updatePreview(true);
    }, 0);

    window.editor = editor;

    // workaround for the .button is still :hover after maximize window
    $('#cover-bottom .button-bottom').mouseover(function() {
        $(this).addClass('hover');
    }).mouseout(function() {
        $(this).removeClass('hover');
    }).click(function() {
        var s = $(this).data('action');
        if (s === 'menu') MoeditorSideMenu.open();
    });

    const s = require('electron').shell;

    const containerWrapper = document.getElementById('container-wrapper');
    document.addEventListener('keydown', (e) => {
        if ((process.platform === 'darwin' ? e.metaKey : e.ctrlKey) && e.keyCode == 65) {
            if (document.getElementById('editor').contains(e.target)) {
                return;
            } else if (containerWrapper.contains(e.target)) {
                let sel = window.getSelection();
                let rg = document.createRange();
                rg.selectNodeContents(containerWrapper);
                sel.removeAllRanges();
                sel.addRange(rg);
            }
            e.preventDefault();
        }
    });
    $("#container").on('click', 'a', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            const e = containerWrapper.querySelector(href);
            if (e) containerWrapper.scrollTop = e.offsetTop - 50; // 50 is the height of the top cover
        } else {
            s.openExternal(this.href);
        }
    });

    const leftPanel = document.getElementById('left-panel');
    leftPanel.addEventListener('click', (e) => {
        if (e.target === leftPanel) editor.focus();
    });

    if (moeApp.config.get('focus-mode') === true) document.getElementById('editor').classList.add('focus');
    document.getElementById('button-bottom-focus').addEventListener('click', function() {
        document.getElementById('editor').classList.toggle('focus');
        moeApp.config.set('focus-mode', document.getElementById('editor').classList.contains('focus'));
    });

    ipcRenderer.on('set-title', (e, fileName) => {
        document.getElementsByTagName('title')[0].innerText = 'Moeditor - ' + require('path').basename(fileName);
    });

    ipcRenderer.on('save-doc', (e, data) => {
        const fs = require('fs');
        const idb = require('idb-keyval');
        let dir = path.dirname(data.fileName);

        let imgsResolve = data.imgs.map(function (img) {
            return idb.get(img).then(function (val) {
                fs.writeFile(dir + "/" + img, val.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ""), 'base64', function (err) {
                    if(!err){
                        idb.delete(img);
                    }
                });
            });
        });
        Promise.all(imgsResolve).then(function () {
            editor.doc.setValue(w.content);
            window.updatePreview(true);
        })
    });

    require('./moe-settings');

    w.window.show();
});
