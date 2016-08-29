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

document.addEventListener('DOMContentLoaded', () => {
    const tabView = document.getElementsByClassName('tabview')[0];
    const tabs = tabView.getElementsByClassName('item');
    const panels = tabView.getElementsByClassName('panel');

    console.log(tabs);

    for (const tab of tabs) {
        const s = tab.getAttribute('data-tab');
        tab.addEventListener('click', () => {
            if (tab.classList.contains('selected')) return;
            for (const panel of panels) {
                if (panel.getAttribute('data-tab') === s) panel.style.display = 'block';
                else panel.style.display = 'none';
            }

            for (const tab of tabs) {
                tab.classList.remove('selected');
            }
            tab.classList.add('selected');
        });
    }

    ;
})
