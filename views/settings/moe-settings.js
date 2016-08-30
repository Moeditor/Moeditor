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

'use strict';

require('electron-titlebar');

document.addEventListener('DOMContentLoaded', () => {
    window.localized.push(() => {
        const selectLocale = document.querySelector('select[data-key=locale]');
        const languages = moeApp.locale.getLanguages();
        for (let lang in languages) {
            let option = document.createElement('option');
            option.value = lang;
            option.text = languages[lang];
            selectLocale.appendChild(option);
            console.log(moeApp.locale.sysLocale);
            if (lang === moeApp.locale.sysLocale) {
                selectLocale.firstElementChild.text += ' - ' + languages[lang];
            }
        }
        const oldVal = moeApp.config.get('locale');
        selectLocale.value = oldVal;
        selectLocale.addEventListener('change', () => {
            moeApp.locale.setLocale(selectLocale.value);
            window.localized.push(() => {
                const languages = moeApp.locale.getLanguages();
                for (let lang in languages) {
                    selectLocale.querySelector('[value="' + lang + '"]').text = languages[lang];
                    if (lang === moeApp.locale.sysLocale) {
                        selectLocale.firstElementChild.text += ' - ' + languages[lang];
                    }
                }
            });
            ipcRenderer.send('setting-changed', { key: 'locale', val: selectLocale.value });
        });
        require('electron').remote.getCurrentWindow().show();
    });

    // Save settings and send messages
    const ipcRenderer = require('electron').ipcRenderer;

    const items = document.querySelectorAll('.settings-item[data-key]');
    for (const item of items) {
        const key = item.getAttribute('data-key');
        const oldVal = moeApp.config.get(key);
        if (item.tagName === 'SELECT' || item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') {
            if (item.tagName === 'INPUT' && item.type === 'checkbox') item.checked = oldVal;
            else item.value = oldVal;
            item.addEventListener('change', () => {
                let val;
                if (item.tagName === 'INPUT' && item.type === 'checkbox') val = item.checked;
                else val = item.value;
                console.log(key + ': ' + val);
                moeApp.config.set(key, val);
                if (!item.classList.contains('dont-notify')) ipcRenderer.send('setting-changed', { key: key, val: val });
            });
        }
    }

    // Custom render themes
    let renderThemeSelect = document.querySelector('select[data-key="render-theme"]');
    function reloadRenderThemeSelect() {
        renderThemeSelect.querySelectorAll('option:not(.builtin)').forEach((a) => renderThemeSelect.removeChild(a));
        const custom = moeApp.config.get('custom-render-themes');
        for (const x in custom) {
            const option = document.createElement('option');
            option.value = option.text = x;
            renderThemeSelect.appendChild(option);
        }
        renderThemeSelect.value = moeApp.config.get('render-theme');
    }
    let renderThemeButtonAdd = document.querySelector('select[data-key="render-theme"] ~ button.button-add');
    let renderThemeButtonRemove = document.querySelector('select[data-key="render-theme"] ~ button.button-remove');
    function setRenderThemeButtons() {
        if (renderThemeSelect.selectedOptions[0].classList.contains('builtin')) {
            renderThemeButtonRemove.setAttribute('disabled', null);
        } else {
            renderThemeButtonRemove.removeAttribute('disabled');
        }
    }
    setRenderThemeButtons();
    renderThemeSelect.addEventListener('change', setRenderThemeButtons);
    const dialog = require('electron').remote.dialog;
    renderThemeButtonAdd.addEventListener('click', () => {
        dialog.showOpenDialog(window.w, { properties: ['openDirectory', 'multiSelections'] }, (fileNames) => {
            if (!fileNames || fileNames.length === 0) return;
            const a = fileNames.filter((s) => {
                try {
                    return fs.readdirSync(s).includes('style.css');
                } catch (e) {
                    return false;
                }
            });
            let themes = JSON.parse(JSON.stringify(moeApp.config.get('custom-render-themes')));
            for (const s of a) themes[path.basename(s)] = s;
            moeApp.config.set('custom-render-themes', themes);
            console.log(themes);
            reloadRenderThemeSelect();
        });
    });
    renderThemeButtonRemove.addEventListener('click', () => {
        let option = renderThemeSelect.selectedOptions[0];
        if (!option || option.classList.contains('builtin')) return;
        let themes = JSON.parse(JSON.stringify(moeApp.config.get('custom-render-themes')));
        themes[option.value] = undefined;
        moeApp.config.set('custom-render-themes', themes);
        reloadRenderThemeSelect();

        // Reset to default
        moeApp.config.set('render-theme', 'GitHub');
        renderThemeSelect.value = 'GitHub';

        let e = document.createEvent('HTMLEvents');
        e.initEvent('change', false, true);
        renderThemeSelect.dispatchEvent(e);
    });

    // Custom CSSs
    let customCSSsSelect = document.querySelector('select#custom-csss');
    function reloadCustomCSSsSelect() {
        customCSSsSelect.innerHTML = '';
        const custom = moeApp.config.get('custom-csss');
        for (const x in custom) {
            const option = document.createElement('option');
            option.value = option.text = x;
            option.selected = custom[x].selected;
            customCSSsSelect.appendChild(option);
        }
    }
    let customCSSsButtonAdd = document.querySelector('select#custom-csss ~ div button.button-add');
    let customCSSsButtonRemove = document.querySelector('select#custom-csss ~ div button.button-remove');
    function setCustomCSSsButtons() {
        if (customCSSsSelect.selectedOptions.length === 0) {
            customCSSsButtonRemove.setAttribute('disabled', null);
        } else {
            customCSSsButtonRemove.removeAttribute('disabled');
        }
    }
    setCustomCSSsButtons();
    customCSSsSelect.addEventListener('change', setCustomCSSsButtons);
    customCSSsButtonAdd.addEventListener('click', () => {
        dialog.showOpenDialog(window.w, {
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: __('CSS Files'), extensions: ['css'] },
                { name: __('All Files'), extensions: ['*'] }
            ]
        }, (fileNames) => {
            if (!fileNames || fileNames.length === 0) return;
            let csss = JSON.parse(JSON.stringify(moeApp.config.get('custom-csss')));
            for (const s of fileNames) csss[path.basename(s)] = { fileName: s, selected: false };
            moeApp.config.set('custom-csss', csss);
            console.log(csss);
            reloadCustomCSSsSelect();
        });
    });
    customCSSsButtonRemove.addEventListener('click', () => {
        if (customCSSsSelect.selectedOptions.length === 0) return;
        let csss = JSON.parse(JSON.stringify(moeApp.config.get('custom-csss')));
        for (let option of customCSSsSelect.selectedOptions) {
            csss[option.value] = undefined;
        }
        moeApp.config.set('custom-csss', csss);
        reloadCustomCSSsSelect();
        let e = document.createEvent('HTMLEvents');
        e.initEvent('change', false, true);
        customCSSsSelect.dispatchEvent(e);
    });
    customCSSsSelect.addEventListener('change', () => {
        let csss = JSON.parse(JSON.stringify(moeApp.config.get('custom-csss')));
        for (let option of customCSSsSelect.querySelectorAll('option')) {
            csss[option.value].selected = option.selected;
        }
        moeApp.config.set('custom-csss', csss);
        console.log(csss);
        ipcRenderer.send('setting-changed', { key: 'custom-csss', val: csss });
    });
});
