import {createStore} from 'redux'

window.ReduxConfig = {
    loadState: () =>  ({
        schemaVersion: 253,
        some:"data",
        debug:{}
    }),
    shouldStoreState: false,
    createStore: (reducers, initialState) => createStore(reducers, initialState)
};