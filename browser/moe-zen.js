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

document.addEventListener('DOMContentLoaded', function() {
    const zenButton = document.getElementById('button-bottom-zen');
    const rightPanel = document.getElementById('right-panel');
    const leftPanel = document.getElementById('left-panel');
    const bottomLeftBackground = document.getElementById('cover-bottom-background-left');
    const bottomRightBackground = document.getElementById('cover-bottom-background-right');

    function setZenMode(f) {
        if (f) {
            rightPanel.style.right = '-50%';
            leftPanel.style.width = '100%';
            bottomRightBackground.style.right = '-50%';
            bottomLeftBackground.style.width = '100%';
        } else {
            rightPanel.style.right = '';
            leftPanel.style.width = '';
            bottomRightBackground.style.right = '';
            bottomLeftBackground.style.width = '';
        }
        window.zenMode = f;
        moeApp.config.set('zen-mode', f);
    }

    if (moeApp.config.get('zen-mode')) setZenMode(true);
    else setZenMode(false);

    zenButton.addEventListener('click', function() {
        if (window.zenMode) {
            setZenMode(false);
            window.updatePreview();
        } else {
            setZenMode(true);
        }
    });

    leftPanel.addEventListener('transitionend', function() {
        editor.refresh();
    });
});
