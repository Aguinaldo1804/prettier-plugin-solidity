import { printComment } from '../../../src/comments/printer.js';

test('given an unknown comment type then printComment function should throw', () => {
  const mockCommentPath = { getNode: () => ({ type: 'UnknownComment' }) };

  expect(() => {
    printComment(mockCommentPath);
  }).toThrow();
});
