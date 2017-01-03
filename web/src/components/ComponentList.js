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
      <div>
        <div>ComponentList</div>
        <ul>
          {this.state.components.map(component => (
            <li key={component.name}>
              <Link to={`/component/${component.path}`}>
                {component.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}

export default ComponentList;