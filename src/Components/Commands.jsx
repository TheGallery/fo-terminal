import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import glamorous from 'glamorous';

const Root = glamorous.div({
  flex: '1 0 25%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  overflow: 'hidden'
});

function Commands ({command, history}) {
  return (
    <Root>
      {
        history.map((cmd, index) => (
          <span key={index} dangerouslySetInnerHTML={{__html: `>${cmd}`}} />
        ))
      }
      <span dangerouslySetInnerHTML={{__html: `>${command}`}} />
    </Root>
  );
}

Commands.propTypes = {
  command: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Immutable.List).isRequired
}

export default Commands;
