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

const Path = require('path'), fs = require('fs');

var timeStamp = 0, paths = [];

module.exports = class MoeditorPath {
    constructor(path) {
        this.id = timeStamp++;
        this.name = Path.basename(path);
        this.path = path;
        try {
            this.isdir = fs.lstatSync(path).isDirectory();
        } catch(e) {
            this.isdir = false;
        }
        this.opened = false;
        this.list = [];

        paths[this.id] = this;
    }

    open() {
        if (!this.isdir) return false;
        var files;
        try {
            files = fs.readdirSync(this.path);
        } catch(e) {
            return false;
        }
        this.opened = true;
        for (const name of files) {
            const x = new MoeditorPath(Path.join(this.path, name));
            this.list.push(x);
        }
        this.list.sort((a, b) => {
            if (a.isdir && !b.isdir) return -1;
            else if (!a.isdir && b.isdir) return 1;
            else return (a.name > b.name) - (a.name < b.name);
        });
        return true;
    }

    close() {
        for (const x of this.list) if (x.opened) return false;
        for (const x of this.list) paths[x.id] = undefined;
        this.opened = false;
        this.list = [];
        return true;
    }

    static getById(id) {
        return paths[id];
    }
};
