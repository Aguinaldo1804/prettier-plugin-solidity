import { doc } from 'prettier';
import { getNode } from '../common/backward-compatibility.js';
import type { AstPath, Doc } from 'prettier';
import type { BinaryOperationPrinter } from './types';

const { group, line, indent } = doc.builders;

const groupIfNecessaryBuilder =
  (path: AstPath) =>
  (document: Doc): Doc =>
    path.getParentNode().type === 'BinaryOperation'
      ? document
      : group(document);

const indentIfNecessaryBuilder =
  (path: AstPath) =>
  (document: Doc): Doc => {
    let node = getNode(path);
    for (let i = 0; ; i += 1) {
      const parentNode = path.getParentNode(i);
      if (parentNode.type === 'ReturnStatement') break;
      if (parentNode.type === 'IfStatement') break;
      if (parentNode.type === 'WhileStatement') break;
      if (parentNode.type !== 'BinaryOperation') return indent(document);
      if (node === parentNode.right) break;
      node = parentNode;
    }
    return document;
  };

export const logical: BinaryOperationPrinter = {
  match: (op) => ['&&', '||'].includes(op),
  print: (node, path, print) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    const right = [node.operator, line, path.call(print, 'right')];
    // If it's a single binary operation, avoid having a small right
    // operand like - 1 on its own line
    const shouldGroup =
      node.left.type !== 'BinaryOperation' &&
      path.getParentNode().type !== 'BinaryOperation';
    return groupIfNecessary([
      path.call(print, 'left'),
      ' ',
      indentIfNecessary(shouldGroup ? group(right) : right)
    ]);
  }
};
