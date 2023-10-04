import type * as Parser from '@solidity-parser/parser/src/ast-types';
import type * as Extracted from 'solidity-comments-extractor';
import type * as Prettier from 'prettier';

interface ParserOptions extends Prettier.ParserOptions {
  compiler: string;
}

interface NodePrinter<T> {
  print: (arg: {
    node: T;
    options: ParserOptions;
    path: Prettier.AstPath;
    print: (path: Prettier.AstPath) => Prettier.Doc;
  }) => Prettier.Doc;
}

export namespace AST {
  interface BaseComment extends Extracted.Comment {
    leading?: boolean;
    trailing?: boolean;
    printed?: boolean;
    precedingNode?: Node;
    enclosingNode?: Node;
    followingNode?: Node;
  }

  export interface BlockComment extends BaseComment {
    type: 'BlockComment';
  }

  export interface LineComment extends BaseComment {
    type: 'LineComment';
  }

  export type Comment = BlockComment | LineComment;

  interface BaseNode {
    comments?: Comment[];
  }

  export interface SourceUnit extends Parser.SourceUnit, BaseNode {}

  export interface UserDefinedTypeName
    extends Parser.UserDefinedTypeName,
      BaseNode {}

  export interface InheritanceSpecifier
    extends Parser.InheritanceSpecifier,
      BaseNode {}

  export interface ContractDefinition
    extends Parser.ContractDefinition,
      BaseNode {}

  export interface PragmaDirective extends Parser.PragmaDirective, BaseNode {}

  export interface StringLiteral extends Parser.StringLiteral, BaseNode {}

  export interface Identifier extends Parser.Identifier, BaseNode {}

  export interface ImportDirective extends Parser.ImportDirective, BaseNode {}

  export interface VariableDeclaration
    extends Parser.VariableDeclaration,
      BaseNode {}

  export interface StateVariableDeclarationVariable
    extends Parser.StateVariableDeclarationVariable,
      BaseNode {}

  export interface StateVariableDeclaration
    extends Parser.StateVariableDeclaration,
      BaseNode {}

  export interface FileLevelConstant
    extends Parser.FileLevelConstant,
      BaseNode {}

  export interface UsingForDeclaration
    extends Parser.UsingForDeclaration,
      BaseNode {}

  export interface StructDefinition extends Parser.StructDefinition, BaseNode {}

  export interface ModifierDefinition
    extends Parser.ModifierDefinition,
      BaseNode {}

  export interface ModifierInvocation
    extends Parser.ModifierInvocation,
      BaseNode {}

  export interface FunctionDefinition
    extends Parser.FunctionDefinition,
      BaseNode {}

  export interface CustomErrorDefinition
    extends Parser.CustomErrorDefinition,
      BaseNode {}

  export interface TypeDefinition extends Parser.TypeDefinition, BaseNode {}

  export interface RevertStatement extends Parser.RevertStatement, BaseNode {}

  export interface EventDefinition extends Parser.EventDefinition, BaseNode {}

  export interface EnumValue extends Parser.EnumValue, BaseNode {}

  export interface EnumDefinition extends Parser.EnumDefinition, BaseNode {}

  export interface ArrayTypeName extends Parser.ArrayTypeName, BaseNode {}

  export interface Mapping extends Parser.Mapping, BaseNode {}

  export interface FunctionTypeName extends Parser.FunctionTypeName, BaseNode {}

  export interface Block extends Parser.Block, BaseNode {}

  export interface ExpressionStatement
    extends Parser.ExpressionStatement,
      BaseNode {
    omitSemicolon?: boolean;
  }

  export interface IfStatement extends Parser.IfStatement, BaseNode {}

  export interface UncheckedStatement
    extends Parser.UncheckedStatement,
      BaseNode {}

  export interface TryStatement extends Parser.TryStatement, BaseNode {}

  export interface CatchClause extends Parser.CatchClause, BaseNode {}

  export interface WhileStatement extends Parser.WhileStatement, BaseNode {}

  export interface ForStatement extends Parser.ForStatement, BaseNode {
    initExpression: SimpleStatement | null;
    loopExpression: ExpressionStatement;
  }

  export interface InlineAssemblyStatement
    extends Parser.InlineAssemblyStatement,
      BaseNode {}

  export interface DoWhileStatement extends Parser.DoWhileStatement, BaseNode {}

  export interface ContinueStatement
    extends Parser.ContinueStatement,
      BaseNode {}

  export interface Break extends Parser.Break, BaseNode {}

  export interface Continue extends Parser.Continue, BaseNode {}

  export interface BreakStatement extends Parser.BreakStatement, BaseNode {}

  export interface ReturnStatement extends Parser.ReturnStatement, BaseNode {}

  export interface EmitStatement extends Parser.EmitStatement, BaseNode {}

  export interface ThrowStatement extends Parser.ThrowStatement, BaseNode {}

