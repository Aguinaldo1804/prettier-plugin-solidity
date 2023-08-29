import { doc } from 'prettier';
import type { AstPath, Doc } from 'prettier';
import type { BinaryOperationPrinter } from './types';

const { group, indent, line } = doc.builders;

const indentIfNecessaryBuilder =
  (path: AstPath) =>
  (document: Doc): Doc => {
    let node = path.getNode();
    for (let i = 0; ; i += 1) {
      const parentNode = path.getParentNode(i);
      if (parentNode.type === 'ReturnStatement') break;
      if (parentNode.type === 'IfStatement') break;
      if (parentNode.type === 'ForStatement') break;
      if (parentNode.type === 'WhileStatement') break;
      if (parentNode.type !== 'BinaryOperation') return indent(document);
      if (node === parentNode.right) break;
      node = parentNode;
    }
    return document;
  };

export const comparison: BinaryOperationPrinter = {
  match: (op) => ['<', '>', '<=', '>=', '==', '!='].includes(op),
  print: (node, path, print) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    const right = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return group([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
