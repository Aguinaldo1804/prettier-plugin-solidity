import { util } from 'prettier';
import { prettierVersionSatisfies } from './util.js';
import type { AstPath } from 'prettier';
import type { ASTNode, Comment } from '../prettier-plugin-solidity';

declare namespace utilV2Functions {
  function getNextNonSpaceNonCommentCharacterIndex(
    text: string,
    node: ASTNode | Comment,
    locEnd: (node: ASTNode) => number
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

export const isPrettier2 = prettierVersionSatisfies('^2.3.0');

// The functions in this file will never be 100% covered in a single run
// since it depends on the version of Prettier being used.
// Mocking the behaviour will introduce a lot of maintenance in the tests.

export function isNextLineEmpty(text: string, startIndex: number): boolean {
  return isPrettier2
    ? (util as utilV2).isNextLineEmptyAfterIndex(text, startIndex)
    : (util as utilV3).isNextLineEmpty(text, startIndex); // V3 deprecated `isNextLineEmptyAfterIndex`
}

export function getNextNonSpaceNonCommentCharacterIndex(
  text: string,
  node: ASTNode,
  locEnd: (node: ASTNode) => number
): number | false {
  return isPrettier2
    ? (util as utilV2).getNextNonSpaceNonCommentCharacterIndex(
        text,
        node,
        locEnd
      )
    : (util as utilV3).getNextNonSpaceNonCommentCharacterIndex(
        text,
        locEnd(node)
      ); // V3 signature changed
}

export function getNextNonSpaceNonCommentCharacter(
  text: string,
  node: ASTNode | Comment,
  locEnd: (node: ASTNode | Comment) => number
): string {
  if (isPrettier2) {
    const index = (util as utilV2).getNextNonSpaceNonCommentCharacterIndex(
      text,
      node,
      locEnd
    );
    return index === false ? '' : text.charAt(index);
  }
  return util.getNextNonSpaceNonCommentCharacter(text, locEnd(node)); // V3 exposes this function directly
}

export function isLast(path: AstPath, key: string, index: number) {
  return isPrettier2
    ? index === path.getParentNode()[key].length - 1
    : path.isLast;
}
