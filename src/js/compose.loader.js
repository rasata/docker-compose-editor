'use strict';
const YAML = require('yamljs');
const fs = require('fs');
const ComposeLoaderV2 = require('./compose.loader.v2');

export default class ComposeLoader {
    static createFromFile(file) {
        const content = fs.readFileSync(file, 'utf8');
        const yaml = YAML.parse(content);

        if(ComposeLoader._isVersion(yaml, '2')) {
            return new ComposeLoaderV2(yaml, content);
        }

        throw "Unrecognized Docker Compose file.";
    }

    static toYaml(state) {
        console.log(state)
        if(state.version === '2') {
            return YAML.stringify({
                version: '2',
                services: state.services
            }, 10);
        }
    }

    static _isVersion(yaml, version) {
        return yaml.version && yaml.version === version || yaml.services;
    }
};