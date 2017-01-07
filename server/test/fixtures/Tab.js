import React from 'react';

const Tab = ({index, children}) => (
  <div>Tab: {children}</div>
);

Tab.defaultProps = {
  children: 'Tab',
  index: 1
};

Tab.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ])
};

export default Tab;
