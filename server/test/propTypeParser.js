import propTypeParser from '../src/propTypeParser';
import expect from 'expect';

describe('propTypeParser', () => {
  it('should return proptypes from a string', () => {

    const propTypes = propTypeParser(`
      children: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.string
      ]),
      color: React.PropTypes.string,
      index: React.PropTypes.number
    `);

    expect(propTypes).toBe({
      children: `oneOfType([
        element,
        string
      ])`,
      color: 'string',
      index: 'number'
    });

  });
});
