import { languageDefinition, languageConfig } from "./languageDefinition";

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
      // Add more token-specific rules as needed
    ],
    colors: {
      "editor.background": "#24273a", // base :contentReference[oaicite:1]{index=1}
      "editor.foreground": "#cad3f5", // text :contentReference[oaicite:2]{index=2}
      "editorCursor.foreground": "#f4dbd6", // rosewater :contentReference[oaicite:3]{index=3}
      "editor.lineHighlightBackground": "#1e2030", // mantle :contentReference[oaicite:4]{index=4}
      "editor.selectionBackground": "#494d64", // surface1 :contentReference[oaicite:5]{index=5}
      "editor.inactiveSelectionBackground": "#363a4f", // surface0 :contentReference[oaicite:6]{index=6}
      "editorIndentGuide.background": "#6e738d", // overlay0 :contentReference[oaicite:7]{index=7}
      "editorIndentGuide.activeBackground": "#8087a2", // overlay1 :contentReference[oaicite:8]{index=8}
      "editorLineNumber.foreground": "#a5adcb", // subtext0 :contentReference[oaicite:9]{index=9}
      "editorLineNumber.activeForeground": "#cad3f5", // text :contentReference[oaicite:10]{index=10}
    },
  });
  monaco.editor.setTheme("catppuccin");
  monaco.languages.register({ id: "tscript" });
  monaco.languages.setMonarchTokensProvider("tscript", languageDefinition);
  monaco.languages.setLanguageConfiguration("tscript", languageConfig);
  monaco.languages.registerCompletionItemProvider("tscript", {
    provideCompletionItems: (model: any, position: any) => {
      const suggestions = [
        // Keywords
        ...[
          "var",
          "function",
          "class",
          "if",
          "else",
          "for",
          "while",
          "do",
          "return",
          "break",
          "continue",
          "try",
          "catch",
          "throw",
          "namespace",
          "use",
          "from",
          "constructor",
          "static",
          "public",
          "private",
          "protected",
          "super",
          "this",
          "true",
          "false",
          "null",
          "and",
          "or",
          "not",
          "xor",
          "then",
        ].map((keyword) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
        })),
      ];

      return { suggestions };
    },
  });
}
