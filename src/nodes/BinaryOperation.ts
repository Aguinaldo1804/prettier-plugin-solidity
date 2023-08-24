import * as printers from '../binary-operator-printers';
import type { AST, NodePrinter } from '../prettier-plugin-solidity';

export const BinaryOperation: NodePrinter<AST.BinaryOperation> = {
  print: ({ node, path, print }) => {
    const binaryOperationPrinter = Object.values(printers).find((printer) =>
      printer.match(node.operator)
    );
    if (binaryOperationPrinter === undefined) {
      throw new Error(
        `Assertion error: no printer found for operator ${JSON.stringify(
          node.operator
        )}`
      );
    }
    return binaryOperationPrinter.print(node, path, print);
  }
};