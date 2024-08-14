import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import App from './App';
import { store, persistor } from './store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1200}>
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
