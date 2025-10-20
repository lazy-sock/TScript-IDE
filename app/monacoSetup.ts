import { start } from "repl";
import {
  languageDefinition,
  languageConfig,
  core,
  math,
  turtle,
  canvas,
  audio,
} from "./languageDefinition";

export function handleEditorWillMount(monaco: any) {
  monaco.editor.defineTheme("catppuccin", {
    base: "vs-dark", // dark base
    inherit: true,
    rules: [
      { token: "comment", foreground: "8087a2", fontStyle: "italic" }, // overlay1
      { token: "keyword", foreground: "c6a0f6", fontStyle: "bold" }, // mauve
      { token: "number", foreground: "f5a97f" }, // peach
      { token: "string", foreground: "a6da95" }, // green
      { token: "variable", foreground: "cad3f5" }, // text (bright)
      { token: "type", foreground: "8aadf4" }, // blue
      { token: "delimiter", foreground: "939ab7" }, // overlay2
      { token: "invalid", foreground: "ed8796" }, // red
    ],
    colors: {
      "editor.background": "#24273a", // base
      "editor.foreground": "#cad3f5", // text
      "editorCursor.foreground": "#f4dbd6", // rosewater
      "editor.lineHighlightBackground": "#1e2030", // mantle
      "editor.selectionBackground": "#494d64", // surface1
      "editor.inactiveSelectionBackground": "#363a4f", // surface0
      "editorIndentGuide.background": "#6e738d", // overlay0
      "editorIndentGuide.activeBackground": "#8087a2", // overlay1
      "editorLineNumber.foreground": "#a5adcb", // subtext0
      "editorLineNumber.activeForeground": "#cad3f5", // text
    },
  });
  monaco.editor.setTheme("catppuccin");
  monaco.languages.register({ id: "tscript" });
  monaco.languages.setMonarchTokensProvider("tscript", languageDefinition);
  monaco.languages.setLanguageConfiguration("tscript", languageConfig);

  monaco.languages.registerCompletionItemProvider("tscript", {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestionskeywords = languageDefinition.keywords.map(
        (keyword) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          range: range,
        }),
      );
      const suggestions = [
        ...suggestionskeywords,
        ...core(range),
        ...math(range),
        ...turtle(range),
        ...canvas(range),
        ...audio(range),
      ];

      return { suggestions } as any;
    },
  });
}
