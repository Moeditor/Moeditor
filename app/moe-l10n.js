/*
*  This file is part of Moeditor.
*
*  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
*  Copyright (c) 2016 lucaschimweg
*  Copyright (c) 2016 douglaseccker
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
*
*  The translation providers:
*   - en: Menci
*   - zh_CN: Menci
*   - de: lucaschimweg
*   - pt: douglaseccker
*
*  If you want to help translate this app, please copy the `en` items of the
*  `strings` constant as the template, and fill each item with the translated
*  string.
*
*  If you are translating this app to a new language, please add the language to
*  `MoeditorLocale.getLanguages()`.
*
*  You can translate for a language (e.g. en) or a language with specified
*  region (e.g. zh_CN). The app will choose the language with specified region
*  first, fallback to only language when the former is unavailable, and fallback
*  to English when they are all unavailable.
*
*  Send a PR to us after translating.
*
*/

'use strict'

const osLocale = require('os-locale');

class MoeditorLocale {
	constructor() {
        if (moeApp.config.get('locale') !== 'default') {
            this.locale = moeApp.config.get('locale');
        } else {
            this.locale = 'default';
        }

        this.sysLocale = osLocale.sync();
        if (typeof strings[this.sysLocale] === 'undefined') {
            this.sysLocale = this.sysLocale.substr(0, this.sysLocale.indexOf('_'));
            if (typeof strings[this.sysLocale] === 'undefined') {
                this.sysLocale = '';
            }
        }

        if (this.locale === 'default') {
            this.locale = this.sysLocale;
        }
	}

    setLocale(locale) {
        this.locale = locale;
        if (this.locale === 'default') {
            this.locale = this.sysLocale;
        }
    }

	get(str) {
        let res;
		if (typeof strings[this.locale] === 'undefined' || typeof strings[this.locale][str] === 'undefined') {
            res = strings['en'][str];
            console.log('Localization of "' + str + '" in "' + this.locale + '" failed, falling back to English.');
        } else {
            res = strings[this.locale][str];
        }
        return res;
	}

    getLanguages() {
        let languages = {
            "en": "English",
            "zh_CN": "Simplified Chinese",
            "de": "German",
            "pt": "Portuguese"
        };
        for (let language in languages) {
            const localized = this.get(languages[language]);
            if (languages[language] !== localized) languages[language] = localized + ' (' + languages[language] + ')';
        }
        return languages;
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
        "File changed by another program, reload?": "File changed by another program, reload?",

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

        "General": "General",
        "Edit": "Edit",
        "Appearance": "Appearance",
        "Render": "Render",
        "Language": "Language",
        "Reload when file changed": "Reload when file changed",
        "Font": "Editor Font",
        "Font Size": "Font Size",
        "Line Height": "Line Height",
        "Color Theme": "Color Theme",
        "TeX Math Expressions":"TeX Math Expressions",
        "UML Diagrams": "UML Diagrams",
        "Highlight Theme": "Highlight Theme",

        "Default": "Default",
        "System Default": "System Default",

        "version": "version",

        "English": "English",
        "Simplified Chinese": "Simplified Chinese",
        "German": "German",
        "Portuguese": "Portuguese",

        "Auto": "Auto",
        "Prompt": "Prompt",
        "Never": "Never"
	},
    "zh_CN": {
        "New": "新建",
        "Open": "打开",
        "Save": "保存",
        "Save as": "另存为",
        "Export as HTML": "导出为 HTML",
        "Export as PDF": "导出为 PDF",
        "Settings": "设置",
        "About": "关于",

        "Menu": "菜单",
        "Directory": "目录",
        "Toggle focus mode": "切换专注模式",
        "Edit mode": "编辑模式",

        "Write Mode": "写作模式",
        "Read Mode": "阅读模式",
        "Preview Mode": "预览模式",
        "Wide": "宽",
        "Medium": "中等",
        "Narrow": "窄",

        "Yes": "是",
        "No": "否",
        "Cancel": "取消",
        "Confirm": "询问",

        "Save changes to file?": "将修改保存到文件？",
        "File changed by another program, reload?": "文件被另一程序修改，是否重新加载？",

        "Markdown Documents": "Markdown 文档",
        "HTML Documents": "HTML 文档",
        "PDF Documents": "PDF 文档",
        "All Files": "所有文件",
        "Saved successfully.": "保存成功。",
        "Can't save file": "无法保存文件",
        "Exporting as HTML, please wait ...": "正在导出为 HTML，请稍候 ...",
        "Exporting as PDF, please wait ...": "正在导出为 PDF，请稍候 ...",
        "Can't export as HTML": "无法导出为 HTML",
        "Can't export as PDF": "无法导出为 PDF",

        "General": "通用",
        "Edit": "编辑",
        "Appearance": "外观",
        "Render": "渲染",
        "Language": "语言",
        "Reload when file changed": "当文件被修改时，重新加载",
        "Font": "字体",
        "Font Size": "字体大小",
        "Line Height": "行高",
        "Color Theme": "颜色主题",
        "TeX Math Expressions": "TeX 数学表达式",
        "UML Diagrams": "UML 图表",
        "Highlight Theme": "高亮主题",

        "Default": "默认",
        "System Default": "系统默认",

        "version": "版本",

        "English": "英文",
        "Simplified Chinese": "简体中文",
        "German": "德语",
        "Portuguese": "葡萄牙语",

        "Auto": "自动",
        "Prompt": "询问",
        "Never": "从不"
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
