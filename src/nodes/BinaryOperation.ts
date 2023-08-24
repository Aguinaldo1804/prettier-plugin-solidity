import * as printers from '../binary-operator-printers';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

export const BinaryOperation: NodePrinter = {
  print: ({ node, path, print }) => {
    const binaryOperationPrinter = Object.values(printers).find((printer) =>
      printer.match((node as AST.BinaryOperation).operator)
    );
    if (binaryOperationPrinter === undefined) {
      throw new Error(
        `Assertion error: no printer found for operator ${JSON.stringify(
          (node as AST.BinaryOperation).operator
        )}`
      );
    }
    return binaryOperationPrinter.print(
      node as AST.BinaryOperation,
      path,
      print
    );
  }
};
