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

const MoeditorAction = require('electron').remote.require('../app/moe-action');

document.addEventListener('DOMContentLoaded', function() {
    const sideMenuButton = document.getElementById('button-bottom-menu');
    const sideMenu = document.getElementById('side-menu');
    const sideMenuCover = document.getElementById('side-menu-cover');
    const main = document.getElementById('main');

    function showMenu() {
        sideMenu.style.marginLeft = '0';
        sideMenuCover.style.opacity = '1';
        sideMenuCover.style.pointerEvents = 'all';
        main.style.left = '300px';
    }

    function hideMenu() {
        sideMenu.style.marginLeft = '-300px';
        sideMenuCover.style.opacity = '0';
        sideMenuCover.style.pointerEvents = 'none';
        main.style.left = '0';
    }

    sideMenuCover.addEventListener('click', hideMenu);
    sideMenuButton.addEventListener('click', showMenu);

    const menuItems = sideMenu.querySelectorAll('li:not(.break)');
    for (const e of menuItems) e.addEventListener('click', hideMenu);

    sideMenu.querySelector('li[data-action=new]').addEventListener('click', function() {
        MoeditorAction.openNew();
    });

    sideMenu.querySelector('li[data-action=open]').addEventListener('click', function() {
        MoeditorAction.open(w.window);
    });

    sideMenu.querySelector('li[data-action=save]').addEventListener('click', function() {
        MoeditorAction.save(w.window);
    });

    sideMenu.querySelector('li[data-action=save-as]').addEventListener('click', function() {
        MoeditorAction.saveAs(w.window);
    });

    sideMenu.querySelector('li[data-action=export-as-html]').addEventListener('click', function() {
        const MoeditorExport = require('./moe-export');
        MoeditorAction.exportAsHTML(w.window, function(cb) {
            MoeditorExport.html(cb);
        });
    });

    sideMenu.querySelector('li[data-action=export-as-pdf]').addEventListener('click', function() {
        const MoeditorExport = require('./moe-export');
        MoeditorAction.exportAsPDF(w.window, function(cb) {
            MoeditorExport.pdf(cb);
        });
    });

    sideMenu.querySelector('li[data-action=about]').addEventListener('click', function() {
        const ipcRenderer = require('electron').ipcRenderer;
        ipcRenderer.send('show-about-window');
    });
});
