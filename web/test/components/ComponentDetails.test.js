import React from 'react';
import renderer from 'react-test-renderer';
import { ComponentDetails } from '../../src/components/ComponentDetails';

describe('ComponentDetails', () => {
  it('should render correctly', () => {
    const component = {
      name: "Tabs",
      dependencies: [
        { name: "React", path: "react" },
        { name: "Tab", path: "./Tab" }
      ],
      children: [
        { name: "div" },
        { name: "Tab" }
      ],
      classNames: [
        { name: "tabs" },
        { name: "header" },
        { name: "header--large" }
      ]
    };

    const tree = renderer.create(<ComponentDetails path='/component/tabs' component={component} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
