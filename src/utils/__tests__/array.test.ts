import { isArrayWithItems } from './../array';

describe('utils/arrays', () => {
  describe('isArrayWithItems', () => {
    it.each([
      [false, [], 'an empty array'],
      [false, '', 'not an array'],
      [true, ['test'], 'an array with item']
    ])('should return %s for value "%s", cuz it\'s %s', (...[expected, value]) => {
      expect(isArrayWithItems(value)).toEqual(expected);
    });
  });
});
