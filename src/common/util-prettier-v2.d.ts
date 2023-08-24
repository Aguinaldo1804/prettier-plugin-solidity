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

// TODO: remove once once Prettier adds these functions to their types.
declare namespace utilV3Functions {
  function getNextNonSpaceNonCommentCharacterIndex(
    text: string,
    startIndex: number
  ): number | false;

  function isNextLineEmpty(text: string, startIndex: number): boolean;
}

type utilV2 = typeof util & typeof utilV2Functions;
type utilV3 = typeof util & typeof utilV3Functions;
