import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter';
import PreLoader from 'components/ui/PreLoader';
import React, {StrictMode} from 'react';

const App = ({ store, persistor}) => (
<StrictMode>
    <Provider store={store}>
        <PersistGate loading={<PreLoader/>} persistor={persistor}>
            <AppRouter/>
        </PersistGate>
    </Provider>
</StrictMode>

)

export default App;