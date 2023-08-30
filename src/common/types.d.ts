import type { util } from 'prettier';
import type { AST } from '../prettier-plugin-solidity';

declare namespace utilV2Functions {
  function getNextNonSpaceNonCommentCharacterIndex(
    text: string,
    node: AST.Node | AST.Comment,
    locEnd: (node: AST.Node) => number
  ): number | false;

  function isNextLineEmptyAfterIndex(text: string, startIndex: number): boolean;
}

type utilV2 = typeof util & typeof utilV2Functions;
