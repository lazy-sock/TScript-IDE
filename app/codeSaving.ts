import { useState, useEffect } from "react";

export function useLocalStorage(key: any, defaultValue: any) {
  const [value, setValue] = useState(() => {
    const json = localStorage.getItem(key);
    return json !== null ? JSON.parse(json) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function downloadCode(
  fileName: string,
  content: string,
  mimeType: string = "text/plain",
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeFileName = fileName.endsWith(".tscript")
    ? fileName
    : `${fileName}.tscript`;
  a.download = safeFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import { useRef } from "react";

type UploadResult = {
  filename: string;
  content: string;
};

export function useUpload(): {
  triggerUpload: () => Promise<UploadResult>;
} {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerUpload = (): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
      // Create input element if not created already
      let inputEl = inputRef.current;
      if (!inputEl) {
        inputEl = document.createElement("input");
        inputEl.type = "file";
        inputEl.accept = ".tscript,text/plain"; // restrict to .tscript
        inputEl.style.display = "none";
        document.body.appendChild(inputEl);
        inputRef.current = inputEl;
      }

      inputEl.value = ""; // clear previous selection
      inputEl.onchange = () => {
        if (!inputEl!.files || inputEl!.files.length === 0) {
          reject(new Error("No file selected"));
          return;
        }
        const file = inputEl!.files[0];
        const reader = new FileReader();

        reader.onerror = () => {
          reject(reader.error || new Error("FileReader error"));
        };

        reader.onload = () => {
          const result = reader.result;
          if (typeof result !== "string") {
            reject(new Error("Unexpected file content type"));
            return;
          }
          resolve({
            filename: file.name,
            content: result,
          });
        };

        reader.readAsText(file, "utf-8");
      };

      // Trigger the file‑pick dialog
      inputEl.click();
    });
  };

  return { triggerUpload };
}
