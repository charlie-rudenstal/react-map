import React from 'react';
import renderer from 'react-test-renderer';
import { ComponentList } from '../../src/components/ComponentList';

describe('ComponentList', () => {
  it('should render correctly', () => {
    const components = [
      { name: "Button", path: "Button.js" },
      { name: "Tab", path: "Tab.js" },
      { name: "Tabs", path: "Tabs.js" }
    ];

    const tree = renderer.create(<ComponentList components={components} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
