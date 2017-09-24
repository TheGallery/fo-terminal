import React from 'react';
import glamorous from 'glamorous';

const Root = glamorous.div({
  margin: '10px 0 10px 40px',
  display: 'flex',
  alignItems: 'center'
});

const Attempt = glamorous.span({
  width: '10px',
  height: '15px',
  marginLeft: '10px',
  backgroundColor: '#22ca25'
});

function Attempts ({attempts}) {
  return (
    <Root>
      Attempts Remaining:
      {
        Array.from({length: attempts}).map((_, idx) => (
          <Attempt key={idx} />
        ))
      }
    </Root>
  );
}

export default Attempts;
