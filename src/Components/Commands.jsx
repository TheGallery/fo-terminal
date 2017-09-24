import React from 'react';
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
        history.map(cmd => (
          <span dangerouslySetInnerHTML={{__html: `>${cmd}`}} />
        ))
      }
      <span dangerouslySetInnerHTML={{__html: `>${command}`}} />
    </Root>
  );
}

export default Commands;
