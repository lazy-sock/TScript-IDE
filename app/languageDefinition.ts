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
      [
        /\bturtle\b/,
        {
          token: "turtle",
        },
      ],
      [
        /\bcanvas\b/,
        {
          token: "canvas",
        },
      ],
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

export const core = (range: any) => [
  {
    label: "terminate",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "terminate()",
    documentation:
      "Immediately terminates the program. This is considered normal termination.",
    range: range,
  },
  {
    label: "assert",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "assert(${1:condition}, ${2:message})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Tests whether condition evaluates to false. Stops program and emits message if condition fails.",
    range: range,
  },
  {
    label: "error",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "error(${1:message})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Stops the program and emits message as an error message.",
    range: range,
  },
  {
    label: "same",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "same(${1:first}, ${2:second})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Tests whether its arguments refer to the same object.",
    range: range,
  },
  {
    label: "version",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "version()",
    documentation:
      "Returns a dictionary describing the current TScript version.",
    range: range,
  },
  {
    label: "print",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "print(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Outputs its argument as a new line into the message area.",
    range: range,
  },
  {
    label: "alert",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "alert(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Opens a modal message box presenting the text to the user.",
    range: range,
  },
  {
    label: "confirm",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "confirm(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Opens a modal message box with confirm/cancel options. Returns true if confirmed, false if canceled.",
    range: range,
  },
  {
    label: "prompt",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "prompt(${1:text})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Opens a modal message box where user can input a string. Returns the input string or null.",
    range: range,
  },
  {
    label: "wait",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "wait(${1:ms})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Delays program execution for ms milliseconds.",
    range: range,
  },
  {
    label: "time",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "time()",
    documentation:
      "Returns the number of milliseconds since midnight 01.01.1970 UTC.",
    range: range,
  },
  {
    label: "localtime",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "localtime()",
    documentation:
      "Returns the number of milliseconds since midnight 01.01.1970 in local time.",
    range: range,
  },
  {
    label: "exists",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "exists(${1:key})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns true if a value was stored with the given key, false otherwise.",
    range: range,
  },
  {
    label: "load",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "load(${1:key})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the value that was stored with the given key.",
    range: range,
  },
  {
    label: "save",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "save(${1:key}, ${2:value})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Stores the value with the given key to persistent storage.",
    range: range,
  },
  {
    label: "listKeys",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "listKeys()",
    documentation: "Returns an array containing the keys to all stored values.",
    range: range,
  },
  {
    label: "deepcopy",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "deepcopy(${1:value})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Creates a deep copy of a container.",
    range: range,
  },
  {
    label: "setEventHandler",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setEventHandler(${1:event}, ${2:handler})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Sets an event handler for a named event.",
    range: range,
  },
  {
    label: "enterEventMode",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "enterEventMode()",
    documentation: "Puts the program into event handling mode.",
    range: range,
  },
  {
    label: "quitEventMode",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "quitEventMode(${1:result})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Puts the program back into normal processing mode.",
    range: range,
  },
];
export const math = (range: any) => [
  {
    label: "pi",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "pi()",
    documentation: "Returns the constant pi.",
    range: range,
  },
  {
    label: "e",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "e()",
    documentation: "Returns the constant e.",
    range: range,
  },
  {
    label: "abs",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "abs(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the absolute value of its argument. For an integer argument the result is of type integer. The function overflows only for the value -2147483648.",
    range: range,
  },
  {
    label: "sqrt",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "sqrt(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the square root of its argument.",
    range: range,
  },
  {
    label: "cbrt",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "cbrt(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the cube root of its argument.",
    range: range,
  },
  {
    label: "floor",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "floor(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the argument rounded down, i.e., the closest integer not larger than x. Although the return value is an integer, it is of type Real to avoid integer overflow. ",
    range: range,
  },
  {
    label: "round",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "round(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the argument rounded to the nearest integer. Although the return value is an integer, it is of type Real to avoid integer overflow. ",
    range: range,
  },
  {
    label: "ceil",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "ceil(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the argument rounded up, i.e., the closest integer not smaller than x. Although the return value is an integer, it is of type Real to avoid integer overflow. Returns the argument rounded up, i.e., the closest integer not smaller than x. Although the return value is an integer, it is of type Real to avoid integer overflow. ",
    range: range,
  },
  {
    label: "sin",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "sin(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the sine of its argument in radians. ",
    range: range,
  },
  {
    label: "cos",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "cos(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the cosine of its argument in radians.",
    range: range,
  },
  {
    label: "tan",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "tan(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the tangent of its argument in radians.",
    range: range,
  },
  {
    label: "sinh",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "sinh(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the hyperbolic sine of its argument. ",
    range: range,
  },
  {
    label: "cosh",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "cosh(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the hyperbolic cosine of its argument. ",
    range: range,
  },
  {
    label: "tanh",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "tanh(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the hyperbolic tangent of its argument. ",
    range: range,
  },
  {
    label: "asin",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "asin(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the inverse sine of its argument. The return value is an angle in radians.",
    range: range,
  },
  {
    label: "acos",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "acos(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the inverse cosine of its argument. The return value is an angle in radians.",
    range: range,
  },
  {
    label: "atan",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "atan(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the inverse tangent of its argument. The return value is an angle in radians.",
    range: range,
  },
  {
    label: "atan2",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "atan2(${1:y}, ${2:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the inverse tangent of y/x. This is the angle between the vectors (x, y) and (1, 0) in radians.",
    range: range,
  },
  {
    label: "asinh",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "asinh(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the inverse hyperbolic sine of its argument.",
    range: range,
  },
  {
    label: "acosh",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "acosh(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the inverse hyperbolic cosine of its argument.",
    range: range,
  },
  {
    label: "atanh",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "atanh(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the inverse hyperbolic tangent of its argument.",
    range: range,
  },
  {
    label: "exp",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "exp(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the exponential function of its argument.",
    range: range,
  },
  {
    label: "log",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "log(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the natural logarithm of its argument.",
    range: range,
  },
  {
    label: "log2",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "log2(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the logarithm with base 2 of its argument.",
    range: range,
  },
  {
    label: "log10",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "log10(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Returns the logarithm with base 10 of its argument.",
    range: range,
  },
  {
    label: "pow",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "pow(${1:b}, ${2:e})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the e-th power of b. It is an alternative to operator ^ that always works with data type Real.",
    range: range,
  },
  {
    label: "sign",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "sign(${1:x})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the sign of its argument, encoded as -1, 0, or +1. The return type is an integer if the argument is, otherwise it is real.",
    range: range,
  },
  {
    label: "min",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "min(${1:a}, ${2:b})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the smaller of its two arguments. Applicable to ordered non-numeric arguments as well.",
    range: range,
  },
  {
    label: "max",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "max(${1:a}, ${2:b})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the larger of its two arguments. Applicable to ordered non-numeric arguments as well.",
    range: range,
  },
  {
    label: "random",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "random()",
    documentation:
      "Returns a real number drawn from the uniform distribution on the half-open unit interval [0, 1[.",
    range: range,
  },
];
export const turtle = (range: any) => [
  {
    label: "reset",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "reset(${1:x}, ${2:y}, ${3:degrees}, ${4:down})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Places the turtle at position (x, y) on its drawing area. Its orientation is given by degrees, the color is set to black, and the pen is active if down is true. Using this function for actual drawing is considered improper use, or 'cheating', since this operation is not available to an actual robot. The intended use is to initialize the turtle in a different position than the center. ",
    range: range,
  },
  {
    label: "move",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "move(${1:distance})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Moves the turtle forward by the given distance, or backward if the distance is negative. If the pen is down in this state then a line is drawn. ",
    range: range,
  },
  {
    label: "turn",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "turn(${1:degrees})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Rotates the turtle clockwise, where 360 degrees are one full rotation. A negative angle corresponds to a counter-clockwise rotation. ",
    range: range,
  },
  {
    label: "color",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "color(${1:red}, ${2:green}, ${3:blue})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the color of the pen, defined by red, green and blue components. All values are clipped to the range [0, 1]. ",
    range: range,
  },
  {
    label: "pen",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "pen(${1:down})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Lifts the pen if down is false and lowers the pen if down is true. ",
    range: range,
  },
];
export const canvas = (range: any) => [
  {
    label: "width",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "width()",
    documentation: "Returns the current width of the canvas in pixels. ",
    range: range,
  },
  {
    label: "height",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "height()",
    documentation: "Returns the current height of the canvas in pixels. ",
    range: range,
  },
  {
    label: "setLineWidth",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setLineWidth(${1:width})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the line width. The parameter width must be a positive number. ",
    range: range,
  },
  {
    label: "setLineColor",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setLineColor(${1:red}, ${2:green}, ${3:blue}, ${4:alpha})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the line color. All arguments are in the range 0 to 1. The alpha (opacity) argument is optional, it defaults to 1. ",
    range: range,
  },
  {
    label: "setFillColor",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setFillColor(${1:red}, ${2:green}, ${3:blue}, ${4:alpha})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the fill color. All arguments are in the range 0 to 1. The alpha (opacity) argument is optional, it defaults to 1. ",
    range: range,
  },
  {
    label: "setOpacity",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setOpacity(${1:alpha})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets a global opacity (alpha) value for all drawing operations. A value of 0 means that operations are fully transparent and hence have no effect, while a value of 1 means that drawing is fully opaque. ",
    range: range,
  },
  {
    label: "setFont",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setFont(${1:fontface}, ${2:fontsize})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the current font. The fontface is a string, it must correspond to a font existing on the system. The fontsize is defined in pixels, it must be a positive number. The default font is a 16px Helvetica font. ",
    range: range,
  },
  {
    label: "setTextAlign",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setTextAlign(${1:alignment})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets the text alignment. Possible values are 'left' (the default), 'center', and 'right'. The position given in text drawing commands is relative to the alignment. ",
    range: range,
  },
  {
    label: "getPixel",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "getPixel(${1:x}, ${2:y})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Returns the 'raw' pixel value as an array of four numbers, encoding the RGBA color value. Each component (red, green, blue, and alpha) is an integer in the range 0 to 255. This is the format in which the color information is stored in the graphics hardware. ",
    range: range,
  },
  {
    label: "setPixel",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "setPixel(${1:x}, ${2:y}, ${3:data})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Sets a raw pixel value. The data argument is an array of four integers with the same meaning as the return value of getPixel. ",
    range: range,
  },
  {
    label: "clear",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "clear()",
    documentation:
      "	The function clear() erases all drawn content by filling the entire canvas with the current fill color. It also resets the transformation (see function reset() below). ",
    range: range,
  },
  {
    label: "line",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "line(${1:x1}, ${2:y1}, ${3:x2}, ${4:y2})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws a line from (x1, y1) to (x2, y2) using the current line width and line color. ",
    range: range,
  },
  {
    label: "rect",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "rect(${1:x}, ${2:y}, ${3:width}, ${4:height})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws the outline of a rectangle with the current line width and line color. ",
    range: range,
  },
  {
    label: "fillRect",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "fillRect(${1:x}, ${2:y}, ${3:width}, ${4:height})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Fills a rectangle with the current fill color. ",
    range: range,
  },
  {
    label: "frameRect",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "frameRect(${1:x}, ${2:y}, ${3:width}, ${4:height})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Fills a rectangle with the current fill color and draws the outline with the current line color and line width. ",
    range: range,
  },
  {
    label: "circle",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "circle(${1:x}, ${2:y}, ${3:radius})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws the outline of a circle with the current line width and line color. ",
    range: range,
  },
  {
    label: "fillCircle",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "fillCircle(${1:x}, ${2:y}, ${3:radius})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Fills a circle with the current fill color. ",
    range: range,
  },
  {
    label: "frameCircle",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "frameCircle(${1:x}, ${2:y}, ${3:radius})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Fills a circle with the current fill color and draws the outline with the current line color and line width. ",
    range: range,
  },
  {
    label: "curve",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "curve(${1:points}, ${2:closed})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws a polygon given by the array points, each entry of which is an array containing (x, y) coordinates. For example, the array [[100, 100], [200, 100], [100, 200]] specifies a curve consisting of two lines (three lines forming a triangle if the curve is closed), connecting the points (100, 100), (200, 100), and (100, 200). If the optional argument closed is set to true then the first and the last point are connected, resulting in a closed polygon. The curve is drawn with the current line width and line color. ",
    range: range,
  },
  {
    label: "fillArea",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "fillArea(${1:points})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Fills the closed polygon given by points (see function curve) with the current fill color, and then draws the polygon outline with the given line color and line width. ",
    range: range,
  },
  {
    label: "frameArea",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "frameArea(${1:points})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Fills the closed polygon given by points (see function curve) with the current fill color, and then draws the polygon outline with the given line color and line width. ",
    range: range,
  },
  {
    label: "text",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "text(${1:x}, ${2:y}, ${3:str})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws the string str at position (x, y), relative to the current text alignment, using the current font and fill color. ",
    range: range,
  },
  {
    label: "paintImage",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "paintImage(${1:x}, ${2:y}, ${3:source})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws an image source at position (x, y). The source can be a canvas.Bitmap object or null. In the latter case, the current canvas is drawn. ",
    range: range,
  },
  {
    label: "paintImageSection",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText:
      "paintImage(${1:dx}, ${2:dy}, ${3:dw}, ${d4:dh}, ${5:source}, ${6:sx}, ${7:sy}, ${8:sw}, ${9:sh})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Draws a section of the image source specified by the rectangle (sx, sy, sw, sh) into the rectangle specified by (dx, dy, dw, dh) on the target canvas. The source can be a canvas.Bitmap object or null. In the latter case, a section from the current canvas is drawn. ",
    range: range,
  },
  {
    label: "reset",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "reset()",
    documentation:
      "Resets the current transformation. Afterwards the origin of the coordinate system is the top left corner, with axes extending to the right and to the bottom. ",
    range: range,
  },
  {
    label: "shift",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "shift(${1:dx}, ${2:dy})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Translates the origin of the coordinate system by the vector (dx, dy).",
  },
  {
    label: "scale",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "scale(${1:factor})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: "Scales the coordinate system by the given factor. ",
    range: range,
  },
  {
    label: "rotate",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "rotate(${1:angle})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Rotates the coordinate system clockwise by the given angle. The angle is given in radians, i.e., a full rotation corresponds to the angle 2 * math.pi(). ",
    range: range,
  },
  {
    label: "transform",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "transform(${1:A}, ${2:b})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Transforms coordinates (x, y) into new coordinates A (x, y) + b, where A is the 2x2 matrix [[A11, A12], [A21, A22]] and b is the vector [b1, b2]. ",
    range: range,
  },
  {
    label: "Bitmap",
    kind: monaco.languages.CompletionItemKind.Class,
    insertText: "Bitmap(${1:resourceOrWidth}, ${2:height})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Constructs a bitmap (image) object. The parameter resourceOrWidth is either a resource string containing a data URI, or an integer specifying the width. The height parameter is relevant only in the latter case. The constructor creates a bitmap image with the given content, or of the given dimensions. A bitmap created from dimensions is initially transparent black. ",
    range: range,
  },
];
export const audio = (range: any) => [
  {
    label: "Sound",
    kind: monaco.languages.CompletionItemKind.Class,
    insertText: "Sound(${1:buffers}, ${2:sampleRate})",
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation:
      "Constructs a sound sample object. The parameter buffers is an array of arrays containing the samples to be played, or a string containing a data URI. The second parameter sampleRate specifies the rate at which the array samples are to be played in Hz. The sample rate should be in the range 8000 Hz to 96000 Hz. If the first parameter is a data URI, then the sample rate is ignored. Typical channel numbers are one (mono) and two (stereo). ",
    range: range,
  },
  {
    label: "play",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "play()",
    documentation:
      "Starts playing the sound. The playback is asynchronous, meaning that the call returns immediately regardless of sound duration. Further instances of the sound can be played by calling the function again, even while the sound is still playing. ",
    range: range,
  },
  {
    label: "startLoop",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "startLoop()",
    documentation:
      "Starts playing the sound in a loop. The playback is asynchronous, meaning that the call returns immediately regardless of sound duration. Further instances of the sound can be played by calling the function again, even while the sound is still playing. ",
    range: range,
  },
  {
    label: "stopLoop",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "stopLoop()",
    documentation:
      "Stops a sound loop that was previously started with startLoop. ",
    range: range,
  },
  {
    label: "looping",
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: "looping()",
    documentation:
      "Returns true if the sound loop is currently running, and otherwise false. ",
    range: range,
  },
];
