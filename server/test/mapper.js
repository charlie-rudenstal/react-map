import expect from 'expect';
import mapper from '../src/Mapper';
import fs from 'fs';

describe('mapper', () => {
  it('should list all components', () => {
    return mapper.getComponents().then(components => {
      expect(components.length).toBe(3);
      expect(components).toInclude({name: 'Button', path: `Button.js`});
      expect(components).toInclude({name: 'Tabs', path: `Tabs.js`});
      expect(components).toInclude({name: 'Tab', path: `Tab.js`});
    })
  });

  it('should list all child components', () => {
    return mapper.getChildren('Tabs.js').then(children => {
      expect(children.length).toBe(2);
      expect(children).toInclude({name: 'div'});
      expect(children).toInclude({name: 'Tab'});
    });
  });

  it('should list all class names', () => {
    return mapper.getClassNames('Tabs.js').then(classNames => {
      expect(classNames.length).toBe(2);
      expect(classNames).toInclude({name: 'header'});
      expect(classNames).toInclude({name: 'header--large'});
    });
  });

  it('should list all dependencies', () => {
    return mapper.getDependencies('Tabs.js').then(dependencies => {
      expect(dependencies.length).toBe(3);
      expect(dependencies).toInclude({name: 'React', path: 'react'});
      expect(dependencies).toInclude({name: 'Tab', path: './Tab'});
      expect(dependencies).toInclude({name: 'styles', path: './Tabs.less'});
    });
  });

  it('should return components code', () => {
    return mapper.getCode('Tabs.js').then(code => {
      expect(code).toBe(fs.readFileSync('server/test/fixtures/Tabs.js', 'utf-8'));
    });
  });
});
