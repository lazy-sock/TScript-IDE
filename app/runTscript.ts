import { Typeid } from "./lang/helpers/typeIds";
import { parseProgramFromString } from "./lang/parser";
import { createInterpreter } from "./createInterpreter";

// This function runs a TScript program. It returns an array of
// events, like print messages, turtle and canvas outputs.
// Parameters:
//  - code is the TScript source code to run
//  - maxseconds is the timeout, default=3
//  - inputs in an array of values returned by consecutive calls to TScript's confirm or prompt, default=[]
export function run_tscript(
  code: string,
  maxseconds = 3.0,
  inputs = [],
  canvas: HTMLCanvasElement | null,
) {
  console.log("started runTscript.ts");
  inputs = inputs.slice();
  let output = new Array();

  let result = parseProgramFromString(code);
  if (!result.program) {
    let errors = result.errors;
    for (let i = 0; i < errors.length; i++) {
      let err = errors[i];
      output.push({
        type: "compile error",
        line: err.line,
        message: err.message,
      });
    }
    return output;
  }
  let program = result.program;

  let interpreter = createInterpreter(program, inputs, output);

  if (canvas != null) {
    interpreter.service.canvas.dom = canvas;
  }

  console.log("got here!");
  interpreter.stopthread();
  interpreter.reset();

  // run the program
  let timeout = new Date().getTime() + 1000 * maxseconds;
  while (true) {
    let start = new Date().getTime();
    if (start >= timeout) {
      console.log("timeout");
      output.push({
        type: "timeout - program execution took too long",
      });
      return output;
    }

    console.log(start);

    if (interpreter.status === "waiting") interpreter.status = "running";
    if (interpreter.status != "running") break;

    while (
      new Date().getTime() - start < 14 &&
      interpreter.status === "running"
    ) {
      console.log("interpreter running");
      interpreter.exec_step();
      if (interpreter.halt) break;
    }
    if (!interpreter.timerEventEnqueued) {
      interpreter.timerEventEnqueued = interpreter.enqueueEvent("timer", {
        type: interpreter.program.types[Typeid.typeid_null],
        value: { b: null },
      });
    }
  }

  console.log("Stopped runTscript.ts");

  return output;
}
