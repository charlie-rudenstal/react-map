import React from 'react';

class ComponentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { component: null };
    this.fetchComponent = this.fetchComponent.bind(this);
  }

  componentDidMount() {
    this.fetchComponent(this.props.path);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path === this.props.path) return;
    this.fetchComponent(nextProps.path);
  }

  fetchComponent(path) {
    fetch(`/api/component/${path}`)
      .then(res => {
        if (!res.ok) throw Error(`Could not fetch component ${this.props.path}`);
        return res.json();
      })
      .catch(error => this.setState({error}))
      .then(component => this.setState({component}));
  }

  render() {
    const { component, error } = this.state;
    if (error) return <div>{error.toString()}</div>;
    if (!component) return <div>Fetching component data...</div>;

    return (
      <div>
        <h1>{component.name}</h1>

        <section>
          <h2>Children</h2>
          <ul>
          {component.children.map(item => (
            <li key={item.name}>{item.name}</li>
          ))}
          </ul>
        </section>

        <section>
          <h2>Class names</h2>
          <ul>
          {component.classNames.map(item => (
            <li key={item.name}>{item.name}</li>
          ))}
          </ul>
        </section>

        <section>
          <h2>Dependencies</h2>
          <ul>
          {component.dependencies.map(item => (
            <li key={item.name}>{item.name} ({item.path})</li>
          ))}
          </ul>
        </section>
      </div>
    );
  }
}

ComponentDetails.propTypes = {
  path: React.PropTypes.string.isRequired
};

export default ComponentDetails;
