import type { Route } from "./+types/home";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { run_tscript } from "~/runTscript";
import { useLocalStorage, downloadCode, useUpload } from "~/codeSaving";
import { useNavBar } from "../components/NavBarContext";
import { useEffect } from "react";
import { handleEditorWillMount } from "../monacoSetup";
import { formatOutput, formatError } from "../outputFormatting";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TScript IDE" },
    {
      name: "description",
      content: "TScript IDE based on the monaco-editor (like vs-code)",
    },
  ];
}

export default function Home() {
  const { triggerUpload } = useUpload();
  const { setOnNavClick } = useNavBar();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const turtleRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handler = async (action: string) => {
      if (action === "turtle") {
        setTurtle((prev) => !prev);
      } else if (action === "canvas") {
        setCanvas((prev) => !prev);
      } else if (action === "save") {
        downloadCode("code", code, "application/tscript");
      } else if (action === "upload") {
        try {
          const { filename, content } = await triggerUpload();
          setCode(content);
        } catch (err) {
          console.error("Upload failed:", err);
        }
      } else if (action.startsWith("fontsize: ")) {
        const sizeStr = action.split("fontsize: ")[1];
        const size = parseInt(sizeStr, 10);
        if (!isNaN(size)) {
          setFontsize(size);
        }
      }
    };

    setOnNavClick(() => handler);

    return () => setOnNavClick(() => {}); // cleanup on unmount
  }, [setOnNavClick]);

  const [code, setCode] = useLocalStorage("code", "");
  const [output, setOutput] = useState("");
  const [turtle, setTurtle] = useState(false);
  const [canvas, setCanvas] = useState(false);
  const [fontsize, setFontsize] = useState(14);

  const handleEditorChange = (value: any) => {
    setCode(value);
    let result = JSON.stringify(run_tscript(value || ""));
    //TODO: Interpret smart and not everytime the code changes
    setOutput(JSON.stringify(run_tscript(value || ""), null, 2));
  };

  useEffect(() => {
    formatOutput(output, turtleRef.current);
  }, [turtle, output, code]);

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
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      {canvas && (
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="fixed z-10 top-26 right-12 bottom-[200px] rounded-lg border-4 bg-white border-[#11111b] shadow-[4px_4px_0_0_rgba(17,17,27,1)]"
        ></canvas>
      )}
      {turtle && (
        <canvas
          ref={turtleRef}
          width={800}
          height={600}
          className="fixed z-10 top-26 right-12 bottom-[200px] rounded-lg border-4 bg-white border-[#11111b] shadow-[4px_4px_0_0_rgba(17,17,27,1)]"
        ></canvas>
      )}
      <div className="fixed whitespace-pre-line right-4 bottom-4 left-4 h-[15vh] rounded border-4 border-[#11111b] bg-[#181926] p-4 text-[1.25rem] shadow-[4px_4px_0_0_rgba(17,17,27,1)]">
        {formatOutput(output, turtleRef.current).startsWith("Error") ? (
          <div className="text-[1.25rem] font-bold text-[#f38ba8]">
            {formatError(output)}
          </div>
        ) : (
          formatOutput(output, turtleRef.current)
        )}
      </div>
    </div>
  );
}
