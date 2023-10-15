import * as comments from './comments/index.js';
import massageAstNode from './clean.js';
import loc from './loc.js';
import options from './options.js';
import parse from './parser.js';
import print from './printer.js';
import type { Comment } from '@solidity-parser/parser/src/ast-types';
import type {
  Parser,
  Plugin,
  Printer,
  RequiredOptions,
  SupportLanguage
} from 'prettier';

const astFormat = 'solidity-ast';
const parserName = 'solidity-parse';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
const languages = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    type: 'programming',
    color: '#AA6746',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: [parserName],
    vscodeLanguageIds: ['solidity']
  } as SupportLanguage
];

// https://prettier.io/docs/en/plugins.html#parsers
const parser: Parser = { astFormat, parse, ...loc };
const parsers = { [parserName]: parser };

// https://prettier.io/docs/en/plugins.html#printers
const printer: Printer = {
  canAttachComment: (node: Comment): boolean =>
    node.type && node.type !== 'BlockComment' && node.type !== 'LineComment',
  handleComments: {
    ownLine: comments.solidityHandleOwnLineComment,
    endOfLine: comments.solidityHandleEndOfLineComment,
    remaining: comments.solidityHandleRemainingComment
  },
  isBlockComment: comments.isBlockComment,
  massageAstNode,
  print,
  printComment: comments.printComment
};
const printers = { [astFormat]: printer };

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions: Partial<RequiredOptions> = {
  bracketSpacing: false,
  tabWidth: 4
};

export default {
  languages,
  parsers,
  printers,
  options,
  defaultOptions
} as Plugin;
