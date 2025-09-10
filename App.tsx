import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/redux/store';
import Routes from './src/routes/routes';

const App = () => {
  return (
    <ToastProvider>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <MenuProvider>
            <Routes />
          </MenuProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

export default App;
