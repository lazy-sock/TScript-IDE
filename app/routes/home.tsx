import type { Route } from "./+types/home";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

console.log("Editor is:", Editor);
console.log("Type:", typeof Editor);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [code, setCode] = useState("");

  const handleEditorChange = (value: any) => {
    setCode(value);
  };
  return (
    <Editor
      className="p-4"
      height="80vh"
      defaultLanguage="javascript"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
}
