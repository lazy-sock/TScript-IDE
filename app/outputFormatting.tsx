import { canvasTurtle } from "./canvasTurtle";
import { canvas } from "./canvas";

export function formatOutput(
  output: string,
  turtleRef: HTMLCanvasElement | null,
  canvasRef: HTMLCanvasElement | null,
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

  //TODO: clear turtle and canvas before drawing new stuff
  const canvasCtx = canvasRef?.getContext("2d");
  if (canvasCtx) {
    canvasCtx.clearRect(0, 0, canvasRef!.width, canvasRef!.height);
  }
  const turtleCtx = turtleRef?.getContext("2d");
  if (turtleCtx) {
    turtleCtx.clearRect(0, 0, turtleRef!.width, turtleRef!.height);
  }

  for (let i in object) {
    console.log(object[i]);
    if (object[i].type.startsWith("turtle")) {
      canvasTurtle(turtleRef, object[i]);
      continue;
    } else if (object[i].type.startsWith("canvas")) {
      canvas(canvasRef, object[i]);
      continue;
    }
    if (object[i].type) result += object[i].value;
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
