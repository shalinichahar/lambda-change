import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/App';
import '../shared/index.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';

ReactDOM.hydrate(
  <App name="Client Side" />,
  document.getElementById('root')
);
