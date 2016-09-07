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

const MoeditorAction = require('electron').remote.require('./moe-action');

document.addEventListener('DOMContentLoaded', () => {
    const sideMenuButton = document.getElementById('button-bottom-menu');
    const sideMenu = document.getElementById('side-menu');
    const sideMenuCover = document.getElementById('side-menu-cover');
    let clickedButton = null;

    function showMenu() {
        sideMenu.style.marginLeft = '0';
        document.getElementById('main').classList.remove('notransition');
        sideMenuCover.style.opacity = '1';
        sideMenuCover.style.pointerEvents = 'all';
        setTimeout(() => {
            document.getElementById('main').classList.add('notransition');
        }, 200);
    }

    function hideMenu() {
        sideMenu.style.marginLeft = '-300px';
        document.getElementById('main').classList.remove('notransition');
        sideMenuCover.style.opacity = '0';
        sideMenuCover.style.pointerEvents = 'none';
        setTimeout(() => {
            document.getElementById('main').classList.add('notransition');
        }, 200);
    }

    sideMenuCover.addEventListener('click', hideMenu);
    sideMenuButton.addEventListener('click', showMenu);
    sideMenu.addEventListener('transitionend', () => {
        if (clickedButton !== null) {
            setTimeout(clickedButton.itemClicked, 10);
            clickedButton = null;
        }
    });

    const menuItems = sideMenu.querySelectorAll('li:not(.break)');
    for (const e of menuItems) e.addEventListener('click', () => {
        hideMenu();
        clickedButton = e;
    });

    sideMenu.querySelector('li[data-action=new]').itemClicked = (() => {
        MoeditorAction.openNew();
    });

    sideMenu.querySelector('li[data-action=open]').itemClicked = (() => {
        MoeditorAction.open(w.window);
    });

    sideMenu.querySelector('li[data-action=save]').itemClicked = (() => {
        MoeditorAction.save(w.window);
    });

    sideMenu.querySelector('li[data-action=save-as]').itemClicked = (() => {
        MoeditorAction.saveAs(w.window);
    });

    sideMenu.querySelector('li[data-action=export-as-html]').itemClicked = (() => {
        const MoeditorExport = require('./moe-export');
        MoeditorAction.exportAsHTML(w.window, (cb) => {
            MoeditorExport.html(cb);
        });
    });

    sideMenu.querySelector('li[data-action=export-as-pdf]').itemClicked = (() => {
        const MoeditorExport = require('./moe-export');
        MoeditorAction.exportAsPDF(w.window, (cb) => {
            MoeditorExport.pdf(cb);
        });
    });

    sideMenu.querySelector('li[data-action=about]').itemClicked = (() => {
        const ipcRenderer = require('electron').ipcRenderer;
        ipcRenderer.send('show-about-window');
    });

    sideMenu.querySelector('li[data-action=settings]').itemClicked = (() => {
        const ipcRenderer = require('electron').ipcRenderer;
        ipcRenderer.send('show-settings-window');
    });
});
