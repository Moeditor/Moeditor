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
                let loc = locale;
                if (typeof strings[loc] !== 'undefined') {
                    this.locale = loc;
                } else {
                    loc = loc.substr(0, loc.indexOf('_'));
    				if (typeof strings[loc] !== 'undefined') {
    					this.locale = loc;
    				}
                }
			}
		});
	}

	get(str) {
        let res;
		if (typeof strings[this.locale] === 'undefined' || typeof strings[this.locale][str] === 'undefined') {
            res = strings['en'][str];
            console.log('Localization of "' + str + '" failed, falling back to English.');
        } else {
            res = strings[this.locale][str];
        }
        return res;
	}
}

module.exports = MoeditorLocale;

const strings = {
	"en": {
        "New": "New",
        "Open": "Open",
        "Save": "Save",
        "Save as": "Save as",
        "Export as HTML": "Export as HTML",
        "Export as PDF": "Export as PDF",
        "Settings": "Settings",
        "About": "About",

        "Menu": "Menu",
        "Directory": "Directory",
        "Toggle focus mode": "Toggle focus mode",
        "Edit mode": "Edit mode",

        "Write Mode": "Write Mode",
        "Read Mode": "Read Mode",
        "Preview Mode": "Preview Mode",
        "Wide": "Wide",
        "Medium": "Medium",
        "Narrow": "Narrow",

        "Yes": "Yes",
        "No": "No",
        "Cancel": "Cancel",
        "Confirm": "Confirm",

        "Save changes to file?": "Save changes to file?",

        "Markdown Documents": "Markdown Documents",
        "HTML Documents": "HTML Documents",
        "PDF Documents": "PDF Documents",
        "All Files": "All Files",
        "Saved successfully.": "Saved successfully.",
        "Can't save file": "Can't save file",
        "Exporting as HTML, please wait ...": "Exporting as HTML, please wait ...",
        "Exporting as PDF, please wait ...": "Exporting as PDF, please wait ...",
        "Can't export as HTML": "Can't export as HTML",
        "Can't export as PDF": "Can't export as PDF",

        "Edit": "Edit",
        "Appearance": "Appearance",
        "Render": "Render",
        "Font": "Editor Font",
        "Font Size": "Font Size",
        "Line Height": "Line Height",
        "Color Theme": "Color Theme",
        "TeX Math Expressions":"TeX Math Expressions",
        "UML Diagrams": "UML Diagrams",

        "version": "version"
	},
	"de": {
        "Yes": "Ja",
        "No": "Nein",
        "Cancel": "Abbrechen",
        "Confirm": "Bestätigen",

        "Save changes to file?": "Änderungen speichern?",

        "Markdown Documents": "Markdown Dokumente",
        "All Files": "Alle Dateien"
	},
	"pt": {
        "Yes": "Sim",
        "No": "Não",
        "Cancel": "Cancelar",
        "Confirm": "Confirmar",

        "Save changes to file?": "Salvar as alterações no arquivo?",

        "Markdown Documents": "Documentos Markdown",
        "HTML Documents": "Documentos HTML",
        "PDF Documents": "Documentos PDF",
        "All Files": "Todos Arquivos"
	}
}
