import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import glamorous, { Div } from 'glamorous';

const Root = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  flex: '1 0 75%',
  overflow: 'hidden',
  justifyContent: 'flex-end'
});

const RowData = glamorous.span({
  ':hover': {
    backgroundColor: '#157b17'
  }
});

class Codes extends PureComponent {
  render () {
    const {
      onCodeHover,
      onCodeClick,
      data
    } = this.props;

    return (
      <Root>
        {
          data.map((row, dataIndex) => (
            <Div key={`row-${dataIndex}`} display='flex' marginRight={10}>
              <Div marginRight={10}>{row.get('address')}</Div>
              <div>
                {
                  row.getIn(['content', 'codes']).map((code, codeIndex) => (
                    <RowData
                      key={`code-${dataIndex}-${codeIndex}`}
                      onMouseEnter={onCodeHover}
                      onMouseLeave={onCodeHover}
                      onClick={onCodeClick.bind(null, code, row.getIn(['content', 'type']), dataIndex, codeIndex)}
                    >
                      {code}
                    </RowData>
                  ))
                }
              </div>
            </Div>
          ))
        }
      </Root>
    );
  }
}

Codes.propTypes = {
  onCodeHover: PropTypes.func.isRequired,
  onCodeClick: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Immutable.list).isRequired
}

export default Codes;
