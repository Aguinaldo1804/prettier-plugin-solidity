import type * as ParserAST from '@solidity-parser/parser/src/ast-types';
import type * as Extracted from 'solidity-comments-extractor';
import type * as Prettier from 'prettier';

interface ParserOptions extends Prettier.ParserOptions {
  printer: Prettier.Printer;
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

  export interface SourceUnit extends ParserAST.SourceUnit {
    comments?: Comment[];
  }

  export interface UserDefinedTypeName extends ParserAST.UserDefinedTypeName {
    comments?: Comment[];
  }

  export interface InheritanceSpecifier extends ParserAST.InheritanceSpecifier {
    comments?: Comment[];
  }

  export interface ContractDefinition extends ParserAST.ContractDefinition {
    comments?: Comment[];
  }

  export interface PragmaDirective extends ParserAST.PragmaDirective {
    comments?: Comment[];
  }

  export interface StringLiteral extends ParserAST.StringLiteral {
    comments?: Comment[];
  }

  export interface Identifier extends ParserAST.Identifier {
    comments?: Comment[];
  }

  export interface ImportDirective extends ParserAST.ImportDirective {
    comments?: Comment[];
  }

  export interface VariableDeclaration extends ParserAST.VariableDeclaration {
    comments?: Comment[];
  }

  export interface StateVariableDeclarationVariable
    extends ParserAST.StateVariableDeclarationVariable {
    comments?: Comment[];
  }

  export interface StateVariableDeclaration
    extends ParserAST.StateVariableDeclaration {
    comments?: Comment[];
  }

  export interface FileLevelConstant extends ParserAST.FileLevelConstant {
    comments?: Comment[];
  }

  export interface UsingForDeclaration extends ParserAST.UsingForDeclaration {
    comments?: Comment[];
  }

  export interface StructDefinition extends ParserAST.StructDefinition {
    comments?: Comment[];
  }

  export interface ModifierDefinition extends ParserAST.ModifierDefinition {
    comments?: Comment[];
  }

  export interface ModifierInvocation extends ParserAST.ModifierInvocation {
    comments?: Comment[];
  }

  export interface FunctionDefinition extends ParserAST.FunctionDefinition {
    comments?: Comment[];
  }

  export interface CustomErrorDefinition
    extends ParserAST.CustomErrorDefinition {
    comments?: Comment[];
  }

  export interface TypeDefinition extends ParserAST.TypeDefinition {
    comments?: Comment[];
  }

  export interface RevertStatement extends ParserAST.RevertStatement {
    comments?: Comment[];
  }

  export interface EventDefinition extends ParserAST.EventDefinition {
    comments?: Comment[];
  }

  export interface EnumValue extends ParserAST.EnumValue {
    comments?: Comment[];
  }

  export interface EnumDefinition extends ParserAST.EnumDefinition {
    comments?: Comment[];
  }

  export interface ArrayTypeName extends ParserAST.ArrayTypeName {
    comments?: Comment[];
  }

  export interface Mapping extends ParserAST.Mapping {
    comments?: Comment[];
  }

  export interface FunctionTypeName extends ParserAST.FunctionTypeName {
    comments?: Comment[];
  }

  export interface Block extends ParserAST.Block {
    comments?: Comment[];
  }

  export interface ExpressionStatement extends ParserAST.ExpressionStatement {
    comments?: Comment[];
    omitSemicolon?: boolean;
  }

  export interface IfStatement extends ParserAST.IfStatement {
    comments?: Comment[];
  }

  export interface UncheckedStatement extends ParserAST.UncheckedStatement {
    comments?: Comment[];
  }

  export interface TryStatement extends ParserAST.TryStatement {
    comments?: Comment[];
  }

  export interface CatchClause extends ParserAST.CatchClause {
    comments?: Comment[];
  }

  export interface WhileStatement extends ParserAST.WhileStatement {
    comments?: Comment[];
  }

  export interface ForStatement extends ParserAST.ForStatement {
    comments?: Comment[];
    initExpression: SimpleStatement | null;
    loopExpression: ExpressionStatement;
  }

  export interface InlineAssemblyStatement
    extends ParserAST.InlineAssemblyStatement {
    comments?: Comment[];
  }

