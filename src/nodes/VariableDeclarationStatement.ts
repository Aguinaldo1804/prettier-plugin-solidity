import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { GroupWithId } from '../common/util';
import type { AstPath, Doc } from 'prettier';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

const { group, indentIfBreak } = doc.builders;

const embraceVariables = (document: Doc[], embrace: boolean) =>
  embrace ? ['(', printSeparatedList(document), ')'] : document;

const initialValue = (
  node: AST.VariableDeclarationStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
) => (node.initialValue ? [' = ', path.call(print, 'initialValue')] : '');

let groupIndex = 0;
export const VariableDeclarationStatement: NodePrinter<AST.VariableDeclarationStatement> =
  {
    print: ({ node, path, print }) => {
      const startsWithVar =
        node.variables.filter(
          (x) => x && (x as AST.VariableDeclaration).typeName
        ).length === 0;

      const declarationDoc = group(
        [
          startsWithVar ? 'var ' : '',
          embraceVariables(
            path.map(print, 'variables'),
            node.variables.length > 1 || startsWithVar
          )
        ],
        { id: Symbol(`VariableDeclarationStatement.variables-${groupIndex}`) }
      );
      groupIndex += 1;
      const initialValueDoc = initialValue(node, path, print);

      return group([
        declarationDoc,
        indentIfBreak(initialValueDoc, {
          groupId: (declarationDoc as GroupWithId).id
        }),
        node.omitSemicolon ? '' : ';'
      ]);
    }
  };
