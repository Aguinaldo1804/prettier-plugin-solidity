import { printComment } from '../../../src/comments/printer.ts';
import loc from '../../../src/loc.ts';

test('given an unknown comment type then printComment function should throw', () => {
  const mockCommentPath = { node: { type: 'UnknownComment', range: [0, 1] } };
  const mockOptions = { ...loc, originalText: 'foo' };

  expect(() => {
    printComment(mockCommentPath, mockOptions);
  }).toThrow();
});
