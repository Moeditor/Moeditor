$(function() {
    $('#titlebar img').on('dragstart', function(e) {
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
