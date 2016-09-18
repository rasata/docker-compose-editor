import lodash from 'lodash';
import * as C from '../constants';
import ComposeLoader from '../js/compose.loader';

const initialState = {
    services: [],
    activeService: {}
};

export default function (state = initialState, action) {
    const newstate = lodash.cloneDeep(state);

    switch (action.type) {
        case C.ADD_SERVICE:
            newstate.services.push(action.payload);
            return newstate;
        case C.SHOW_SERVICE_DETAILS:
            state.activeService = action.payload;
            return newstate;
        case C.OPEN_FILE:
            const Compose = ComposeLoader.createFromFile(action.payload);
            newstate.services = Compose.getActiveServices();
            return newstate;
        case C.SET_SERVICE_ACTIVE:
            newstate.services[action.payload.serviceName]._inactive = action.payload.active;
            return newstate;
        default:
            return newstate;
    }
}