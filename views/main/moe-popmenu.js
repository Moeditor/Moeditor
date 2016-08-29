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

document.addEventListener('DOMContentLoaded', () => {
    const popUpLayer = document.getElementById('popup-layer');
    const popUpMenus = popUpLayer.getElementsByClassName('popup-menu');

    var mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });

    function toggleMenu(m, f) {
        if (f) {
            var p = mouse;
            if (p.y + m.offsetHeight > window.innerHeight) p.y -= m.offsetHeight;
            if (p.x + m.offsetWidth > window.innerWidth) p.x -= m.offsetWidth;
            m.style.top = p.x;
            m.style.left = p.y;
        }
        if (m.style.display === 'block') m.style.display = '';
        else m.style.display = 'block', m.focus();
    }

    function hideMenu(m) {
        m.style.display = '';
    }

    window.toggleMenu = toggleMenu;

    for (const m of popUpMenus) {
        m.addEventListener('blur', () => {
            hideMenu(m);
        });

        const menuItems = m.getElementsByTagName('li');
        for (const it of menuItems) {
            it.addEventListener('click', () => {
                hideMenu(m);
            })
        }
    }
});
