'use strict';

const fs = require('fs'),
      mime = require('mime');

class MoeditorFile {
    static isFile(fileName) {
        try {
            return fs.statSync(fileName).isFile();
        } catch (e) {
            return false;
        }
    }

    static isTextFile(fileName) {
        try {
            if (!fs.statSync(fileName).isFile()) return false;
            var type = mime.lookup(fileName);
            return type && type.substr(0, 4) === 'text';
        } catch (e) {
            return false;
        }
    }

    static read(fileName, empty) {
        try {
            return fs.readFileSync(fileName);
        } catch(e) {
            return empty;
        }
    }

    static write(fileName, content) {
        return fs.writeFileSync(fileName, content);
    }
}

module.exports = MoeditorFile;
