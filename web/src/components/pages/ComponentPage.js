import React from 'react';
import { withRouter } from 'react-router';
import ComponentDetails from '../ComponentDetails';

function ComponentPage({ params }) {
  const path = params.splat;
  return (
    <div>
      <ComponentDetails path={path} />
    </div>
  );
}

ComponentPage.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default withRouter(ComponentPage);