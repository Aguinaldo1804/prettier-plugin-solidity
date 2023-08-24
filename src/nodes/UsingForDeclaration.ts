import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { line, softline } = doc.builders;

export const UsingForDeclaration: NodePrinter = {
  print: ({ node, path, print, options }) => [
    'using ',
    (node as AST.UsingForDeclaration).functions &&
    (node as AST.UsingForDeclaration).functions.length
      ? [
          '{',
          printSeparatedList(
            (node as AST.UsingForDeclaration).functions.map(
              (functionName, i) =>
                (node as AST.UsingForDeclaration).operators[i]
                  ? [
                      functionName,
                      ' as ',
                      (node as AST.UsingForDeclaration).operators[i]!
                    ]
                  : functionName
            ),
            {
              firstSeparator: options.bracketSpacing ? line : softline
            }
          ),
          '}'
        ]
      : (node as AST.UsingForDeclaration).libraryName!,
    ' for ',
    (node as AST.UsingForDeclaration).typeName
      ? path.call(print, 'typeName')
      : '*',
    (node as AST.UsingForDeclaration).isGlobal ? ' global;' : ';'
  ]
};
