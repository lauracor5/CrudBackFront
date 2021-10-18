import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'rc-pagination/assets/index.css';
import axios from 'axios';

axios.defaults.baseURL=('http://localhost:4000')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


