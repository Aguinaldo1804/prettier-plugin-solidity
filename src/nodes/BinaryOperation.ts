import * as printers from '../binary-operator-printers/index.js';
import type { BinaryOperation as IBinaryOperation } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../types';

export const BinaryOperation: NodePrinter<IBinaryOperation> = {
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
