import { doc } from 'prettier';
import coerce from 'semver/functions/coerce';
import satisfies from 'semver/functions/satisfies';
import { printSeparatedList } from '../common/printer-helpers';
import { printString } from '../common/util';
import type { Doc } from 'prettier';
import type * as AST from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from '../prettier-plugin-solidity';

const { group, line, softline } = doc.builders;

export const ImportDirective: NodePrinter = {
  print: ({ node, options }) => {
    const importPath = printString((node as AST.ImportDirective).path, options);
    let document: Doc;

    if ((node as AST.ImportDirective).unitAlias) {
      // import "./Foo.sol" as Foo;
      document = [importPath, ' as ', (node as AST.ImportDirective).unitAlias!];
    } else if ((node as AST.ImportDirective).symbolAliases) {
      // import { Foo, Bar as Qux } from "./Foo.sol";
      const compiler = coerce(options.compiler);
      const symbolAliases = (node as AST.ImportDirective).symbolAliases!.map(
        ([a, b]) => (b ? `${a} as ${b}` : a)
      );
      let firstSeparator;
      let separator;

      if (compiler && satisfies(compiler, '>=0.7.4')) {
        // if the compiler exists and is greater than or equal to 0.7.4 we will
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? line : softline;
        separator = [',', line];
      } else {
        // if the compiler is not given or is lower than 0.7.4 we will not
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? ' ' : '';
        separator = ', ';
      }

      document = [
        '{',
        printSeparatedList(symbolAliases, { firstSeparator, separator }),
        '} from ',
        importPath
      ];
    } else {
      // import "./Foo.sol";
      document = importPath;
    }
    return group(['import ', document, ';']);
  }
};
