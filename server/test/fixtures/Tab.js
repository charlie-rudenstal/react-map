import React from 'react';
import styles from './Tab.less';

const Tab = ({index, children}) => (
  <div className={styles.tab}>{children}</div>
);

Tab.defaultProps = {
  children: 'Tab'
};

Tab.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ])
};

export default Tab;
