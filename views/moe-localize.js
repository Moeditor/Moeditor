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

window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('html').setAttribute('lang', moeApp.locale.locale);
	let l10n = require('electron').remote.getGlobal('__');

    let elements;

    elements = document.getElementsByClassName('l10n') || [];
    for (let e of elements) {
        if (e.tagName.toUpperCase() === 'OPTION') {
            e.text = l10n(e.text);
        } else {
            e.innerText = l10n(e.innerText);
        }
    }

    elements = document.getElementsByClassName('l10n-title') || [];
    console.log(elements);
    for (let e of elements) {
        e.setAttribute('title', l10n(e.getAttribute('title')));
    }
}, false);
