import React from 'react';
import provideApi from '../lib/provideApi';
import { withRouter } from 'react-router';

function PropList({component, router}) {
  if (!component) return null;
  console.log('component is', component);
  return (
    <div className="itemlist">
      {component.props.map(({name, type}) => (
        <div className="itemlist__item">
          {name}
        </div>
      ))}
    </div>
  );
}

export default withRouter(provideApi(PropList,
  props => `/component/${props.router.params.splat}`,
  component => ({ component })
));
