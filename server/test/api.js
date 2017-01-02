import expect from 'expect';
import request from 'supertest';
import api from '../src/api';

describe('api', () => {
  it('should return a list of all components', done => {
    request(api)
      .get('/components')
      .expect('Content-Type', /json/)
      .expect(200,
      {
        components: [
          { name: "Button", path: "Button.js" },
          { name: "Tab", path: "Tab.js" },
          { name: "Tabs", path: "Tabs.js" }
        ]
      }, done);
  })
  it('should return data about a component', done => {
    request(api)
      .get('/component/Tabs.js')
      .expect('Content-Type', /json/)
      .expect(200,
      {
        name: "Tabs",
        dependencies: [
          { name: "React", path: "react" }, { name: "Tab", path: "./Tab" }
        ],
        children: [
          { name: "div" }, { name: "Tab" }
        ],
        classNames: [
          { name: "tabs" }, { name: "header" }, { name: "header--large" }
        ]
      }, done);
  });
});
