# Moeditor
Your all-purpose markdown editor.

Built with Electron.

Visit our [homepage](https://moeditor.github.io/) or download [releases](https://github.com/Moeditor/Moeditor/releases).

# Screenshot
![Moeditor Main](screenshots/main.png)

![Moeditor Side Menu](screenshots/side-menu.png)

![Moeditor About](screenshots/about.png)

![Moeditor Zen Mode](screenshots/zen-mode.png)

# Building
```bash
npm install
npm start
```

# Development
1. Add `--debug` to the command line args:
```bash
npm install
npm start -- --debug
```

2. Set `debug` to `true` in the config. The config file is stored in `~/.config/configstore/Moeditor.json`.

3. `Ctrl` + `Shift` + `I` in Linux / Windows or `Command` + `Option` + `I` in OS X / macOS to toggle devtools for a window.

In China, you may want to replace npm with cnpm for a faster download speed.

```bash
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm install
cnpm start
```

# Todo
* Preference settings dialog
* Custom themes
* Spell check
* Better UI/UX
* \* Document manager
* \* Web publisher
