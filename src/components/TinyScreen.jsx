import React from 'react';
import glamorous from 'glamorous';

const Root = glamorous.div({
  textAlign: 'center',
  display: 'none',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px',
  '@media only screen and (max-width: 950px)': {
    display: 'flex'
  }
});

function TinyScreen () {
  return (
    <Root>
      Hey, this ain' t Watch Dogs. You can only hack this terminal in a reasonably sized monitor.
    </Root>
  );
}

export default TinyScreen;
