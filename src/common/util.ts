import { util, version } from 'prettier';
import satisfies from 'semver/functions/satisfies.js';
import type { doc, Doc, ParserOptions } from 'prettier';
import type { AST } from '../prettier-plugin-solidity';

export const prettierVersionSatisfies = (range: string) =>
  satisfies(version, range);

export interface LabelWithLabel extends doc.builders.Label {
  label: string;
  contents: Doc[];
}

export function isLabel(expressionDoc: Doc): boolean {
  return (expressionDoc as LabelWithLabel).label !== undefined;
}

export interface GroupWithId extends doc.builders.Group {
  id: symbol;
}

interface QuoteRegex {
  quote: util.Quote;
  regex: RegExp;
}

const double: QuoteRegex = { quote: '"', regex: /"/g };
const single: QuoteRegex = { quote: "'", regex: /'/g };

export function printString(rawContent: string, options: ParserOptions) {
  const preferred = options.singleQuote ? single : double;
  const alternate = preferred === single ? double : single;

  let shouldUseAlternateQuote = false;

  // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.
  // Also check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.
  if (
    rawContent.includes(preferred.quote) ||
    rawContent.includes(alternate.quote)
  ) {
    const numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    const numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;

    shouldUseAlternateQuote = numPreferredQuotes > numAlternateQuotes;
  }

  const enclosingQuote = shouldUseAlternateQuote
    ? alternate.quote
    : preferred.quote;

  // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.
  return util.makeString(rawContent, enclosingQuote);
}

export function hasNodeIgnoreComment(node: AST.Node) {
  return (
    node &&
    node.comments &&
    node.comments.length > 0 &&
    node.comments.some(
      (comment: AST.Comment) => comment.value.trim() === 'prettier-ignore'
    )
  );
}
