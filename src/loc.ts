import type * as AST from '@solidity-parser/parser/src/ast-types';
// see: https://github.com/prettier/prettier/blob/main/src/language-js/loc.js

function getRange(index: number, node: AST.ASTNode): number {
  if (node.range) {
    return node.range[index];
  }
  if (
    node.type === 'ExpressionStatement' &&
    node.expression &&
    node.expression.range
  ) {
    return node.expression.range[index];
  }
  return 0;
}

export default {
  locEnd: (node: AST.ASTNode): number => getRange(1, node),
  locStart: (node: AST.ASTNode): number => getRange(0, node)
};
