import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TituloFilmes from './components/App'; //importando somente a funçao teste do arquivo app.js


ReactDOM.render(
  <React.StrictMode>
    <TituloFilmes />
  </React.StrictMode>,
  document.getElementById('root')
);


