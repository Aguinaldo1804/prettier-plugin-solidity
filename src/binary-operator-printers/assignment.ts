import { doc } from 'prettier';
import type { BinaryOperationPrinter } from './types';

const { group, line, indent } = doc.builders;

export const assignment: BinaryOperationPrinter = {
  match: (op) =>
    [
      '=',
      '|=',
      '^=',
      '&=',
      '<<=',
      '>>=',
      '+=',
      '-=',
      '*=',
      '/=',
      '%='
    ].includes(op),
  print: (node, path, print) => [
    path.call(print, 'left'),
    ' ',
    node.operator,
    node.right.type === 'BinaryOperation'
      ? group(indent([line, path.call(print, 'right')]))
      : [' ', path.call(print, 'right')]
  ]
};
