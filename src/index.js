import React, { Component } from 'react';
import {render} from 'react-dom';
import Main from './Components/main';

const root = document.getElementById('root');

let busquedas = JSON.parse(sessionStorage.getItem('names'));
if (busquedas === null) busquedas = { search: [] };

render(<Main  data={busquedas} />,root);