import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

const { line, softline } = doc.builders;

export const UsingForDeclaration: NodePrinter<AST.UsingForDeclaration> = {
  print: ({ node, path, print, options }) => [
    'using ',
    node.functions && node.functions.length
      ? [
          '{',
          printSeparatedList(
            node.functions.map((functionName, i) => {
              const operator = node.operators[i];
              return operator ? [functionName, ' as ', operator] : functionName;
            }),
            { firstSeparator: options.bracketSpacing ? line : softline }
          ),
          '}'
        ]
      : node.libraryName!,
    ' for ',
    node.typeName ? path.call(print, 'typeName') : '*',
    node.isGlobal ? ' global;' : ';'
  ]
};
