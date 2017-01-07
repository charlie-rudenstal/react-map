import React from 'react';
import Tab from './Tab';

class Tabs extends React.Component {
  render() {
    const {title, children} = this.props;
    return (
      <div className="tabs">
        <div className="header header--large">{title}</div>
        {children.map((tab, i) => <div key={i}>{tab}</div>)}
      </div>
    );
  }
}

Tabs.defaultProps = {
  children: [
    <Tab>First tab</Tab>,
    <Tab>Second tab</Tab>,
    <Tab>Third tab</Tab>
  ]
};

Tabs.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default Tabs;
