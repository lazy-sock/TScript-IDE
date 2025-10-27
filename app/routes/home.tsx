import type { Route } from "./+types/home";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { run_tscript } from "~/runTscript";
import { useLocalStorage, downloadCode, useUpload } from "~/codeSaving";
import { useNavBar } from "../components/NavBarContext";
import { useEffect } from "react";
import { handleEditorWillMount } from "../monacoSetup";
import { formatOutput, formatError } from "../outputFormatting";
import Turtle from "~/components/Turtle";
import Canvas from "~/components/Canvas";

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
        setCanvas(false);
        setTurtle((prev) => !prev);
      } else if (action === "canvas") {
        setTurtle(false);
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
  const [formattedOutput, setFormattedOutput] = useState("");
  const [turtle, setTurtle] = useState(false);
  const [canvas, setCanvas] = useState(false);
  const [fontsize, setFontsize] = useState(14);
  const [inputs, setInputs]: any = useState([]);

  const [eventmode, setEventmode] = useState(false);

  const handleEditorChange = (value: any) => {
    if (code.includes("enterEventMode();")) {
      setEventmode(true);
      return;
    }
    setCode(value);
    console.log(inputs);
    const result = run_tscript(value || "", 3.0, inputs, canvasRef.current);
    //TODO: Interpret smart and not everytime the code changes
    setOutput(JSON.stringify(result, null, 2));
  };

  useEffect(() => {
    setEventmode(false);
    if (code.includes("enterEventMode();")) {
      setEventmode(true);
      return;
    }
    handleEditorChange(code);
    setFormattedOutput(
      formatOutput(output, turtleRef.current, canvasRef.current),
    );

    // TEMPORARY: This is needed so the turtle and canvas instantly contain the drawing
    setTimeout(() => {
      formatOutput(output, turtleRef.current, canvasRef.current);
    }, 200);
  }, [turtle, canvas, inputs, output, code]);

  const handlePendingEventsChange = (newEvents: any[]) => {
    setInputs(newEvents);
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
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      <Canvas
        visible={canvas}
        ref={canvasRef}
        onPendingEventsChange={handlePendingEventsChange}
      />
      <Turtle visible={turtle} ref={turtleRef} />
      <div className="fixed right-4 bottom-4 left-4 h-[15vh] overflow-scroll rounded border-4 border-[#11111b] bg-[#181926] px-2 py-1 font-mono whitespace-pre-line shadow-[4px_4px_0_0_rgba(17,17,27,1)] sm:px-4 sm:py-2 md:text-[1.25rem]">
        {formattedOutput.startsWith("Error") ? (
          <span className="font-bold text-[#f38ba8] md:text-[1.25rem]">
            {formatError(output)}
          </span>
        ) : (
          formattedOutput
        )}
      </div>
    </div>
  );
}
