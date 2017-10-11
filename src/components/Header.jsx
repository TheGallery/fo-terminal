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
  textAlign: 'center',
  margin: '10px 40px',
  borderBottom: 'dotted 1px'
});

const Title = glamorous.span({
  fontFamily: OverseerFont,
  fontSize: '3rem'
});

const Link = glamorous.a({
  color: 'inherit'
});

function Header () {
  return (
    <Root marginLeft={40} marginTop={40}>
      <Title>Fallout Terminal </Title> 
      by <Link href='http://www.iopsychas.me' target='_blank'>iopsychas</Link>
    </Root>
  );
}

export default Header;
