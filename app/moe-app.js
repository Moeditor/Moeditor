'use strict';

const MoeditorWindow = require('./moe-window'),
      fs = require('fs');

class MoeditorApplication {
	constructor() {
		this.windows = new Array();
	}

	open(fileName) {
		var data = fs.readFileSync(fileName);
		this.windows.push(new MoeditorWindow(fileName));
	}

	run() {
        var docs = process.argv.filter(function (s) {
            try {
                return s.substring(0, 2) !== '--' && fs.statSync(s).isFile();
            } catch (e) {
                return false;
            }
        });

		for (var i = 0; i < docs.length; i++) this.open(docs[i]);
	}
}

module.exports = MoeditorApplication;
