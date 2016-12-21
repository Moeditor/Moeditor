/*
*  This file is part of Moeditor.
*
*  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
*  Copyright (c) 2016 lucaschimweg
*  Copyright (c) 2016 douglaseccker
*  Copyright (c) 2016 PifyZ
*  Copyright (c) 2016 Hyuchia
*  Copyright (c) 2016 welksonramos
*  Copyright (c) 2016 caiocdasilva
*  Copyright (c) 2016 lawgsy <lawgsy@gmail.com>
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
*   - pt: douglaseccker & welksonramos & caiocdasilva
*   - fr: PifyZ
*   - es: Hyuchia
*   - nl: lawgsy
*   - it: iamsisar
*
*  If you want to help translate this app, please copy the `en` items of the
*  `strings` constant as the template, and fill each item with the translated
*  string. The `_name` item in a language is the language's name.
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
        let languages = {};
        for (let lang in strings) languages[lang] = strings[lang]._name;
        return languages;
    }
}

module.exports = MoeditorLocale;

const strings = {
	"en": {
        "_name": "English",

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
        "CSS Files": "CSS Files",
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
        "Tab Size": "Tab Size",
        "Color Theme": "Color Theme",
        "TeX Math Expressions":"TeX Math Expressions",
        "UML Diagrams": "UML Diagrams",
        "Brakes": "Brakes",
        "Highlight Theme": "Highlight Theme",
        "Render Theme": "Render Theme",
        "Custom CSSs": "Custom CSSs",

        "Default": "Default",
        "System Default": "System Default",

        "version": "version",

        "Auto": "Auto",
        "Prompt": "Prompt",
        "Never": "Never",

        "Undo": "Undo",
        "Redo": "Redo",
        "Cut": "Cut",
        "Copy": "Copy",
        "Paste": "Paste",
        "Delete": "Delete",
        "Select All": "Select All",

        "Services": "Services",
        "Hide": "Hide",
        "Hide Others": "Hide Others",
        "Show All": "Show All",
        "Quit": "Quit",
        "Close": "Close",
        "Minimize": "Minimize",
        "Zoom": "Zoom",
        "Bring All to Front": "Bring All to Front",
        "File": "File",
        "Export": "Export",
        "Mode": "Mode",
        "View": "View",
        "Window": "Window",
        "Help": "Help",
        "Toggle Developer Tools": "Toggle Developer Tools",
        "Preference": "Preference"
	},
    "zh_CN": {
        "_name": "简体中文",

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
        "CSS Files": "CSS 文件",
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
        "Tab Size": "Tab 大小",
        "Color Theme": "颜色主题",
        "TeX Math Expressions": "TeX 数学表达式",
        "UML Diagrams": "UML 图表",
        "Brakes": "Brakes",
        "Highlight Theme": "高亮主题",
        "Render Theme": "渲染主题",
        "Custom CSSs": "自定义 CSS",

        "Default": "默认",
        "System Default": "系统默认",

        "version": "版本",

        "Auto": "自动",
        "Prompt": "询问",
        "Never": "从不",

        "Undo": "撤销",
        "Redo": "重做",
        "Cut": "剪切",
        "Copy": "复制",
        "Paste": "粘贴",
        "Delete": "删除",
        "Select All": "全选",

        "Services": "服务",
        "Hide": "隐藏",
        "Hide Others": "隐藏其他",
        "Show All": "显示全部",
        "Quit": "退出",
        "Close": "关闭",
        "Minimize": "最小化",
        "Zoom": "缩放",
        "Bring All to Front": "前置全部窗口",
        "File": "文件",
        "Export": "导出",
        "Mode": "模式",
        "View": "查看",
        "Window": "窗口",
        "Help": "帮助",
        "Toggle Developer Tools": "切换开发者工具",
        "Preference": "偏好设置"
    },
	"de": {
        "_name": "Deutsch",

        "New": "Neu",
        "Open": "Öffnen",
        "Save": "Speichern",
        "Save as": "Speichern als...",
        "Export as HTML": "Als HTML exportieren",
        "Export as PDF": "Als PDF exportieren",
        "Settings": "Einstellungen",
        "About": "Über",

        "Menu": "Menü",
        "Directory": "Ordner",
        "Toggle focus mode": "Fokusmodus umschalten",
        "Edit mode": "Bearbeitungsmodus",

        "Write Mode": "Schreibmodus",
        "Read Mode": "Lesemodus",
        "Preview Mode": "Vorschaumodus",
        "Wide": "Breit",
        "Medium": "Normal",
        "Narrow": "Schmal",

        "Yes": "Ja",
        "No": "Nein",
        "Cancel": "Abbrechen",
        "Confirm": "Bestätigen",

        "Save changes to file?": "Änderungen in Datei speichern?",
        "File changed by another program, reload?": "Dateien von anderem Programm geändert, neu laden?",

        "Markdown Documents": "Markdown Dokumente",
        "HTML Documents": "HTML Dokumente",
        "PDF Documents": "PDF Dokumente",
        "CSS Files": "CSS Dateien",
        "All Files": "Alle Dateien",
        "Saved successfully.": "Speichern erfolgreich.",
        "Can't save file": "Datei kann nicht gespeichert werden.",
        "Exporting as HTML, please wait ...": "Wird als HTML exportiert, bitte warten ...",
        "Exporting as PDF, please wait ...": "Wird als HTML exportiert, bitte warten ...",
        "Can't export as HTML": "Kann nicht als HTML exporiert werden.",
        "Can't export as PDF": "Kann nicht als PDF exporiert werden.",

        "General": "Allgemein",
        "Edit": "Bearbeiten",
        "Appearance": "Aussehen",
        "Render": "Rendern",
        "Language": "Sprache",
        "Reload when file changed": "Neu laden wenn Datei geändert",
        "Font": "Editor Schriftart",
        "Font Size": "Schriftgröße",
        "Line Height": "Zeilenhöhe",
        "Tab Size": "Tabgröße",
        "Color Theme": "Farbthema",
        "TeX Math Expressions":"TeX Mathematikausdrücke",
        "UML Diagrams": "UML Diagramme",
        "Brakes": "Brakes",
        "Highlight Theme": "Highlight-Thema",
        "Render Theme": "Renderthema",
        "Custom CSSs": "Benutzerdefiniertes CSS",

        "Default": "Standart",
        "System Default": "Systemstandart",

        "version": "Version",

        "Auto": "Automatisch",
        "Prompt": "Fragen",
        "Never": "Nie",

        "Undo": "Rückgängig machen",
        "Redo": "Wiederholen",
        "Cut": "Ausscheiden",
        "Copy": "Kopieren",
        "Paste": "Einfügen",
        "Delete": "Löschen",
        "Select All": "Alles auswählen",

        "Services": "Services",
        "Hide": "Verstecken",
        "Hide Others": "Andere Verstecken",
        "Show All": "Alle zeigen",
        "Quit": "Beenden",
        "Close": "Schließen",
        "Minimize": "Minimieren",
        "Zoom": "Zoom",
        "Bring All to Front": "Alle anzeigen",
        "File": "Datei",
        "Export": "Exportieren",
        "Mode": "Modus",
        "View": "Ansicht",
        "Window": "Fenster",
        "Help": "Hilfe",
        "Toggle Developer Tools": "Entwicklereinstellungen umschalten",
        "Preference": "Einstellung"
	},
	"pt": {
        "_name": "Português",

        "New": "Novo",
        "Open": "Abrir",
        "Save": "Salvar",
        "Save as": "Salvar como",
        "Export as HTML": "Exportar como HTML",
        "Export as PDF": "Exportar como PDF",
        "Settings": "Configurações",
        "About": "Sobre",

        "Menu": "Menu",
        "Directory": "Diretório",
        "Toggle focus mode": "Alternar para o modo foco",
        "Edit mode": "Editar modo",

        "Write Mode": "Modo Escrita",
        "Read Mode": "Modo Leitura",
        "Preview Mode": "Mode de Pré-visualização",
        "Wide": "Largo",
        "Medium": "Médio",
        "Narrow": "Estreito",

        "Yes": "Sim",
        "No": "Não",
        "Cancel": "Cancelar",
        "Confirm": "Confirmar",

        "Save changes to file?": "Salvar as alterações no arquivo?",
        "File changed by another program, reload?": "Arquivo modificado por outro programa, recarregar?",

        "Markdown Documents": "Documentos Markdown",
        "HTML Documents": "Documentos HTML",
        "PDF Documents": "Documentos PDF",
        "CSS Files": "Arquivos CSS",
        "All Files": "Todos os Arquivos",
        "Saved successfully.": "Salvo com sucesso",
        "Can't save file": "Não é possível salvar o arquivo",
        "Exporting as HTML, please wait ...": "Exportando como HTML, aguarde ...",
        "Exporting as PDF, please wait ...": "Exportando como PDF, aguarde...",
        "Can't export as HTML": "Não é possível exportar como HTML",
        "Can't export as PDF": "Não é possível exportar como PDF",

        "General": "Geral",
        "Edit": "Editar",
        "Appearance": "Aparência",
        "Render": "Renderização",
        "Language": "Idioma",
        "Reload when file changed": "Recarregar quando o arquivo for alterado",
        "Font": "Fonte",
        "Font Size": "Tamanho da Fonte",
        "Line Height": "Altura da Linha",
        "Tab Size": "Tamanho da Tabulação",
        "Color Theme": "Tema",
        "TeX Math Expressions":"Expressões TeX Math",
        "UML Diagrams": "Diagramas UML",
        "Brakes": "Brakes",
        "Highlight Theme": "Tema de Sintaxe",
        "Render Theme": "Tema de Renderização",
        "Custom CSSs": "CSSs Personalizados",

        "Default": "Padrão",
        "System Default": "Padrão do Sistema",

        "version": "versão",

        "Auto": "Automático",
        "Prompt": "Perguntar",
        "Never": "Nunca",

        "Undo": "Desfazer",
        "Redo": "Refazer",
        "Cut": "Cortar",
        "Copy": "Copiar",
        "Paste": "Colar",
        "Delete": "Excluir",
        "Select All": "Selecionar Tudo",

        "Services": "Serviços",
        "Hide": "Ocultar",
        "Hide Others": "Ocultar Outros",
        "Show All": "Exibir Tudo",
        "Quit": "Sair",
        "Close": "Fechar",
        "Minimize": "Minimizar",
        "Zoom": "Zoom",
        "Bring All to Front": "Trazer todas para frente",
        "File": "Arquivo",
        "Export": "Exportar",
        "Mode": "Modo",
        "View": "Visualizar",
        "Window": "Janela",
        "Help": "Ajuda",
        "Toggle Developer Tools": "Alternar Ferramentas de Desenvolvimento",
        "Preference": "Preferências"
	},
	"fr": {
        "_name": "Français",

        "New": "Nouveau",
        "Open": "Ouvrir",
        "Save": "Enregistrer",
        "Save as": "Enregistrer sous",
        "Export as HTML": "Exporter comme HTML",
        "Export as PDF": "Exporter comme PDF",
        "Settings": "Paramètres",
        "About": "À propos",

        "Menu": "Menu",
        "Directory": "Répertoire",
        "Toggle focus mode": "Basculer en mode focus",
        "Edit mode": "Mode édition",

        "Write Mode": "Mode écriture",
        "Read Mode": "Mode lecture",
        "Preview Mode": "Mode prévisualisation",
        "Wide": "Large",
        "Medium": "Moyen",
        "Narrow": "Étroit",

        "Yes": "Oui",
        "No": "Non",
        "Cancel": "Annuler",
        "Confirm": "Confirmer",

        "Save changes to file?": "Enregistrer les changements?",
        "File changed by another program, reload?": "Fichier modifié par un autre programme, recharger?",

        "Markdown Documents": "Documents Markdown",
        "HTML Documents": "Documents HTML",
        "PDF Documents": "Documents PDF",
        "CSS Files": "Fichiers CSS",
        "All Files": "Tous les fichiers",
        "Saved successfully.": "Enregistrement réussi.",
        "Can't save file": "Impossible d'enregistrer le fichier",
        "Exporting as HTML, please wait ...": "Exportation au format HTML, veuillez patienter...",
        "Exporting as PDF, please wait ...": "Exportation au format PDF, veuillez patienter...",
        "Can't export as HTML": "Ne peut pas être exporté au format HTML",
        "Can't export as PDF": "Ne peut pas être exporté au format PDF",

        "General": "Général",
        "Edit": "Édition",
        "Appearance": "Apparence",
        "Render": "Rendu",
        "Language": "Langue",
        "Reload when file changed": "Recharger quand le fichier est modifié",
        "Font": "Police",
        "Font Size": "Taille de la police",
        "Line Height": "Hauteur de ligne",
        "Tab Size": "Taille de tabulation",
        "Color Theme": "Couleur du thème",
        "TeX Math Expressions": "Expressions TeX Math",
        "UML Diagrams": "Diagrammes UML",
        "Brakes": "Brakes",
        "Highlight Theme": "Thème de coloration syntaxique",
        "Render Theme": "Thème de rendu",
        "Custom CSSs": "CSS personnalisés",

        "Default": "Par défaut",
        "System Default": "Par défaut du système",

        "version": "version",

        "Auto": "Automatique",
        "Prompt": "Demander",
        "Never": "Jamais",

        "Undo": "Annuler",
        "Redo": "Refaire",
        "Cut": "Couper",
        "Copy": "Copier",
        "Paste": "Coller",
        "Delete": "Supprimer",
        "Select All": "Tout sélectionner",

        "Services": "Services",
        "Hide": "Cacher",
        "Hide Others": "Cacher les autres",
        "Show All": "Afficher tout",
        "Quit": "Quitter",
        "Close": "Fermer",
        "Minimize": "Minimiser",
        "Zoom": "Zoom",
        "Bring All to Front": "Mettre tout à l'avant",
        "File": "Fichier",
        "Export": "Exportation",
        "Mode": "Mode",
        "View": "Voir",
        "Window": "Fenêtre",
        "Help": "Aide",
        "Toggle Developer Tools": "Basculer vers les outils développeurs",
        "Preference": "Préférence"
	},
	"es": {
        "_name": "Español",

        "New": "Nuevo",
        "Open": "Abrir",
        "Save": "Guardar",
        "Save as": "Guardar como",
        "Export as HTML": "Exportar como HTML",
        "Export as PDF": "Exportar como PDF",
        "Settings": "Configuración",
        "About": "Acerca de",

        "Menu": "Menú",
        "Directory": "Directorio",
        "Toggle focus mode": "Activar modo de concentración",
        "Edit mode": "Modo de edición",

        "Write Mode": "Modo de Escritura",
        "Read Mode": "Modo de Lectura",
        "Preview Mode": "Modo de Previsualización",
        "Wide": "Amplio",
        "Medium": "Medio",
        "Narrow": "Estrecho",

        "Yes": "Sí",
        "No": "No",
        "Cancel": "Cancelar",
        "Confirm": "Confirmar",

        "Save changes to file?": "¿Guardar cambios?",
        "File changed by another program, reload?": "El Archivo ha sido modificado por otro programa, ¿desea recargarlo?",

        "Markdown Documents": "Documentos Markdown",
        "HTML Documents": "Documentos HTML",
        "PDF Documents": "Documentos PDF",
        "CSS Files": "Archivos CSS",
        "All Files": "Todos los Archivos",
        "Saved successfully.": "Guardado Exitosamente.",
        "Can't save file": "El archivo no pudo ser guardado",
        "Exporting as HTML, please wait ...": "Exportando como HTML, por favor espere...",
        "Exporting as PDF, please wait ...": "Exportando como PDF, por favor espere...",
        "Can't export as HTML": "No se puede exportar como HTML",
        "Can't export as PDF": "No se puede exportar como PDF",

        "General": "General",
        "Edit": "Editar",
        "Appearance": "Apariencia",
        "Render": "Renderización",
        "Language": "Lenguaje",
        "Reload when file changed": "Recargar cuando el archivo haya sido modificado",
        "Font": "Tipografía del Editor",
        "Font Size": "Tamaño de la Letra",
        "Line Height": "Interlineado",
        "Tab Size": "Tamaño de Tabulación",
        "Color Theme": "Tema de Color",
        "TeX Math Expressions":"Expresiones de TeX Math",
        "UML Diagrams": "Diagramas UML",
        "Brakes": "Brakes",
        "Highlight Theme": "Tema de Syntaxis",
        "Render Theme": "Tema de Renderización",
        "Custom CSSs": "CSSs Personalizados",

        "Default": "Predeterminado",
        "System Default": "Predeterminado del Sistema",

        "version": "versión",

        "Auto": "Auto",
        "Prompt": "Mensaje",
        "Never": "Nunca",

        "Undo": "Deshacer",
        "Redo": "Rehacer",
        "Cut": "Cortar",
        "Copy": "Copiar",
        "Paste": "Pegar",
        "Delete": "Borrar",
        "Select All": "Seleccionar Todo",

        "Services": "Servicios",
        "Hide": "Esconder",
        "Hide Others": "Esconder Otros",
        "Show All": "Mostrar Todo",
        "Quit": "Salir",
        "Close": "Cerrar",
        "Minimize": "Minimizar",
        "Zoom": "Zoom",
        "Bring All to Front": "Traer Todo al Frente",
        "File": "Archivo",
        "Export": "Exportar",
        "Mode": "Modo",
        "View": "Ver",
        "Window": "Ventana",
        "Help": "Ayuda",
        "Toggle Developer Tools": "Activar Herramientas de Desarrollador",
        "Preference": "Preferencias"
    },
	"nl": {
        "_name": "Nederlands",

        "New": "Nieuw",
        "Open": "Open",
        "Save": "Opslaan",
        "Save as": "Opslaan als",
        "Export as HTML": "Exporteren als HTML",
        "Export as PDF": "Exporteren als PDF",
        "Settings": "Instellingen",
        "About": "Over",

        "Menu": "Menu",
        "Directory": "Map",
        "Toggle focus mode": "Focus modus aan-/uitzetten",
        "Edit mode": "Bewerk modus",

        "Write Mode": "Schrijf Modus",
        "Read Mode": "Lees Modus",
        "Preview Mode": "Voorbeeld Modus",
        "Wide": "Breed",
        "Medium": "Gemiddeld",
        "Narrow": "Smal",

        "Yes": "Ja",
        "No": "Nee",
        "Cancel": "Annuleren",
        "Confirm": "Bevestigen",

        "Save changes to file?": "Wijzigingen aan bestand opslaan?",
        "File changed by another program, reload?": "Bestand is gewijzigd door een ander programma, herladen?",

        "Markdown Documents": "Markdown Documenten",
        "HTML Documents": "HTML Documenten",
        "PDF Documents": "PDF Documenten",
        "CSS Files": "CSS Bestanden",
        "All Files": "Alle Bestanden",
        "Saved successfully.": "Succesvol opgeslagen.",
        "Can't save file": "Kan bestand niet opslaan",
        "Exporting as HTML, please wait ...": "Exporteren als HTML, even geduld alstublieft ...",
        "Exporting as PDF, please wait ...": "Exporteren als PDF, even geduld alstublieft ...",
        "Can't export as HTML": "Kan niet exporteren als HTML",
        "Can't export as PDF": "Kan niet exporteren als PDF",

        "General": "Algemeen",
        "Edit": "Bewerken",
        "Appearance": "Uiterlijk",
        "Render": "Renderen",
        "Language": "Taal",
        "Reload when file changed": "Herladen wanneer het bestand is gewijzigd",
        "Font": "Lettertype",
        "Font Size": "Lettertypegrootte",
        "Line Height": "Regelhoogte",
        "Tab Size": "Tabbreedte",
        "Color Theme": "Kleurthema",
        "TeX Math Expressions":"TeX Math Expressies",
        "UML Diagrams": "UML Diagrammen",
        "Brakes": "Brakes",
        "Highlight Theme": "Highlight Thema",
        "Render Theme": "Render Thema",
        "Custom CSSs": "Aangepaste CSSen",

        "Default": "Standaard",
        "System Default": "Systeemstandaard",

        "version": "versie",

        "Auto": "Automatisch",
        "Prompt": "Vragen",
        "Never": "Nooit",

        "Undo": "Ongedaan maken",
        "Redo": "Herhalen",
        "Cut": "Knippen",
        "Copy": "Kopiëren",
        "Paste": "Plakken",
        "Delete": "Verwijderen",
        "Select All": "Alles Selecteren",

        "Services": "Diensten",
        "Hide": "Verstoppen",
        "Hide Others": "Verstop Anderen",
        "Show All": "Alles tonen",
        "Quit": "Afsluiten",
        "Close": "Sluiten",
        "Minimize": "Minimaliseren",
        "Zoom": "Zoom",
        "Bring All to Front": "Alles naar Voren Brengen",
        "File": "Bestand",
        "Export": "Exporteer",
        "Mode": "Modus",
        "View": "Beeld",
        "Window": "Venster",
        "Help": "Help",
        "Toggle Developer Tools": "Developer Tools aan-/uitzetten",
        "Preference": "Voorkeur"
	},
    "it": {
        "_name": "Italian",

        "New": "Nuovo",
        "Open": "Apri",
        "Save": "Salva",
        "Save as": "Save con nome",
        "Export as HTML": "Esporta come HTML",
        "Export as PDF": "Esporta come PDF",
        "Settings": "Impostazioni",
        "About": "About",

        "Menu": "Menu",
        "Directory": "Directory",
        "Toggle focus mode": "Attiva modalità concentrazione",
        "Edit mode": "Modalità modifica",

        "Write Mode": "Modalità scrittura",
        "Read Mode": "Modalità lettura",
        "Preview Mode": "Modalità anteprima",
        "Wide": "Largo",
        "Medium": "Medio",
        "Narrow": "Stretto",

        "Yes": "Sì",
        "No": "No",
        "Cancel": "Annulla",
        "Confirm": "Conferma",

        "Save changes to file?": "Salvare le modifiche apportate al file?",
        "File changed by another program, reload?": "Il file è stato modificato da un altro programma, vuoi caricare le nuove modifiche",

        "Markdown Documents": "Documenti Markdown",
        "HTML Documents": "Documenti HTML",
        "PDF Documents": "Documenti PDF",
        "CSS Files": "File CSS",
        "All Files": "Tutti i file",
        "Saved successfully.": "Salvataggio eseguito",
        "Can't save file": "Impossibile salvare il file",
        "Exporting as HTML, please wait ...": "Esportazione HTML in corso, attendere...",
        "Exporting as PDF, please wait ...": "Esportazione PDF in corso, attendere...",
        "Can't export as HTML": "Impossibile esportare in HTML",
        "Can't export as PDF": "Impossibile esportare in PDF",

        "General": "Generale",
        "Edit": "Modifica",
        "Appearance": "Aspetto",
        "Render": "Render",
        "Language": "Lingua",
        "Reload when file changed": "Ricarica quando il file cambia",
        "Font": "Carattere dell'editor",
        "Font Size": "Dimensione carattere",
        "Line Height": "Interlinea",
        "Tab Size": "Tabulazione",
        "Color Theme": "Tema colori",
        "TeX Math Expressions":"Espressioni Tex Math",
        "UML Diagrams": "Diagrammi UML",
        "Brakes": "Brakes",
        "Highlight Theme": "Highlight Theme",
        "Render Theme": "Tema di render",
        "Custom CSSs": "CSS personalizzato",

        "Default": "Predefinito",
        "System Default": "Predefinito dal Sistema",

        "version": "versione",

        "Auto": "Automatico",
        "Prompt": "Chiedi",
        "Never": "Mai",

        "Undo": "Undo",
        "Redo": "Redo",
        "Cut": "Taglia",
        "Copy": "Copia",
        "Paste": "Incolla",
        "Delete": "Cancella",
        "Select All": "Seleziona tutto",

        "Services": "Servizi",
        "Hide": "Nascondi",
        "Hide Others": "Nascondi altri",
        "Show All": "Visualizza tutti",
        "Quit": "Esci",
        "Close": "Chiudi",
        "Minimize": "Riduci",
        "Zoom": "Zoom",
        "Bring All to Front": "Porta tutti in cima",
        "File": "File",
        "Export": "Esporta",
        "Mode": "Modalità",
        "View": "Vedi",
        "Window": "Finestra",
        "Help": "Aiuto",
        "Toggle Developer Tools": "Attiva strumenti per sviluppatori",
        "Preference": "Preferenza"
    },
    "ru": {
        "_name": "Русский",

        "New": "Создать",
        "Open": "Открыть",
        "Save": "Сохранить",
        "Save as": "Сохранить как",
        "Export as HTML": "Экспорт в HTML",
        "Export as PDF": "Экспорт в PDF",
        "Settings": "Настройки",
        "About": "О программе",

        "Menu": "Меню",
        "Directory": "Папка",
        "Toggle focus mode": "Переключить режим фокусировки",
        "Edit mode": "Выбрать режим",

        "Write Mode": "Правка",
        "Read Mode": "Чтение",
        "Preview Mode": "Предпросмотр",
        "Wide": "Широкий",
        "Medium": "Средний",
        "Narrow": "Компактный",

        "Yes": "Да",
        "No": "Нет",
        "Cancel": "Отмена",
        "Confirm": "Подтверждение",

        "Save changes to file?": "Сохранить изменения?",
        "File changed by another program, reload?": "Файл был изменен в другой программе, обновить содержимое?",

        "Markdown Documents": "Markdown-документы",
        "HTML Documents": "HTML-документы",
        "PDF Documents": "PDF-документы",
        "CSS Files": "CSS-файлы",
        "All Files": "Все файлы",
        "Saved successfully.": "Файл сохранен.",
        "Can't save file": "Не удалось сохранить файл",
        "Exporting as HTML, please wait ...": "Идет экспорт в HTML, пожалуйста, подождите...",
        "Exporting as PDF, please wait ...": "Идет экспорт в PDF, пожалуйста, подождите...",
        "Can't export as HTML": "Не удалось выполнить экспорт в HTML",
        "Can't export as PDF": "Не удалось выполнить экспорт в PDF",

        "General": "Основные",
        "Edit": "Правка",
        "Appearance": "Внешний вид",
        "Render": "Визуализация",
        "Language": "Язык",
        "Reload when file changed": "Обновление содержимого при изменении файла",
        "Font": "Шрифт редактора",
        "Font Size": "Размер шрифта",
        "Line Height": "Высота строк",
        "Tab Size": "Размер табуляции",
        "Color Theme": "Цветовая тема",
        "TeX Math Expressions": "Выражения TeX",
        "UML Diagrams": "Диаграммы UML",
        "Brakes": "Brakes",
        "Highlight Theme": "Тема подсветки кода",
        "Render Theme": "Тема визуализации",
        "Custom CSSs": "Пользовательский CSS",

        "Default": "По умолчанию",
        "System Default": "Системный",

        "version": "версия",

        "Auto": "Всегда",
        "Prompt": "Спрашивать",
        "Never": "Никогда",

        "Undo": "Отменить",
        "Redo": "Вернуть",
        "Cut": "Вырезать",
        "Copy": "Копировать",
        "Paste": "Вставить",
        "Delete": "Удалить",
        "Select All": "Выделить все",

        "Services": "Службы",
        "Hide": "Скрыть",
        "Hide Others": "Скрыть остальные",
        "Show All": "Показать все",
        "Quit": "Выход",
        "Close": "Закрыть",
        "Minimize": "Свернуть",
        "Zoom": "Масштаб",
        "Bring All to Front": "Показать все",
        "File": "Файл",
        "Export": "Экспорт",
        "Mode": "Режим",
        "View": "Просмотр",
        "Window": "Окно",
        "Help": "Помощь",
        "Toggle Developer Tools": "Показать/скрыть инструменты разработчика",
        "Preference": "Настройка"
    },
}
