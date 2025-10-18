import type { Route } from "./+types/home";
import { Editor } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import { useState } from "react";
import { languageDefinition, languageConfig } from "../languageDefinition";
import { run_tscript } from "~/runTscript";
import { useLocalStorage, downloadCode, useUpload } from "~/codeSaving";
import { useNavBar } from "../components/NavBarContext";
import { useEffect } from "react";

console.log("Editor is:", Editor);
console.log("Type:", typeof Editor);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function handleEditorWillMount(monaco: any) {
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

function formatOutput(output: string): string {
  console.log(output);
  if (output == "") return "";
  let object = JSON.parse(output);
  let result = "";
  if (output.length === 0) return "";
  try {
    if (object[0].hasOwnProperty("type")) {
      if (object[0].type === "compile error") {
        return formatError(output);
      }
    }
  } catch (e) {
    console.log(e);
  }

  for (let i in object) {
    result += object[i].value;
    result += "\n";
  }

  return result;
}

function formatError(output: string): string {
  let result = "Error: ";
  if (output == "") return "";
  let object = JSON.parse(output);
  console.log("error object: ", object[0]);
  for (let i in object) {
    result += "Line " + object[i].line + ": ";
    result += object[i].message;
    result += "\n";
  }
  return result;
}

export default function Home() {
  const { triggerUpload } = useUpload();
  const { setOnNavClick } = useNavBar();

  useEffect(() => {
    const handler = async (action: string) => {
      console.log("Home received action:", action);
      if (action === "turtle") {
        setTurtle((prev) => !prev);
      } else if (action === "save") {
        console.log(code);
        downloadCode("code", code, "application/tscript");
      } else if (action === "upload") {
        try {
          const { filename, content } = await triggerUpload();
          console.log("Uploaded file:", filename);
          console.log("File content:", content);
          setCode(content);
        } catch (err) {
          console.error("Upload failed:", err);
        }
      } else if (action.startsWith("fontsize: ")) {
        const sizeStr = action.split("fontsize: ")[1];
        const size = parseInt(sizeStr, 10);
        if (!isNaN(size)) {
          setFontsize(size);
          console.log("asdf", size);
        }
      }
    };

    setOnNavClick(() => handler);

    return () => setOnNavClick(() => {}); // cleanup on unmount
  }, [setOnNavClick]);
  const [code, setCode] = useLocalStorage("code", "");
  const [output, setOutput] = useState("");
  const [turtle, setTurtle] = useState(false);
  const [fontsize, setFontsize] = useState(14);

  const handleEditorChange = (value: any) => {
    setCode(value);
    console.log(value);
    let result = JSON.stringify(run_tscript(value || ""));
    //TODO: Interpret smart and not everytime the code changes
    setOutput(JSON.stringify(run_tscript(value || ""), null, 2));
    console.log("output:", output);
  };
  return (
    <div className="h-screen bg-[#24273a]">
      <Editor
        className="mt-16 p-4 pt-8"
        height="90vh"
        defaultLanguage="tscript"
        value={code}
        onChange={handleEditorChange}
        beforeMount={handleEditorWillMount}
        theme="catppuccin"
        options={{
          minimap: { enabled: false },
          fontSize: fontsize,
        }}
      />
      {turtle && (
        <div className="fixed top-26 right-12 w-[800px] bottom-[200px] rounded-lg border-4 bg-white border-[#11111b] shadow-[4px_4px_0_0_rgba(17,17,27,1)]"></div>
      )}
      <div className="fixed whitespace-pre-line right-4 bottom-4 left-4 h-[15vh] rounded border-4 border-[#11111b] bg-[#181926] p-4 text-[1.25rem] shadow-[4px_4px_0_0_rgba(17,17,27,1)]">
        {formatOutput(output).startsWith("Error") ? (
          <div className="text-[1.25rem] font-bold text-[#f38ba8]">
            {formatError(output)}
          </div>
        ) : (
          formatOutput(output)
        )}
      </div>
    </div>
  );
}
