/**
 * regMatch
 * Will return multiple matches containing
 * the first expression group
 */
export function regMatch(pattern, string) {
  const matches = [];
  let match = null;
  while (match = pattern.exec(string)) {
    matches.push(match[1]);
  }
  return matches;
}
