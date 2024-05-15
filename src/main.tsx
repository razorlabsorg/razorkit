import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SuiWalletProvider } from './components';
import { AptosWalletProvider } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SuiWalletProvider>
        <AptosWalletProvider>
          <App />
        </AptosWalletProvider>
      </SuiWalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
