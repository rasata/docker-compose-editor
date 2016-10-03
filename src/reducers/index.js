import lodash from "lodash";
import * as C from "../constants";
import ComposeLoader from "../js/compose.loader";
import {ReducerRegistry} from "./reducerRegistry";

const initialState = {
    envVars: {},
    services: [],
    activeService: {}
};

const reducerRegistry = new ReducerRegistry();

export default function (state = initialState, action) {
    const newState = lodash.cloneDeep(state);
    return reducerRegistry.execute(action.type, newState, action);
}

reducerRegistry.addReducer(C.SET_SERVICE_ACTIVE, (state, action) => {
    state.services[action.payload.serviceName]._inactive = action.payload.active;
    return state;
});

reducerRegistry.addReducer(C.UPDATE_SERVICE, (state, action) => {
    state.services[action.payload._name] = action.payload;
    return state;
});

reducerRegistry.addReducer(C.ADD_SERVICE, (state, action) => {
    state.services.push(action.payload);
    return state;
});

reducerRegistry.addReducer(C.SHOW_SERVICE_DETAILS, (state, action) => {
    state.activeService = action.payload;
    return state;
});

reducerRegistry.addReducer(C.OPEN_FILE, (state, action) => {
    const Compose = ComposeLoader.createFromFile(action.payload);
    state.services = Compose.getActiveServices();
    state.version = Compose.getVersion();
    return state;
});

reducerRegistry.addReducer(C.UPDATE_ENV_VARIABLE, (state, action) => {
    delete state.envVars[action.oldKey];
    state.envVars[action.payload.key] = action.payload.env;
    return state;
});

reducerRegistry.addReducer(C.DELETE_ENV_VARIABLE, (state, action) => {
    delete state.envVars[action.payload.key];
    return state;
});

reducerRegistry.addReducer(C.ADD_ENV_VARIABLE, (state, action) => {
    state.envVars[''] = '';
    return state;
});
