import React from 'react';
import './Button.less';

class Button extends React.Component {
  render() {
    return <div className="btn">{this.props.children}</div>;
  }
}

Button.defaultProps = {
  children: 'Button'
};

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
  ])
};

export default Button;
