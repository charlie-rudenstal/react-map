import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import RootPage from './components/RootPage';
import IndexPage from './components/IndexPage';
import ComponentPage from './components/ComponentPage';

ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/" component={RootPage}>
      <IndexRoute component={IndexPage} />
      <Route path="component/:name" component={ComponentPage} />
    </Route>
  </Router>
), document.getElementById('react-root'));
