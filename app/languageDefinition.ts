import * as monaco from "monaco-editor";

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

export const core = [
  {
    label: "terminate",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "terminate()",
    documentation:
      "Immediately terminates the program. This is considered normal termination.",
  },
  {
    label: "assert",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "assert(${1:condition}, ${2:message})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Tests whether condition evaluates to false. Stops program and emits message if condition fails.",
  },
  {
    label: "error",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "error(${1:message})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Stops the program and emits message as an error message.",
  },
  {
    label: "same",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "same(${1:first}, ${2:second})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Tests whether its arguments refer to the same object.",
  },
  {
    label: "version",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "version()",
    documentation:
      "Returns a dictionary describing the current TScript version.",
  },
  {
    label: "print",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "print(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Outputs its argument as a new line into the message area.",
  },
  {
    label: "alert",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "alert(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Opens a modal message box presenting the text to the user.",
  },
  {
    label: "confirm",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "confirm(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Opens a modal message box with confirm/cancel options. Returns true if confirmed, false if canceled.",
  },
  {
    label: "prompt",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "prompt(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Opens a modal message box where user can input a string. Returns the input string or null.",
  },
  {
    label: "wait",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "wait(${1:ms})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Delays program execution for ms milliseconds.",
  },
  {
    label: "time",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "time()",
    documentation:
      "Returns the number of milliseconds since midnight 01.01.1970 UTC.",
  },
  {
    label: "localtime",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "localtime()",
    documentation:
      "Returns the number of milliseconds since midnight 01.01.1970 in local time.",
  },
  {
    label: "exists",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "exists(${1:key})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns true if a value was stored with the given key, false otherwise.",
  },
  {
    label: "load",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "load(${1:key})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the value that was stored with the given key.",
  },
  {
    label: "save",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "save(${1:key}, ${2:value})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Stores the value with the given key to persistent storage.",
  },
  {
    label: "listKeys",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "listKeys()",
    documentation: "Returns an array containing the keys to all stored values.",
  },
  {
    label: "deepcopy",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "deepcopy(${1:value})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates a deep copy of a container.",
  },
  {
    label: "setEventHandler",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setEventHandler(${1:event}, ${2:handler})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Sets an event handler for a named event.",
  },
  {
    label: "enterEventMode",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "enterEventMode()",
    documentation: "Puts the program into event handling mode.",
  },
  {
    label: "quitEventMode",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "quitEventMode(${1:result})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Puts the program back into normal processing mode.",
  },
];
export const math = [
  {
    label: "pi",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "pi()",
    documentation: "Returns the constant pi.",
  },
  {
    label: "e",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "e()",
    documentation: "Returns the constant e.",
  },
  {
    label: "abs",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "abs(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the absolute value of its argument. For an integer argument the result is of type integer. The function overflows only for the value -2147483648.",
  },
  {
    label: "sqrt",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "sqrt(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the square root of its argument.",
  },
  {
    label: "cbrt",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "cbrt(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the cube root of its argument.",
  },
  {
    label: "floor",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "floor(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the argument rounded down, i.e., the closest integer not larger than x. Although the return value is an integer, it is of type Real to avoid integer overflow. ",
  },
  {
    label: "round",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "round(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the argument rounded to the nearest integer. Although the return value is an integer, it is of type Real to avoid integer overflow. ",
  },
  {
    label: "ceil",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "ceil(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the argument rounded up, i.e., the closest integer not smaller than x. Although the return value is an integer, it is of type Real to avoid integer overflow. Returns the argument rounded up, i.e., the closest integer not smaller than x. Although the return value is an integer, it is of type Real to avoid integer overflow. ",
  },
  {
    label: "sin",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "sin(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the sine of its argument in radians. ",
  },
];
export const turtle = [
  {
    label: "reset",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "reset(${1:x}, ${2:y}, ${3:degrees}, ${4:down})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Places the turtle at position (x, y) on its drawing area. Its orientation is given by degrees, the color is set to black, and the pen is active if down is true. Using this function for actual drawing is considered improper use, or 'cheating', since this operation is not available to an actual robot. The intended use is to initialize the turtle in a different position than the center. ",
  },
  {
    label: "move",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "move(${1:distance})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Moves the turtle forward by the given distance, or backward if the distance is negative. If the pen is down in this state then a line is drawn. ",
  },
  {
    label: "turn",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "turn(${1:degrees})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Rotates the turtle clockwise, where 360 degrees are one full rotation. A negative angle corresponds to a counter-clockwise rotation. ",
  },
  {
    label: "color",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "color(${1:red}, ${2:green}, ${3:blue})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the color of the pen, defined by red, green and blue components. All values are clipped to the range [0, 1]. ",
  },
  {
    label: "pen",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "pen(${1:down})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Lifts the pen if down is false and lowers the pen if down is true. ",
  },
];
export const canvas = [];
export const audio = [
  {
    label: "Sound",
    kind: monaco.languages.CompletionItemKind.Class,
    insertText: "Sound(${1:buffers}, ${2:sampleRate})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Constructs a sound sample object. The parameter buffers is an array of arrays containing the samples to be played, or a string containing a data URI. The second parameter sampleRate specifies the rate at which the array samples are to be played in Hz. The sample rate should be in the range 8000 Hz to 96000 Hz. If the first parameter is a data URI, then the sample rate is ignored. Typical channel numbers are one (mono) and two (stereo). ",
  },
  {
    label: "play",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "play()",
    documentation:
      "Starts playing the sound. The playback is asynchronous, meaning that the call returns immediately regardless of sound duration. Further instances of the sound can be played by calling the function again, even while the sound is still playing. ",
  },
  {
    label: "startLoop",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "startLoop()",
    documentation:
      "Starts playing the sound in a loop. The playback is asynchronous, meaning that the call returns immediately regardless of sound duration. Further instances of the sound can be played by calling the function again, even while the sound is still playing. ",
  },
  {
    label: "stopLoop",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "stopLoop()",
    documentation:
      "Stops a sound loop that was previously started with startLoop. ",
  },
  {
    label: "looping",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "looping()",
    documentation:
      "Returns true if the sound loop is currently running, and otherwise false. ",
  },
];

export function registerCompletionItemProvider() {
  return monaco.languages.registerCompletionItemProvider("tscript", {
    provideCompletionItems: (model: any, position: any) => {
      const suggestionskeywords = languageDefinition.keywords.map(
        (keyword) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
        }),
      );
      const suggestions = [
        ...suggestionskeywords,
        ...core,
        ...math,
        ...turtle,
        ...canvas,
        ...audio,
      ];

      return { suggestions: suggestions } as any;
    },
  });
}
