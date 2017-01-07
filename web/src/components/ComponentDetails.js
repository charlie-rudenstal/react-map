import React from 'react';
import provideApi from '../lib/provideApi';

export function ComponentDetails({component}) {
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

      <section>
        <h2>Preview</h2>
        <iframe src={`/render/component/${component.path}`} style={{ border: 'none' }} />
      </section>
    </div>
  );
}

ComponentDetails.propTypes = {
  path: React.PropTypes.string.isRequired
};

export default provideApi(ComponentDetails,
  props => `/component/${props.path}`,
  component => ({ component })
);
