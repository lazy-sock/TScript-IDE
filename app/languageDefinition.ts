export const languageDefinition = {
  defaultToken: "",
  tokenPostfix: ".tscript",

  keywords: [
    "and",
    "break",
    "catch",
    "class",
    "constructor",
    "continue",
    "do",
    "else",
    "false",
    "for",
    "from",
    "function",
    "if",
    "namespace",
    "not",
    "null",
    "or",
    "private",
    "protected",
    "public",
    "return",
    "static",
    "super",
    "then",
    "this",
    "throw",
    "true",
    "try",
    "use",
    "var",
    "while",
    "xor",
  ],

  operators: [
    "=",
    ">",
    "<",
    "!",
    "==",
    "<=",
    ">=",
    "!=",
    "+",
    "-",
    "*",
    "/",
    "//",
    "%",
    "^",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "^=",
  ],

  symbols: /[=><!+\-*\/%\^]+/,
  escapes: /\\(?:["\\/rnftbu]|u[0-9A-Fa-f]{4})/,

  tokenizer: {
    root: [
      // Identifiers and keywords
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // Whitespace
      { include: "@whitespace" },

      // Numbers
      [/\d+\.\d+([eE][+\-]?\d+)?/, "number.float"],
      [/\d+[eE][+\-]?\d+/, "number.float"],
      [/\d+/, "number"],

      // Strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string"],

      // Delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [/[;,.]/, "delimiter"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],
    ],

    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/#\*/, "comment", "@comment"],
      [/#[^*].*$/, "comment"],
    ],

    comment: [
      [/[^*#]+/, "comment"],
      [/\*#/, "comment", "@pop"],
      [/[*#]/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],
  },
};

export const languageConfig = {
  comments: {
    lineComment: "#",
    blockComment: ["#*", "*#"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
  ],
};
