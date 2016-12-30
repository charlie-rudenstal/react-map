import expect from 'expect';
import mapper from '../src/Mapper';

describe('react map', () => {

  it('should list all components', () => {
    return mapper.getComponentList('./fixtures').then(components => {
      expect(components.length).toBe(3);
      expect(components).toInclude({name: 'Button', path: './fixtures/Button.js'});
      expect(components).toInclude({name: 'Tabs', path: './fixtures/Tabs.js'});
      expect(components).toInclude({name: 'Tab', path: './fixtures/Tab.js'});
    })
  });

});