import React from 'react';

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
            <div key={component.name}>
              {component.name}
            </div>
          ))}
        </ul>
      </div>
    );
  }

}

export default ComponentList;