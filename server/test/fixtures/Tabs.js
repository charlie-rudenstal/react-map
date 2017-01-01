import React from 'react';
import Tab from './Tab';

class Tabs extends React.Component {
  render() {
    const {title, children} = this.props;
    return (
      <div className="tabs">
        <div className="header header--large">{title}</div>
        {children.map((child, i) =>
          <Tab index={i}>{child}</Tab>
        )}
      </div>
    );
  }
}

export default Tabs;
