import { doc } from 'prettier';
import type { Conditional as IConditional } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { group, indent, line } = doc.builders;

export const Conditional: NodePrinter<IConditional> = {
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
