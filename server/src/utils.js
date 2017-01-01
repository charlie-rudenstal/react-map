import fs from 'mz/fs';

/**
 * regMatch
 * Will return multiple matches containing
 * the first expression group (or all groups if allGroups=true)
 */
export function regMatch(pattern, string, allGroups) {
  const matches = [];
  let match = null;
  while (match = pattern.exec(string)) {
    matches.push(allGroups ? match : match[1]);
  }
  return matches;
}

export function memoize(fn) {
  let cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  }
}