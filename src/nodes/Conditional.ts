import { doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indent, line } = doc.builders;

export const Conditional: NodePrinter<AST.Conditional> = {
  print: ({ path, print }) =>
    group([
      path.call(print, 'condition'),
      indent([
        line,
        '? ',
        path.call(print, 'trueExpression'),
        line,
        ': ',
        path.call(print, 'falseExpression')
      ])
    ])
};
