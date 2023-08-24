import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers';
import type { GroupWithId } from '../common/util';
import type { AstPath, Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type {
  VariableDeclarationStatement as VariableDeclarationStatementType,
  NodePrinter
} from '../prettier-plugin-solidity';

const { group, indentIfBreak } = doc.builders;

const embraceVariables = (document: Doc[], embrace: boolean) =>
  embrace ? ['(', printSeparatedList(document), ')'] : document;

const initialValue = (
  node: VariableDeclarationStatementType,
  path: AstPath,
  print: (path: AstPath) => Doc
) => (node.initialValue ? [' = ', path.call(print, 'initialValue')] : '');

let groupIndex = 0;
export const VariableDeclarationStatement: NodePrinter = {
  print: ({ node, path, print }) => {
    const startsWithVar =
      (node as VariableDeclarationStatementType).variables.filter(
        (x) => x && (x as AST.VariableDeclaration).typeName
      ).length === 0;

    const declarationDoc = group(
      [
        startsWithVar ? 'var ' : '',
        embraceVariables(
          path.map(print, 'variables'),
          (node as VariableDeclarationStatementType).variables.length > 1 ||
            startsWithVar
        )
      ],
      { id: Symbol(`VariableDeclarationStatement.variables-${groupIndex}`) }
    );
    groupIndex += 1;
    const initialValueDoc = initialValue(
      node as VariableDeclarationStatementType,
      path,
      print
    );

    return group([
      declarationDoc,
      indentIfBreak(initialValueDoc, {
        groupId: (declarationDoc as GroupWithId).id
      }),
      (node as VariableDeclarationStatementType).omitSemicolon ? '' : ';'
    ]);
  }
};
