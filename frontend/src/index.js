import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GeneralProvider } from './GeneralContext';

ReactDOM.render(
  <GeneralProvider> <App /> </GeneralProvider>,
  document.getElementById('root')
);

