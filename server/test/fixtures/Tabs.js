import React from 'react';
import Tab from './Tab';
import styles from './Tabs.less';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: this.getTabs()[0] }
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.getTabs = this.getTabs.bind(this);
  }

  handleHeaderClick(e) {
    const index = e.currentTarget.getAttribute('data-index');
    const nextTab = this.getTabs()[index];
    this.setState({ currentTab: nextTab });
  }

  getTabs() {
    return React.Children.toArray(this.props.children);
  }

  render() {
    const {title, children} = this.props;
    return (
      <div className={styles.tabs}>
        <div className="header header--large">{title}</div>
        <div className={styles.headers}>
          {children.map((tab, i) =>
            <div key={tab.props.name}
              className={styles.header}
              onClick={this.handleHeaderClick}
              data-index={i}>
              {tab.props.name}
            </div>
          )}
        </div>
        <div className={styles.content}>
          {this.state.currentTab}
        </div>
      </div>
    );
  }
}

Tabs.defaultProps = {
  children: [
    <Tab name="First">First tab</Tab>,
    <Tab name="Second">Second tab</Tab>,
    <Tab name="Third">Third tab</Tab>
  ]
};

Tabs.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default Tabs;
