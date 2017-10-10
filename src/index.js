import React from 'react';
import ReactDOM from 'react-dom';
import glamorous from 'glamorous';
import 'glamor/reset';

import Terminal from './Components/Terminal';

const Main = glamorous.div({
  minHeight: '100vh',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
  color: '#eee',
  fontSize: '22px',
  fontWeight: 'bold',
  fontFamily: '"Cutive Mono", monospace'
});

ReactDOM.render(
  <Main>
    <Terminal />
  </Main>,
  document.getElementById('root')
);
