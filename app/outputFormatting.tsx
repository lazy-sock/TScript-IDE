import { canvasTurtle } from "./canvasTurtle";

export function formatOutput(
  output: string,
  canvasRef: HTMLCanvasElement,
): string {
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
    if (object[i].type.startsWith("turtle")) {
      canvasTurtle(canvasRef, object[i]);
      continue;
    }
    result += object[i].value;
    result += "\n";
  }

  return result;
}

export function formatError(output: string): string {
  let result = "Error: ";
  if (output == "") return "";
  let object = JSON.parse(output);
  for (let i in object) {
    result += "Line " + object[i].line + ": ";
    result += object[i].message;
    result += "\n";
  }
  return result;
}
