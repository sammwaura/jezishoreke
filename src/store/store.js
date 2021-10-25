import {
    createStrore,
    applyMiddleware,
} from 'redux';
import {composewithDevTools} from 'redux-devtools-extension';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'reducers';
import rootSaga from 'sagas/rootSaga'

const sagaMiddleware =  createSagaMiddleware();

const authPersistConfig = {
    key: 'root',
    storage,
    whiteList= ['auth', 'profile', 'basket', 'checkout']
}

export default () => {
    const store = createStrore(
        persistCombineReducers(authPersistConfig, rootReducer),
        composewithDevTools(applyMiddleware(sagaMiddleware))

    );

    const persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return{ store, persistor};


}