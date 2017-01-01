import expect from 'expect';
import mapper from '../src/Mapper';

const fixturesPath = 'server/test/fixtures';

describe('mapper', () => {
  it('should list all components', () => {
    return mapper.getComponents(fixturesPath).then(components => {
      expect(components.length).toBe(3);
      expect(components).toInclude({name: 'Button', path: `${fixturesPath}/Button.js`});
      expect(components).toInclude({name: 'Tabs', path: `${fixturesPath}/Tabs.js`});
      expect(components).toInclude({name: 'Tab', path: `${fixturesPath}/Tab.js`});
    })
  });

  it('should list all child components', () => {
    return mapper.getChildren(`${fixturesPath}/Tabs.js`).then(children => {
      expect(children.length).toBe(2);
      expect(children).toInclude({name: 'div'});
      expect(children).toInclude({name: 'Tab'});
    });
  });

  it('should list all class names', () => {
    return mapper.getClassNames(`${fixturesPath}/Tabs.js`).then(classNames => {
      expect(classNames.length).toBe(3);
      expect(classNames).toInclude({name: 'tabs'});
      expect(classNames).toInclude({name: 'header'});
      expect(classNames).toInclude({name: 'header--large'});
    });
  });

  it('should list all dependencies', () => {
    return mapper.getDependencies(`${fixturesPath}/Tabs.js`).then(dependencies => {
      expect(dependencies.length).toBe(2);
      expect(dependencies).toInclude({name: 'React', path: 'react'});
      expect(dependencies).toInclude({name: 'Tab', path: './Tab'});
    });
  });
});