  export interface DoWhileStatement extends ParserAST.DoWhileStatement {
    comments?: Comment[];
  }

  export interface ContinueStatement extends ParserAST.ContinueStatement {
    comments?: Comment[];
  }

  export interface Break extends ParserAST.Break {
    comments?: Comment[];
  }

  export interface Continue extends ParserAST.Continue {
    comments?: Comment[];
  }

  export interface BreakStatement extends ParserAST.BreakStatement {
    comments?: Comment[];
  }

  export interface ReturnStatement extends ParserAST.ReturnStatement {
    comments?: Comment[];
  }

  export interface EmitStatement extends ParserAST.EmitStatement {
    comments?: Comment[];
  }

  export interface ThrowStatement extends ParserAST.ThrowStatement {
    comments?: Comment[];
  }

  export interface VariableDeclarationStatement
    extends ParserAST.VariableDeclarationStatement {
    comments?: Comment[];
    omitSemicolon?: boolean;
  }

  export interface ElementaryTypeName extends ParserAST.ElementaryTypeName {
    comments?: Comment[];
  }

  export interface FunctionCall extends ParserAST.FunctionCall {
    comments?: Comment[];
  }

  export interface AssemblyBlock extends ParserAST.AssemblyBlock {
    comments?: Comment[];
  }

  export interface AssemblyCall extends ParserAST.AssemblyCall {
    comments?: Comment[];
  }

  export interface AssemblyLocalDefinition
    extends ParserAST.AssemblyLocalDefinition {
    comments?: Comment[];
  }

  export interface AssemblyAssignment extends ParserAST.AssemblyAssignment {
    comments?: Comment[];
  }

  export interface AssemblyStackAssignment
    extends ParserAST.AssemblyStackAssignment {
    comments?: Comment[];
  }

  export interface LabelDefinition extends ParserAST.LabelDefinition {
    comments?: Comment[];
  }

  export interface AssemblySwitch extends ParserAST.AssemblySwitch {
    comments?: Comment[];
  }

  export interface AssemblyCase extends ParserAST.AssemblyCase {
    comments?: Comment[];
  }

  export interface AssemblyFunctionDefinition
    extends ParserAST.AssemblyFunctionDefinition {
    comments?: Comment[];
  }

  export interface AssemblyFor extends ParserAST.AssemblyFor {
    comments?: Comment[];
  }

  export interface AssemblyIf extends ParserAST.AssemblyIf {
    comments?: Comment[];
  }

  export interface AssemblyMemberAccess extends ParserAST.AssemblyMemberAccess {
    comments?: Comment[];
  }

  export interface NewExpression extends ParserAST.NewExpression {
    comments?: Comment[];
  }

  export interface TupleExpression extends ParserAST.TupleExpression {
    comments?: Comment[];
  }

  export interface NameValueExpression extends ParserAST.NameValueExpression {
    comments?: Comment[];
  }

  export interface NumberLiteral extends ParserAST.NumberLiteral {
    comments?: Comment[];
  }

  export interface BooleanLiteral extends ParserAST.BooleanLiteral {
    comments?: Comment[];
  }

  export interface HexLiteral extends ParserAST.HexLiteral {
    comments?: Comment[];
  }

  export interface BinaryOperation extends ParserAST.BinaryOperation {
    comments?: Comment[];
  }

  export interface UnaryOperation extends ParserAST.UnaryOperation {
    comments?: Comment[];
  }

  export interface Conditional extends ParserAST.Conditional {
    comments?: Comment[];
  }

  export interface IndexAccess extends ParserAST.IndexAccess {
    comments?: Comment[];
  }

  export interface IndexRangeAccess extends ParserAST.IndexRangeAccess {
    comments?: Comment[];
  }

  export interface MemberAccess extends ParserAST.MemberAccess {
    comments?: Comment[];
  }

  export interface HexNumber extends ParserAST.HexNumber {
    comments?: Comment[];
  }

  export interface DecimalNumber extends ParserAST.DecimalNumber {
    comments?: Comment[];
  }

  export interface NameValueList extends ParserAST.NameValueList {
    comments?: Comment[];
  }

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
