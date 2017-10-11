import React, { Component } from 'react';
import glamorous, { Div } from 'glamorous';
import { List } from 'immutable';
import _findIndex from 'lodash/findIndex';

import Header from './Header';
import Attempts from './Attempts';
import Codes from './Codes';
import Commands from './Commands';

import { initTerminal, getLikeness, removeCode } from '../terminal';

const Root = glamorous.div({
  width: '900px',
  height: '700px',
  margin: 'auto 0',
  background: '#2c462b',
  borderRadius: '20% / 10%',
  color: '#22ca25',
  textShadow: '0 0 10px rgba(49, 145, 63, 1)',
  cursor: `url(${process.env.PUBLIC_URL}/cursor.png), auto`,
  border: 'solid 20px #616161',
  boxShadow: '0 15px 5px -5px #273140'
});

const Working = glamorous.div({
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}, ({visible}) => ({ display: visible ? 'flex' : 'none'}));

const MainContainer = glamorous.div({
  margin: '10px 40px 40px 40px',
  flex: '1 1 auto',
  display: 'flex',
  height: '510px'
});

const Terminated = glamorous.div({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}, ({visible}) => ({display: visible ? 'flex' : 'none'}))



class Terminal extends Component {
  state = {
    terminal: initTerminal(),
    attempts: 4,
    command: '',
    history: List([]),
    hacked: false
  };

  // Set the current command to the hovered item
  onCodeHover = (e) => {
    this.setState({
      command: e.type === 'mouseenter' ? e.target.innerHTML : ''
    });
  };

  onCodeClick = (code, type, dataIndex, codeIndex) => {
    switch (type) {
      case 'dudRm':
        this.onDudRmClick(code, dataIndex, codeIndex);
        break;
      case 'password':
        this.onPasswordClick(code)
        break
      default:
        this.setState(({history}) => ({
          history: history.push(code, 'Error.')
        }));
    }
  };

  onDudRmClick = (dudRm, dataIndex, codeIndex) => {
    const terminalState = this.state.terminal;

    // If this dud removal has been used, do nothing
    if (!~terminalState.get('dudRms').indexOf(dudRm)) return;

    // There is a chance the user tries will reset instead of removing a dud
    const isReset = (Math.random() <= 0.1);

    // Remove the dudRm from the terminal
    let terminal = terminalState.withMutations(term => {
      term.updateIn(['data', dataIndex, 'content', 'codes', codeIndex],
        code => removeCode(code)
      ).update('dudRms', dudRms => dudRms.filter(d => d !== dudRm));
    });

    if (isReset) {
      this.setState(({history}) => ({
        attempts: 4,
        history: history.push(dudRm, 'Tries Reset.'),
        terminal
      }));
    } else {
      // Pick a random password to remove
      const password = terminalState.getIn([
        'passwords',
        Math.floor(Math.random() * terminalState.get('passwords').size)
      ]);

      let codeIndex = -1;

      // Find the index of the random password in the data
      const dataIndex = _findIndex(terminalState.get('data').toJS(), data => {
        const idx = data.content.codes.indexOf(password);

        if (!~idx) return false;

        codeIndex = idx;

        return true;
      });

      this.setState(({history}) => ({
        // Update the data with the removed password
        terminal: terminal.withMutations(term => {
          term.updateIn(['data', dataIndex, 'content', 'codes', codeIndex],
            code => removeCode(code, true)
          ).update('passwords', passwords => passwords.filter(p => p !== password))
        }),
        history: history.push(dudRm, 'Dud Removed.')
      }));
    }
  };

  onPasswordClick = (password) => {
    const { terminal } = this.state;

    // If it's a password that has already been removed, do nothing
    if (!~terminal.get('passwords').indexOf(password) &&
          password !== terminal.get('validPassword')) return;

    if (password === terminal.get('validPassword')) {
      this.setState({
        hacked: true
      });
    } else {
      const likeness = getLikeness(terminal.get('validPassword'), password);

      this.setState(({history}) => ({
        attempts: this.state.attempts - 1,
        history: history.push(password, 'Entry denied.', `Likeness=${likeness}`)
      }));
    }
  }

  render () {
    return (
      <Root>
        <Working visible={this.state.attempts && !this.state.hacked}>
          <Header />
          <Div marginLeft='40px'>Password Required</Div>
          <Attempts attempts={this.state.attempts} />
          <MainContainer>
            <Codes
              data={this.state.terminal.get('data')}
              onCodeHover={this.onCodeHover}
              onCodeClick={this.onCodeClick}
            />
            <Commands command={this.state.command} history={this.state.history} />
          </MainContainer>
        </Working>
        <Terminated visible={!this.state.attempts}>
          Oh no. You failed to unlock the terminal :(
        </Terminated>
        <Terminated visible={this.state.hacked}>
          Damn you broke the code. You da hacker.
        </Terminated>
      </Root>
    );
  }
}

export default Terminal;
