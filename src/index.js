import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import App from './App';
import store from './states';

import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoadingBar style={{ backgroundColor: '#4338ca' }} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
