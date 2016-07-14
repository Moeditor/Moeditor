window.addEventListener("DOMContentLoaded", function () {
	const locale = require('electron').remote.getGlobal("locale");
	document.getElementById('button-bottom-new').innerHTML = locale.get("new");
	document.getElementById('button-bottom-open').innerHTML = locale.get("open");
	document.getElementById('button-bottom-save').innerHTML = locale.get("save");
}, false);