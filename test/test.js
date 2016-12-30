import expect from 'expect';
import mapper from '../src/Mapper';

describe('react map', () => {

  it('should list all components', () => {
    return mapper.getComponents('./fixtures').then(components => {
      expect(components.length).toBe(3);
      expect(components).toInclude({name: 'Button', path: './fixtures/Button.js'});
      expect(components).toInclude({name: 'Tabs', path: './fixtures/Tabs.js'});
      expect(components).toInclude({name: 'Tab', path: './fixtures/Tab.js'});
    })
  });

  it('should list all child components', () => {
    return mapper.getChildren('./fixtures/Tabs.js').then(children => {
      expect(children.length).toBe(2);
      expect(children).toInclude({name: 'div'});
      expect(children).toInclude({name: 'Tab'});
    });
  });

});