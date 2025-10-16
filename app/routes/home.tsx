import type { Route } from "./+types/home";
import { Editor } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import { useState } from "react";
import { languageDefinition, languageConfig } from "../languageDefinition";
import { run_tscript } from "~/runTscript";
import { useLocalStorage } from "~/codeSaving";

console.log("Editor is:", Editor);
console.log("Type:", typeof Editor);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

function handleEditorWillMount(monaco: any) {
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

  for (let i in object) {
    result += object[i].value;
  }

  return result;
}

export default function Home() {
  const [code, setCode] = useLocalStorage("code", "");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value: any) => {
    setCode(value);
    setOutput(JSON.stringify(run_tscript(value || ""), null, 2));
    console.log("output:", output);
  };
  return (
    <div>
      <Editor
        className="p-4"
        height="80vh"
        defaultLanguage="tscript"
        value={code}
        onChange={handleEditorChange}
        beforeMount={handleEditorWillMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
      <div className="w-full text-[1.25rem] p-4">{formatOutput(output)}</div>
    </div>
  );
}
