/*
*  This file is part of Moeditor.
*
*  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
*  Copyright (c) 2016 lucaschimweg
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

if (typeof window.localized === 'undefined') window.localized = [];
document.querySelector('html').setAttribute('lang', moeApp.locale.locale);
window.__ = moeApp.locale.get;

function localize() {
    let elements;

    elements = document.getElementsByClassName('l10n') || [];
    for (let e of elements) {
        let text = e.getAttribute('data-origin-text');
        if (!text) {
            if (e.tagName.toUpperCase() === 'OPTION') {
                text = e.text;
            } else {
                text = e.innerText;
            }
            e.setAttribute('data-origin-text', text);
        }

        text = __(text) || text;

        if (e.tagName.toUpperCase() === 'OPTION') {
            e.text = text;
        } else {
            e.innerText = text;
        }
    }

    elements = document.getElementsByClassName('l10n-title') || [];
    for (let e of elements) {
        let title = e.getAttribute('data-origin-title');
        if (!title) {
            title = e.getAttribute('title');
            e.setAttribute('data-origin-title', title);
        }

        title = __(title);

        e.setAttribute('title', title);
    }

    if (window.localized !== []) {
        for (let f of window.localized) f();
        window.localized = [];
    }
};

window.addEventListener('DOMContentLoaded', localize);

require('electron').ipcRenderer.on('setting-changed', (e, arg) => {
    if (arg.key === 'locale') {
        localize();
    }
});
