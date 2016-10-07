import {generateUUID, RandomNameGenerator} from "../utils";
import {PortMapping, RestartPolicy, BaseImage} from "./";

export class Service {
    constructor(name) {
        this._name = name || RandomNameGenerator.getRandomName();
        this._id = generateUUID();
        this._ports = [];
        this._environment = [];
        this._restart = RestartPolicy.NO;
    }

    setBaseImage(image) {
        this._baseImage = new BaseImage(image);
    }

    getBaseImage() {
        return this._baseImage;
    }

    setRestartPolicy(policy) {
        this._restart = RestartPolicy.get(policy);
    }

    getRestartPolicy() {
        return this._restart;
    }

    /**
     * @param {Number} externalPort
     * @param {Number} internalPort
     */
    addPortMapping(externalPort, internalPort) {
        const portMapping = new PortMapping(externalPort, internalPort);
        const externalPortAlreadyUsed = this._ports.some(portMapping => portMapping.externalPort === portMapping.getExternalPort());
        const internalPortAlreadyUsed = this._ports.some(portMapping => portMapping.internalPort === portMapping.getInternalPort());
        if(externalPortAlreadyUsed || internalPortAlreadyUsed) {
            // TODO: what to do, when some of the desired ports are already in use?
        } else {
            this._ports.push(portMapping);
        }
    }

    getPortMappings() {
        return this._ports;
    }
}