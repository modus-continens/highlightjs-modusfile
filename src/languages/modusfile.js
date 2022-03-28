/*
Language: Modusfile
Author: Tingmao Wang <m@maowtm.org>
Description: language definition for Modusfile files
Website: https://modus-continens.com/
Category: config
*/

/** @type LanguageFn */
export default function (hljs) {
  const KEYWORDS = {
    built_in: [
      "from",
      "run",
      "merge",
      "copy",
      "string_concat",
      "string_eq",
      "in_workdir",
      "set_workdir",
      "set_entrypoint",
      "set_cmd",
      "in_env",
      "set_env",
      "append_path",
      "number_eq",
      "number_gt",
      "number_lt",
      "number_geq",
      "number_leq"
    ]
  };

  const VARIABLE = {
    match: /[a-zA-Z0-9][a-zA-Z0-9_]*/,
    scope: "variable",
    relevance: 0
  };

  const FORMAT_STRING = {
    scope: 'string',
    begin: /f"/,
    end: /"/,
    relevance: 0,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      {
        scope: 'meta',
        begin: /\$\{/,
        end: /\}/,
        contains: [
          VARIABLE
        ]
      }
    ]
  };

  const VALUES = [
    FORMAT_STRING,
    VARIABLE,
    hljs.QUOTE_STRING_MODE
  ];

  const LITERAL = {
    begin: /[a-zA-Z0-9][a-zA-Z0-9_]*\s*\(/,
    end: /\)/,
    keywords: KEYWORDS,
    relevance: 0,
    scope: "title.function.invoke",
    contains: [
      ...VALUES,
      hljs.HASH_COMMENT_MODE,
    ],
  };

  const NOARG_LITERAL = {
    match: /[a-zA-Z0-9][a-zA-Z0-9_]*/,
    keywords: KEYWORDS,
    relevance: 0,
    scope: "title.function",
  };

  const VAREQX = {
    match: /[a-zA-Z0-9][a-zA-Z0-9_]*\s*(?==)/,
    scope: "variable",
    relevance: 0
  };

  const XEQVAR = {
    match: /(?<==)\s*[a-zA-Z0-9][a-zA-Z0-9_]*/,
    scope: "variable",
    relevance: 0
  };

  return {
    name: 'Modusfile',
    aliases: ['modus'],
    case_insensitive: false,
    contains: [
      hljs.HASH_COMMENT_MODE,
      LITERAL,
      VAREQX,
      XEQVAR,
      NOARG_LITERAL,
      ...VALUES,
    ],
    illegal: ''
  };
}
