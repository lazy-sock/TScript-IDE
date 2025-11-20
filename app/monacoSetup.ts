import {
  languageDefinition,
  languageConfig,
  core,
  math,
  turtle,
  canvas,
  audio,
} from "./languageDefinition";

function parseDocument(code: string) {
  const symbols = new Map<string, string>();
  // Simple regex-based parser to extract function and variable names with their types
  const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*:\s*(\w+)/g;
  const variableRegex = /var\s+(\w+)\s*:\s*(\w+)/g;

  let match;
  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1];
    const returnType = match[3];
    symbols.set(name, `Function returning ${returnType}`);
  }

  while ((match = variableRegex.exec(code)) !== null) {
    const name = match[1];
    const varType = match[2];
    symbols.set(name, `Variable of type ${varType}`);
  }

  return symbols;
}

export function handleEditorWillMount(monaco: any) {
  monaco.editor.defineTheme("catppuccin", {
    base: "vs-dark", // dark base
    inherit: true,
    rules: [
      { token: "comment", foreground: "8087a2", fontStyle: "italic" }, // darker blueish gray
      { token: "keyword", foreground: "c6a0f6", fontStyle: "bold" }, // mauve
      { token: "number", foreground: "f5a97f" }, // peach
      { token: "string", foreground: "a6da95" }, // green
      { token: "variable", foreground: "cad3f5" }, // bright blue
      { token: "type", foreground: "8aadf4" }, // blue
      { token: "delimiter", foreground: "939ab7" }, // blueish gray
      { token: "invalid", foreground: "ed8796" }, // red
      { token: "turtle", foreground: "a6da95" }, // green
      { token: "canvas", foreground: "#c6a0f6" }, // mauvre
    ],
    colors: {
      "editor.background": "#24273a", // blueish black
      "editor.foreground": "#cad3f5", // blueish white
      "editorCursor.foreground": "#f4dbd6", // rosewater
      "editor.lineHighlightBackground": "#1e2030", // mantle
      "editor.selectionBackground": "#494d64", // blueish gray
      "editor.inactiveSelectionBackground": "#363a4f", // darker blueish gray
      "editorIndentGuide.background": "#6e738d", // brighter blueish gray
      "editorIndentGuide.activeBackground": "#8087a2", // even brighter blueish gray
      "editorLineNumber.foreground": "#a5adcb", // even more brighter blueish gray
      "editorLineNumber.activeForeground": "#cad3f5", // blueish white
    },
  });
  monaco.editor.setTheme("catppuccin");
  monaco.languages.register({ id: "tscript" });
  monaco.languages.setMonarchTokensProvider("tscript", languageDefinition);
  monaco.languages.setLanguageConfiguration("tscript", languageConfig);

  monaco.languages.registerCompletionItemProvider("tscript", {
    triggerCharacters: ["."],
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const lineContent = model.getLineContent(position.lineNumber);
      const prefix = lineContent.substring(0, position.column - 1);

      function inNamespace(ns: string): boolean {
        const re = new RegExp(`\\b${ns}\\.\\s*$`);
        return re.test(prefix);
      }

      const keywordsSuggestions = languageDefinition.keywords.map(
        (keyword) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          range: range,
        }),
      );

      let suggestions: any = [];

      if (inNamespace("turtle")) {
        suggestions = [...turtle(range)];
      } else if (inNamespace("canvas")) {
        suggestions = [...canvas(range)];
      } else {
        // global suggestions
        suggestions = [...keywordsSuggestions, ...core(range)];
      }

      return { suggestions };
    },
  });

  monaco.languages.registerHoverProvider("tscript", {
    provideHover: (model: any, position: any) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const allItems = [
        ...core({
          startLineNumber: 0,
          endLineNumber: 0,
          startColumn: 0,
          endColumn: 0,
        }),
        ...math({
          startLineNumber: 0,
          endLineNumber: 0,
          startColumn: 0,
          endColumn: 0,
        }),
        ...turtle({
          startLineNumber: 0,
          endLineNumber: 0,
          startColumn: 0,
          endColumn: 0,
        }),
        ...canvas({
          startLineNumber: 0,
          endLineNumber: 0,
          startColumn: 0,
          endColumn: 0,
        }),
        ...audio({
          startLineNumber: 0,
          endLineNumber: 0,
          startColumn: 0,
          endColumn: 0,
        }),
      ];

      const item = allItems.find((i) => i.label === word.word);
      if (!item?.documentation) return null;

      return {
        contents: [{ value: item.documentation }],
      };
    },
  });
}
