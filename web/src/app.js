import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import RootPage from './components/pages/RootPage';
import IndexPage from './components/pages/IndexPage';
import ComponentPage from './components/pages/ComponentPage';
import './styles/index.less';

ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/" component={RootPage}>
      <IndexRoute component={IndexPage} />
      <Route path="component/*" component={ComponentPage} />
    </Route>
  </Router>
), document.getElementById('react-root'));
