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
    const treeView = document.getElementById('file-tree');
    function registerToggleTreeView() {
        const treeViewButton = document.getElementById('button-bottom-file-tree');
        const treeViewCover = document.getElementById('file-tree-cover');
        const main = document.getElementById('main');

        function showFileTree() {
            treeView.style.marginLeft = '0';
            treeViewCover.style.opacity = '1';
            treeViewCover.style.pointerEvents = 'all';
            main.style.left = '250px';
        }

        function hideFileTree() {
            treeView.style.marginLeft = '';
            treeViewCover.style.opacity = '0';
            treeViewCover.style.pointerEvents = 'none';
            main.style.left = '';
        }

        treeViewCover.addEventListener('click', hideFileTree);
        treeViewButton.addEventListener('click', showFileTree);
    }

    function registerClickItem() {
        treeView.addEventListener('click', (event) => {
            for (var e = event.target; !e.classList.contains('tree-view'); e = e.parentNode) {
                if (e.classList.contains('tree-view-item')) {
                    clickItem(e);
                    break;
                }
            }
        });
    }

    const itemTemplate = treeView.getElementsByClassName('tree-view-item-template')[0];
    function insertItem(e, path) {
        const items = e ? e.getElementsByClassName('tree-view-subitems')[0] : treeView.getElementsByClassName('tree-view-items')[0];
        const depth = e ? parseInt(e.getAttribute('data-depth')) + 1 : 0;
        const newNode = itemTemplate.cloneNode(true);
        newNode.classList.remove('tree-view-item-template');
        newNode.setAttribute('data-isdir', path.isdir);
        newNode.setAttribute('data-id', path.id);
        newNode.setAttribute('data-expanded', "false");
        newNode.setAttribute('data-depth', depth);
        newNode.getElementsByClassName('tree-view-thisitem')[0].style.paddingLeft = 10 + depth * 20 + 'px';
        newNode.getElementsByClassName('tree-view-text')[0].innerText = path.name;
        items.appendChild(newNode);
    }

    const MoeditorPath = require('./moe-path'), rootPath = new MoeditorPath(w.directory);

    function clickItem(e) {
        if (e.getAttribute('data-isdir') === 'true') {
            toggleDir(e);
        }
    }

    function toggleDir(e) {
        const id = e.getAttribute('data-id'), path = MoeditorPath.getById(id);
        if (e.getAttribute('data-expanded') === 'true') {
            e.setAttribute('data-expanded', 'false');
            const subItems = e.getElementsByClassName('tree-view-subitems')[0];
            if (!path.close()) subItems.style.display = 'none';
            else subItems.innerHTML = '';
        } else {
            e.setAttribute('data-expanded', 'true');
            if (!path.opened) {
                path.open();
                for (const item of path.list) {
                    insertItem(e, item);
                }
            } else {
                e.getElementsByClassName('tree-view-subitems')[0].style.display = '';
            }
        }
    }

    registerToggleTreeView();
    registerClickItem();

    insertItem(null, rootPath);
});
