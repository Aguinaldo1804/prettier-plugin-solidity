import type { AST } from './prettier-plugin-solidity';
// see: https://github.com/prettier/prettier/blob/main/src/language-js/loc.js

function getRange(index: number, node: AST.Node): number {
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
  locEnd: (node: AST.Node): number => getRange(1, node),
  locStart: (node: AST.Node): number => getRange(0, node)
};
