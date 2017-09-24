import React from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';

const OverseerFont = css.fontFace({
  fontFamily: 'Overseer',
  src: `url('${process.env.PUBLIC_URL}/fonts/Overseer Bold Italic.otf') format('opentype')`,
  fontWeight: 'bold',
  fontStyle: 'italic'
});

const Root = glamorous.div({
  fontFamily: OverseerFont,
  fontSize: '3rem',
  textAlign: 'center',
  textTransform: 'uppercase',
  margin: '10px 0'
});

function Header () {
  return (
    <Root>
      Fallout Terminal
    </Root>
  );
}

export default Header;
