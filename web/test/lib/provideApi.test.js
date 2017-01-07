import React from 'react';
import fetchMock from 'fetch-mock';
import provideApi from '../../src/lib/provideApi';
import { mount } from 'enzyme';

jest.useRealTimers();

describe('provideApi', () => {

  afterEach(fetchMock.restore);

  it('should fetch the given URL string', () => {
    // Mock fetch
    fetchMock.get('/api/components', {});

    // Create api provider
    const Child = () => <div></div>;
    const Component = provideApi(Child, '/components');

    // Simulate componentDidMount
    const component = new Component();
    component.componentDidMount();

    // Make sure that it fetched the right URL
    expect(fetchMock.called('/api/components')).toBe(true);

    // Make sure that the fetch won't trigger setState
    component.componentWillUnmount();
  });

  it('should fetch the given URL from mapPropsToUrl', () => {
    // Mock fetch
    fetchMock.get('/api/component/Tabs.js', {});

    // Create api provider
    const Child = () => <div></div>;
    const Component = provideApi(Child, props => `/component/${props.path}`);

    // Simulate componentDidMount
    const component = new Component({ path: 'Tabs.js' });
    component.componentDidMount();

    // Make sure that it fetched the right URL
    expect(fetchMock.called('/api/component/Tabs.js')).toBe(true);

    // Make sure that the fetch won't trigger setState
    component.componentWillUnmount();
  });

  it('should pass the response on as prop to the child', () => {
    // Mock fetch
    fetchMock.get('/api/getFoo', { foo: '1234' });

    let renderCount = 0;
    return new Promise(resolve => {
      const Child = (props) => {
        if (renderCount === 0) {
          expect(props.foo).toBe('Loading');
        }
        if (renderCount === 1) {
          expect(props.foo).toBe('1234');
          resolve();
        }
        renderCount++;
        return <div />;
      };
      const Component = provideApi(Child,
        '/getFoo',
        res => ({ foo: res ? res.foo : 'Loading' })
      )
      const wrapper = mount(<Component />);
      expect(fetchMock.called('/api/getFoo')).toBe(true);
    });
  });
});