  export interface VariableDeclarationStatement
    extends Parser.VariableDeclarationStatement,
      BaseNode {
    omitSemicolon?: boolean;
  }

  export interface ElementaryTypeName
    extends Parser.ElementaryTypeName,
      BaseNode {}

  export interface FunctionCall extends Parser.FunctionCall, BaseNode {}

  export interface AssemblyBlock extends Parser.AssemblyBlock, BaseNode {}

  export interface AssemblyCall extends Parser.AssemblyCall, BaseNode {}

  export interface AssemblyLocalDefinition
    extends Parser.AssemblyLocalDefinition,
      BaseNode {}

  export interface AssemblyAssignment
    extends Parser.AssemblyAssignment,
      BaseNode {}

  export interface AssemblyStackAssignment
    extends Parser.AssemblyStackAssignment,
      BaseNode {}

  export interface LabelDefinition extends Parser.LabelDefinition, BaseNode {}

  export interface AssemblySwitch extends Parser.AssemblySwitch, BaseNode {}

  export interface AssemblyCase extends Parser.AssemblyCase, BaseNode {}

  export interface AssemblyFunctionDefinition
    extends Parser.AssemblyFunctionDefinition,
      BaseNode {}

  export interface AssemblyFor extends Parser.AssemblyFor, BaseNode {}

  export interface AssemblyIf extends Parser.AssemblyIf, BaseNode {}

  export interface AssemblyMemberAccess
    extends Parser.AssemblyMemberAccess,
      BaseNode {}

  export interface NewExpression extends Parser.NewExpression, BaseNode {}

  export interface TupleExpression extends Parser.TupleExpression, BaseNode {}

  export interface NameValueExpression
    extends Parser.NameValueExpression,
      BaseNode {}

  export interface NumberLiteral extends Parser.NumberLiteral, BaseNode {}

  export interface BooleanLiteral extends Parser.BooleanLiteral, BaseNode {}

  export interface HexLiteral extends Parser.HexLiteral, BaseNode {}

  export interface BinaryOperation extends Parser.BinaryOperation, BaseNode {}

  export interface UnaryOperation extends Parser.UnaryOperation, BaseNode {}

  export interface Conditional extends Parser.Conditional, BaseNode {}

  export interface IndexAccess extends Parser.IndexAccess, BaseNode {}

  export interface IndexRangeAccess extends Parser.IndexRangeAccess, BaseNode {}

  export interface MemberAccess extends Parser.MemberAccess, BaseNode {}

  export interface HexNumber extends Parser.HexNumber, BaseNode {}

  export interface DecimalNumber extends Parser.DecimalNumber, BaseNode {}

  export interface NameValueList extends Parser.NameValueList, BaseNode {}

  export type SimpleStatement =
    | VariableDeclarationStatement
    | ExpressionStatement;

  export type AssemblyLiteral =
    | StringLiteral
    | BooleanLiteral
    | DecimalNumber
    | HexNumber
    | HexLiteral;

  export type AssemblyExpression = AssemblyCall | AssemblyLiteral;

  export type AssemblyItem =
    | Identifier
    | AssemblyBlock
    | AssemblyExpression
    | AssemblyLocalDefinition
    | AssemblyAssignment
    | AssemblyStackAssignment
    | LabelDefinition
    | AssemblySwitch
    | AssemblyFunctionDefinition
    | AssemblyFor
    | AssemblyIf
    | Break
    | Continue
    | NumberLiteral;

  export type Statement =
    | IfStatement
    | WhileStatement
    | ForStatement
    | Block
    | InlineAssemblyStatement
    | DoWhileStatement
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | EmitStatement
    | ThrowStatement
    | SimpleStatement
    | UncheckedStatement
    | TryStatement
    | RevertStatement;

  export type TypeName =
    | ElementaryTypeName
    | UserDefinedTypeName
    | Mapping
    | ArrayTypeName
    | FunctionTypeName;

  export type PrimaryExpression =
    | BooleanLiteral
    | HexLiteral
    | StringLiteral
    | NumberLiteral
    | Identifier
    | TupleExpression
    | TypeName;

  export type Expression =
    | IndexAccess
    | IndexRangeAccess
    | BinaryOperation
    | Conditional
    | MemberAccess
    | FunctionCall
    | UnaryOperation
    | NewExpression
    | PrimaryExpression
    | NameValueExpression;

  export type Node =
    | SourceUnit
    | PragmaDirective
    | ImportDirective
    | ContractDefinition
    | InheritanceSpecifier
    | StateVariableDeclaration
    | UsingForDeclaration
    | StructDefinition
    | ModifierDefinition
    | ModifierInvocation
    | FunctionDefinition
    | EventDefinition
    | CustomErrorDefinition
    | EnumValue
    | EnumDefinition
    | VariableDeclaration
    | Statement
    | AssemblyCase
    | AssemblyItem
    | Expression
    | NameValueList
    | AssemblyMemberAccess
    | CatchClause
    | FileLevelConstant
    | TypeDefinition;
}
