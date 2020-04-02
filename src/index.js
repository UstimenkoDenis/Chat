import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/'; // если webpack не сказать какой файл искать а просто указать так папку то
// он будет по умолчанию искать index.js и  мы можем использовать это в своей работе


ReactDOM.render(<App/>, document.getElementById('root'));
