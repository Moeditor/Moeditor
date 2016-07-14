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

const osLocale = require('os-locale');

class MoeditorLocale {
	constructor() {
		this.locale = "en";
		osLocale((err, locale) => {
			if (!err) {
				this.locale = locale.substr(0, locale.indexOf('_')); // Not location, only language (en_US => en)
			}
		});
	}

	get(str) {
		return strings[this.locale][str];
	}
}

module.exports = MoeditorLocale;

const strings = {
	"en": {
		new: "NEW",
		open: "OPEN",
		save: "SAVE",
		yes: "Yes",
		no: "No",
		cancel: "Cancel",
		confirm: "Confirm",
		savequestion: "Save changes to file?"
	},
	"de": {
		new: "NEU",
		open: "ÖFFNEN",
		save: "SPEICHERN",
		yes: "Ja",
		no: "Nein",
		cancel: "Abbrechen",
		confirm: "Bestätigen",
		savequestion: "Änderungen speichern?"
	}
}
