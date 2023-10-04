import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { Doc, util } from 'prettier';

declare namespace utilV2Functions {
  function getNextNonSpaceNonCommentCharacterIndex(
    text: string,
    node: AST.ASTNode | AST.Comment,
    locEnd: (node: AST.ASTNode) => number
  ): number | false;

  function isNextLineEmptyAfterIndex(text: string, startIndex: number): boolean;
}

type utilV2 = typeof util & typeof utilV2Functions;

type DocV2 = Doc[] & { parts: Doc[] };

interface PrintSeparatedOptions {
  firstSeparator?: Doc;
  separator?: Doc;
  lastSeparator?: Doc;
  grouped?: boolean;
}
