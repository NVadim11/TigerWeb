import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import AppRouter from './components/Router'
import { store } from './store'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <>
    	<Provider store={store}>
        <TonConnectUIProvider manifestUrl="https://web.temka.pro/tonconnect-manifest.json">
          <AppRouter />
        </TonConnectUIProvider>
      </Provider>
    </>
  );
}

export default App;
