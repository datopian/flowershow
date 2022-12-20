import { html } from "./html.js";

const codes = {
  horizontalTab: -2,
  virtualSpace: -1,
  nul: 0,
  eof: null,
  space: 32,
};

function markdownLineEndingOrSpace(code) {
  return code < codes.nul || code === codes.space;
}

function markdownLineEnding(code) {
  return code < codes.horizontalTab;
}

function wikiLink(opts = {}) {
  const aliasDivider = opts.aliasDivider || ":";

  const aliasMarker = aliasDivider;
  const startMarker = "[[";
  const imageStartMarker = "![[";
  const endMarker = "]]";

  function tokenize(effects, ok, nok) {
    var data;
    var alias;

    var aliasCursor = 0;
    var startMarkerCursor = 0;
    var endMarkerCursor = 0;

    return start;

    function start(code) {
      if (code === startMarker.charCodeAt(startMarkerCursor)) {
        effects.enter("wikiLink");
        effects.enter("wikiLinkMarker");

        return consumeStart(code);
      } else if (code === imageStartMarker.charCodeAt(startMarkerCursor)) {
        effects.enter("wikiLink", { isType: "transclusions" });
        effects.enter("wikiLinkMarker", { isType: "transclusions" });

        return consumeStart(code);
      } else {
        return nok(code);
      }
    }

    function consumeStart(code) {
      if (startMarkerCursor === startMarker.length) {
        effects.exit("wikiLinkMarker");
        return consumeData(code);
      }

      if (
        code === startMarker.charCodeAt(startMarkerCursor) ||
        code === imageStartMarker.charCodeAt(startMarkerCursor)
      ) {
        effects.consume(code);
        if (code === 91) startMarkerCursor++;

        return consumeStart;
      } else {
        return nok(code);
      }
    }

    function consumeData(code) {
      if (markdownLineEnding(code) || code === codes.eof) {
        return nok(code);
      }

      effects.enter("wikiLinkData");
      effects.enter("wikiLinkTarget");
      return consumeTarget(code);
    }

    function consumeTarget(code) {
      if (code === aliasMarker.charCodeAt(aliasCursor)) {
        if (!data) return nok(code);
        effects.exit("wikiLinkTarget");
        effects.enter("wikiLinkAliasMarker");
        return consumeAliasMarker(code);
      }

      if (code === endMarker.charCodeAt(endMarkerCursor)) {
        if (!data) return nok(code);
        effects.exit("wikiLinkTarget");
        effects.exit("wikiLinkData");
        effects.enter("wikiLinkMarker");
        return consumeEnd(code);
      }

      if (markdownLineEnding(code) || code === codes.eof) {
        return nok(code);
      }

      if (!markdownLineEndingOrSpace(code)) {
        data = true;
      }

      effects.consume(code);

      return consumeTarget;
    }

    function consumeAliasMarker(code) {
      if (aliasCursor === aliasMarker.length) {
        effects.exit("wikiLinkAliasMarker");
        effects.enter("wikiLinkAlias");
        return consumeAlias(code);
      }

      if (code !== aliasMarker.charCodeAt(aliasCursor)) {
        return nok(code);
      }

      effects.consume(code);
      aliasCursor++;

      return consumeAliasMarker;
    }

    function consumeAlias(code) {
      if (code === endMarker.charCodeAt(endMarkerCursor)) {
        if (!alias) return nok(code);
        effects.exit("wikiLinkAlias");
        effects.exit("wikiLinkData");
        effects.enter("wikiLinkMarker");
        return consumeEnd(code);
      }

      if (markdownLineEnding(code) || code === codes.eof) {
        return nok(code);
      }

      if (!markdownLineEndingOrSpace(code)) {
        alias = true;
      }

      effects.consume(code);

      return consumeAlias;
    }

    function consumeEnd(code) {
      if (endMarkerCursor === endMarker.length) {
        effects.exit("wikiLinkMarker");
        effects.exit("wikiLink");
        return ok(code);
      }

      if (code !== endMarker.charCodeAt(endMarkerCursor)) {
        return nok(code);
      }

      effects.consume(code);
      endMarkerCursor++;

      return consumeEnd;
    }
  }

  var call = { tokenize: tokenize };

  return {
    text: { 91: call, 33: call }, // 91: left square bracket, 33: exclamation mark
  };
}

export { wikiLink as syntax, html };
