window.addEventListener('DOMContentLoaded', function () {
	let l10n = require('electron').remote.getGlobal('__');

    let elements;

    elements = document.getElementsByClassName('l10n') || [];
    for (let e of elements) {
        e.innerText = l10n(e.innerText);
    }

    elements = document.getElementsByClassName('l10n-title') || [];
    console.log(elements);
    for (let e of elements) {
        e.setAttribute('title', l10n(e.getAttribute('title')));
    }
}, false);
