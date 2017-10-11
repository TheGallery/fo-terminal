import React from 'react';
import ReactDOM from 'react-dom';
import glamorous from 'glamorous';
import 'glamor/reset';

import Terminal from './components/Terminal';
import TinyScreen from './components/TinyScreen';

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
    <TinyScreen />
  </Main>,
  document.getElementById('root')
);
