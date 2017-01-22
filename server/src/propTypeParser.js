function propTypeParser(propTypesString) {
  const propTypes = {};
  const name = '';
  function readName(char) {
    if (char === ' ') continue;
    if (char === ':') {
      propTypes.push({ name });
      state = readType;
    }
    name += char;
  }

  function readType(char) {
    if (char === ' ') continue;
    if (char === '(') {
      state = readFunction;
    }
    // if (char === ',')
  }

  function readFunction(char) {
    if (char === '(')
  }

  const state = readName;
  for (const char of propTypesString) {
  }
}

export default propTypeParser;
