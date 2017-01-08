import React from 'react';
import provideApi from '../lib/provideApi';
import styles from './ComponentDetails.less';

export function ComponentDetails({component}) {
  if (!component) return <div>Fetching component data...</div>;
  return (
    <div className={styles.content}>
      <section className="paper">
        <h2 className="paper__title">Preview</h2>
        <iframe src={`/render/component/${component.path}`} style={{ border: 'none' }} />
      </section>

      <section className="paper">
        <h2 className="paper__title">Children</h2>
        <div>
          {component.children.map(item => (
            <div className="tag" key={item.name}>{item.name}</div>
          ))}
        </div>
      </section>

      <section className="paper">
        <h2 className="paper__title">Class names</h2>
        <div>
          {component.classNames.map(item => (
            <div className="tag" key={item.name}>{item.name}</div>
          ))}
        </div>
      </section>

      <section className="paper">
        <h2 className="paper__title">Dependencies</h2>
        <div>
          {component.dependencies.map(item => (
            <div className="tag" key={item.name}>{item.name} ({item.path})</div>
          ))}
        </div>
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
