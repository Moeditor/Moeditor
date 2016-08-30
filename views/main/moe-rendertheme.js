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

'use strict'

const fs = require('fs');
const path = require('path');
const url = require('url');

const builtin = fs.readdirSync(path.resolve(app.getAppPath(), 'themes'));

module.exports = {
    getCSS(forURL) {
        const theme = moeApp.config.get('render-theme');
        let res;
        if (builtin.includes(theme)) res = path.resolve(app.getAppPath(), 'themes', theme, 'style.css');
        else res = path.resolve(moeApp.config.get('custom-render-themes')[theme], 'style.css');
        if (forURL) res = url.resolve('file://', res);
        return res;
    }
};
