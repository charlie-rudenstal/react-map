import React from 'react';
import { Link } from 'react-router';

class ComponentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {components: []};
  }

  componentDidMount() {
    fetch('/api/components')
      .then(res => res.json())
      .then(({components}) => {
        this.setState({components});
      });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar__title">Components</div>
        <div className="navbar__items">
          {this.state.components.map(component => (
            <Link to={`/component/${component.path}`}
              className="navbar__item"
              activeClassName="navbar__item--active">
              {component.name}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

}

export default ComponentList;