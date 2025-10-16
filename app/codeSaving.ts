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

export function downloadCode(filename: any, codeString: any) {
  const blob = new Blob([codeString], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
