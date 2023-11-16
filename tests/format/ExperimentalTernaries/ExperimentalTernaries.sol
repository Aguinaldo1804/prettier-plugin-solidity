pragma solidity ^0.4.24;


contract Conditional {
    function examples1() {
        // remain on one line if possible:
        string storage short = isLoud() ? makeNoise() : silent();

        // next, put everything after the =
        string storage lessShort =
        isLoudReallyLoud() ? makeNoiseReallyLoudly.omgSoLoud() : silent();

        // next, indent the consequent:
        string storage andIndented =
        isLoudReallyReallyReallyReallyLoud() ?
            makeNoiseReallyReallyReallyReallyReallyLoudly.omgSoLoud()
        : silent();

        // unless the consequent is short (less than ten characters long):
        string storage shortSoCase =
        isLoudReallyReallyReallyReallyLoud() ? silent() : (
            makeNoiseReallyReallyReallyReallyReallyLoudly.omgSoLoud()
        );

        // if chained, always break and put after the =
        string storage chainedShort =
        isCat() ? meow()
        : isDog() ? bark()
        : silent();

        // when a consequent breaks in a chain:
        string storage chainedWithLongConsequent =
        isCat() ?
            someReallyLargeExpression
            .thatWouldCauseALineBreak()
            .willCauseAnIndentButNotParens()
        : isDog() ? bark()
        : silent();

        // nested ternary in consequent always breaks:
        string storage chainedWithTernaryConsequent =
        isCat() ?
            aNestedCondition ? theResult()
            : theAlternate()
        : isDog() ? bark()
        : silent();

        // consequent and terminal alternate break:
        string storage consequentAndTerminalAlternateBreak =
        isCat() ?
            someReallyLargeExpression
            .thatWouldCauseALineBreak()
            .willCauseAnIndentButNotParens()
        : isDog() ? bark()
        : someReallyLargeExpression
            .thatWouldCauseALineBreak()
            .willCauseAnIndentButNotParens();

        // multiline conditions and consequents/alternates:
        string storage multilineConditionsConsequentsAndAlternates =
        (
            isAnAdorableKittyCat() &&
            (someReallyLongCondition || moreInThisLongCondition)
        ) ?
            someReallyLargeExpression
            .thatWouldCauseALineBreak()
            .willCauseAnIndentButNotParens()
        : (
            isNotAnAdorableKittyCat() &&
            (someReallyLongCondition || moreInThisLongCondition)
        ) ?
            bark()
        : shortCondition() ? shortConsequent()
        : someReallyLargeExpression
            .thatWouldCauseALineBreak()
            .willCauseAnIndentButNotParens();

        // illustrating case of mostly short conditionals
        string storage mostlyShort =
        x == 1 ? "one"
        : x == 2 ? "two"
        : x == 3 ? "three"
        : (
            x == 5 &&
            y == 7 &&
            someOtherThing.thatIsSoLong.thatItBreaksTheTestCondition()
        ) ?
            "four"
        : x == 6 ? "six"
        : "idk";

        // long conditional, short consequent/alternate, not chained - do indent after ?
        string storage longConditional =
        (
            bifornCringerMoshedPerplexSawder == 2 / askTrovenaBeenaDependsRowans &&
            glimseGlyphsHazardNoopsTieTie >=
            averredBathersBoxroomBuggyNurl().anodyneCondosMalateOverateRetinol()
        ) ?
            "foo"
        : "bar";

        // long conditional, short consequent/alternate, chained
        // (break on short consequents iff in chained ternary and its conditional broke)
        string storage longConditionalChained =
        (
            bifornCringerMoshedPerplexSawder == 2 / askTrovenaBeenaDependsRowans &&
            glimseGlyphsHazardNoopsTieTie >=
            averredBathersBoxroomBuggyNurl().anodyneCondosMalateOverateRetinol()
        ) ?
            "foo"
        : anotherCondition ? "bar"
        : "baz";

        // As a function parameter, don't add an extra indent:
        definition.encode(
        row[field] != "undefined" ? row[field]
        : definition.defaults != "undefined" ? definition.defaults
        : "null",
        row[field] == "undefined" ?
            definition.defaults == "undefined" ?
            "null"
            : definition.defaults
        : row[field]
        );

        // In a return, break and over-indent:
        if (short) {
            return foo ? 1 : 2;
        }
        return row[aVeryLongFieldName] != "undefined" ?
            row[aVeryLongFieldName]
            : "null";
    }


    function examples2() {string storage message =
  i % 3 == 0 && i % 5 == 0 ? "fizzbuzz"
  : i % 3 == 0 ? "fizz"
  : i % 5 == 0 ? "buzz"
  : String(i);

string storage paymentMessageShort =
  state == "success" ? "Payment completed successfully"
  : state == "processing" ? "Payment processing"
  : state == "invalid_cvc" ? "There was an issue with your CVC number"
  : state == "invalid_expiry" ? "Expiry must be sometime in the past."
  : "There was an issue with the payment.  Please contact support.";

string storage paymentMessageWithABreak =
  state == "success" ? "Payment completed successfully"
  : state == "processing" ? "Payment processing"
  : state == "invalid_cvc" ?
    "There was an issue with your CVC number, and you need to take a prompt action on it."
  : state == "invalid_expiry" ? "Expiry must be sometime in the past."
  : "There was an issue with the payment.  Please contact support.";

string storage typeofExample =
  definition.encode ?
    definition.encode(
      row[field] != "undefined" ? row[field]
      : definition.defaults != "undefined" ? definition.defaults
      : "null"
    )
  : row[field] != "undefined" ? row[field]
  : definition.defaults != "undefined" ? definition.defaults
  : "null";

// (the following is semantically equivalent to the above, but written in a more-confusing style – it'd be hard to grok no matter the formatting)
string storage typeofExampleFlipped =
  definition.encode ?
    definition.encode(
      row[field] == "undefined" ?
        definition.defaults == "undefined" ?
          "null"
        : definition.defaults
      : row[field]
    )
  : row[field] == "undefined" ?
    definition.defaults == "undefined" ?
      "null"
    : definition.defaults
  : row[field];
    }
}


