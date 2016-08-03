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

$(function() {
    if (process.platform === 'darwin') return;

    $('#titlebar .button, #titlebar img').on('dragstart', function(e) {
        e.preventDefault();
    });

    const remote = require('electron').remote;

    var w = remote.getCurrentWindow();

    w.on('maximize', function() {
        $('#titlebar .button-img-maximize').hide();
        $('#titlebar .button-img-restore').show();
    });

    w.on('unmaximize', function() {
        $('#titlebar .button-img-restore').hide();
        $('#titlebar .button-img-maximize').show();
    });

    // workaround for the .button is still :hover after maximize window
    $('#titlebar .button').mouseover(function() {
        $(this).addClass('hover');
    }).mouseout(function() {
        $(this).removeClass('hover');
    });

    $('#titlebar .button-close').click(function () {
        var w = remote.getCurrentWindow();
        w.close();
    });

    $('#titlebar .button-minimize').click(function () {
        var w = remote.getCurrentWindow();
        w.minimize();
    });

    $('#titlebar .button-maximize').click(function () {
        var w = remote.getCurrentWindow();
        if (!w.isMaximized()) w.maximize();
        else w.unmaximize();
    });
})
