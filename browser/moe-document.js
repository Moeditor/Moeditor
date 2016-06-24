'use strict';

$(function() {
    CodeMirror.defineMode('mathdown', function(config) {
        var options = [];
        var ref = [['$$', '$$'], ['$', '$'], ['\\[', '\\]'], ['\\(', '\\)']];
        for (var i = 0, len = ref.length; i < len; i++) {
            var x = ref[i];
            options.push({
                open: x[0],
                close: x[1],
                mode: CodeMirror.getMode(config, 'stex')
            });
        }
        console.log('mathdown', options);
        return CodeMirror.multiplexingMode.apply(CodeMirror, [CodeMirror.getMode(config, 'gfm')].concat([].slice.call(options)));
    });

    var editor = CodeMirror.fromTextArea(document.querySelector('#editor textarea'), {
        lineNumbers: false,
        mode: 'mathdown',
        matchBrackets: true,
        // scrollbarStyle: "simple",
        theme: 'base16-light',
        lineWrapping: true,
        extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList' }
    });

    editor.on('change', function() {
        const content = editor.getValue();
        var mathRenderer = new MoeditorMathRenderer(content);
        const replaced = mathRenderer.replace();
        const html = marked(replaced);
        $('#previewer').html(mathRenderer.render(html));
        // document.querySelector('iframe').contentWindow.document.body.innerHTML(marked(content));
    });

    var synced = $('.CodeMirror-vscrollbar, #previewer-wrapper');
    synced.on('scroll', function(e) {
       var other = synced.not(this).off('scroll')[0];
       var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
       other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);
    });
});
