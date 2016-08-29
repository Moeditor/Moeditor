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
    const w = require('electron').remote.getCurrentWindow();

    for (const tab of tabs) {
        const s = tab.getAttribute('data-tab');
        tab.addEventListener('click', () => {
            if (tab.classList.contains('selected')) return;

            let oldHeight = null, newHeight = null;
            for (const panel of panels) {
                if (panel.getAttribute('data-tab') === s) {
                    panel.style.display = 'block';
                    newHeight = panel.getElementsByTagName('table')[0].clientHeight;
                } else if (panel.style.display === 'block') {
                    oldHeight = panel.getElementsByTagName('table')[0].clientHeight;
                    panel.style.display = 'none';
                }
            }

            for (const tab of tabs) {
                tab.classList.remove('selected');
            }
            tab.classList.add('selected');

            if (oldHeight !== null && newHeight !== null && oldHeight !== newHeight) {
                let size = w.getSize();
                /*
                // The animate has flickering issue
                let delta = newHeight - oldHeight;
                const sgn = Math.sign(delta);
                delta *= sgn;
                let unit = 20;
                function ani() {
                    if (delta < unit) unit = delta;
                    size[1] += unit * sgn;
                    delta -= unit;
                    w.setSize(size[0], size[1], false);
                    if (delta) setTimeout(ani, 20);
                }
                ani();
                */
                w.setSize(size[0], size[1] + newHeight - oldHeight, true);
            }
        });
    }

    ;
})
